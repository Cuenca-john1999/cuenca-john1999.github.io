#!/usr/bin/env python3
import json
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait

BASE = "http://127.0.0.1:8000/"
OUT = Path("/tmp/workbench-seo-browser-audit")
OUT.mkdir(parents=True, exist_ok=True)

checks = []
failures = []


def check(name, condition, detail=""):
    ok = bool(condition)
    checks.append({"name": name, "ok": ok, "detail": detail})
    if not ok:
        failures.append(f"{name}: {detail}")


options = Options()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--window-size=1440,1000")
options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 12)

expected_headings = {
    "en": ("Documentary basis & privacy", "Documentary basis & confidentiality"),
    "es": ("Base documental y privacidad", "Base documental y confidencialidad"),
    "de": ("Dokumentarische Grundlage & Datenschutz", "Dokumentarische Grundlage & Vertraulichkeit"),
}

try:
    for lang in ("en", "de", "es"):
        driver.set_window_size(1440, 1000)
        driver.get(f"{BASE}workbench/?lang={lang}#milestones")
        wait.until(lambda d: d.find_element(By.TAG_NAME, "html").get_attribute("lang") == lang)
        milestone = wait.until(lambda d: d.find_element(By.ID, "milestones"))
        links = milestone.find_elements(By.CSS_SELECTOR, "ul a")
        href_fragments = [(a.get_attribute("href") or "").split("#")[-1] for a in links]
        check(f"{lang} has five milestones", len(links) == 5, str(len(links)))
        check(
            f"{lang} milestone targets",
            href_fragments == ["entry-portfolio", "entry-deutschos", "entry-laprincesa", "entry-phage", "entry-celignis"],
            str(href_fragments),
        )
        check(f"{lang} milestones include 2023/2025/2026", all(year in milestone.text for year in ("2023", "2025", "2026")), milestone.text)
        if lang == "en":
            driver.execute_script("arguments[0].scrollIntoView({block:'center'});", milestone)
            time.sleep(0.3)
            driver.save_screenshot(str(OUT / "desktop-milestones-en.png"))

        # La Princesa deep link and evidence structure.
        driver.get(f"{BASE}workbench/?lang={lang}#entry-laprincesa")
        wait.until(lambda d: d.find_element(By.TAG_NAME, "html").get_attribute("lang") == lang)
        wait.until(lambda d: d.find_element(By.CSS_SELECTOR, "[data-entry-dialog]").get_property("open"))
        dialog = driver.find_element(By.CSS_SELECTOR, "[data-entry-dialog]")
        dialog_text = dialog.text
        check(f"{lang} La Princesa documentary/privacy heading", expected_headings[lang][0].lower() in dialog_text.lower(), dialog_text[-1500:])
        check(f"{lang} La Princesa keeps 370-hour scope", "370" in dialog_text, dialog_text[:1200])
        if lang == "en":
            for marker in ("HaCaT", "CD4/CD14", "PCR", "ELISA", "Western blot"):
                check(f"La Princesa preserves {marker}", marker.lower() in dialog_text.lower(), marker)
            driver.save_screenshot(str(OUT / "desktop-laprincesa-en.png"))
        driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
        wait.until(lambda d: not d.find_element(By.CSS_SELECTOR, "[data-entry-dialog]").get_property("open"))

        # Celignis deep link and evidence structure.
        driver.get(f"{BASE}workbench/?lang={lang}#entry-celignis")
        wait.until(lambda d: d.find_element(By.TAG_NAME, "html").get_attribute("lang") == lang)
        wait.until(lambda d: d.find_element(By.CSS_SELECTOR, "[data-entry-dialog]").get_property("open"))
        dialog = driver.find_element(By.CSS_SELECTOR, "[data-entry-dialog]")
        dialog_text = dialog.text
        check(f"{lang} Celignis documentary/confidentiality heading", expected_headings[lang][1].lower() in dialog_text.lower(), dialog_text[-1500:])
        if lang == "en":
            for marker in ("CHNOS", "TGA Q500", "GLP", "SOP", "volatile-matter"):
                check(f"Celignis preserves {marker}", marker.lower() in dialog_text.lower(), marker)
            driver.save_screenshot(str(OUT / "desktop-celignis-en.png"))
        driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
        wait.until(lambda d: not d.find_element(By.CSS_SELECTOR, "[data-entry-dialog]").get_property("open"))

    # Selected Work remains exactly the three established featured entries.
    driver.set_window_size(1440, 1000)
    driver.get(f"{BASE}workbench/?lang=en#featured")
    wait.until(lambda d: d.find_element(By.TAG_NAME, "html").get_attribute("lang") == "en")
    slides = driver.find_elements(By.CSS_SELECTOR, "[data-carousel-slide]")
    featured_text = "\n".join(slide.text for slide in slides)
    check("Selected Work remains three featured entries", len(slides) == 3, str(len(slides)))
    for marker in ("DeutschOS", "AETEL 2025", "Bacteriophage Therapy"):
        check(f"Selected Work preserves {marker}", marker.lower() in featured_text.lower(), featured_text[:1800])

    # Responsive safety is secondary but must not regress.
    driver.set_window_size(390, 800)
    driver.get(f"{BASE}workbench/?lang=en#milestones")
    wait.until(lambda d: d.find_element(By.TAG_NAME, "html").get_attribute("lang") == "en")
    overflow = driver.execute_script("return document.documentElement.scrollWidth - window.innerWidth")
    check("Workbench has no mobile horizontal overflow", overflow <= 1, str(overflow))

    severe = [entry for entry in driver.get_log("browser") if entry.get("level") == "SEVERE"]
    check("browser console has no SEVERE errors", not severe, json.dumps(severe, ensure_ascii=False))
except Exception as exc:
    failures.append(f"auditor exception: {type(exc).__name__}: {exc}")
finally:
    driver.quit()

report = {"checks": checks, "failures": failures}
(OUT / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
print(json.dumps(report, indent=2, ensure_ascii=False))
if failures:
    raise SystemExit(1)
