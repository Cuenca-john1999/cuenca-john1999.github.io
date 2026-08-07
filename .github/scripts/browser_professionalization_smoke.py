from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE = os.environ.get('AUDIT_BASE_URL', 'http://127.0.0.1:8000')
OUT = Path('browser-audit')
OUT.mkdir(exist_ok=True)
failures: list[str] = []
results: list[dict] = []


def check(condition: bool, message: str) -> None:
    if not condition:
        failures.append(message)


def driver_for(width: int, height: int) -> webdriver.Chrome:
    options = Options()
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument(f'--window-size={width},{height}')
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    return webdriver.Chrome(options=options)


def no_overflow(driver: webdriver.Chrome, label: str) -> None:
    metrics = driver.execute_script('return {sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth};')
    check(metrics['sw'] <= metrics['cw'] + 1, f'{label}: horizontal overflow {metrics}')


def no_severe_console(driver: webdriver.Chrome, label: str) -> None:
    severe = [entry for entry in driver.get_log('browser') if entry.get('level') == 'SEVERE']
    check(not severe, f'{label}: severe console entries: {severe}')


def wait_lang(driver: webdriver.Chrome, lang: str) -> None:
    WebDriverWait(driver, 10).until(lambda d: d.find_element(By.TAG_NAME, 'html').get_attribute('lang') == lang)


def run_desktop() -> None:
    d = driver_for(1440, 900)
    try:
        d.get(f'{BASE}/?lang=en')
        wait_lang(d, 'en')
        privacy = WebDriverWait(d, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href="privacy.html"]')))
        check('privacy' in privacy.text.lower(), 'homepage: privacy link text missing')
        no_overflow(d, 'homepage desktop')
        no_severe_console(d, 'homepage desktop')
        d.save_screenshot(str(OUT / 'homepage-desktop-en.png'))

        d.get(f'{BASE}/privacy.html?lang=de')
        wait_lang(d, 'de')
        h1 = WebDriverWait(d, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'h1'))).text
        check('Datenschutz' in h1, f'privacy DE: unexpected h1 {h1!r}')
        body = d.find_element(By.TAG_NAME, 'body').text
        check('Web3Forms' in body and 'US-East' in body, 'privacy DE: provider disclosure missing')
        no_overflow(d, 'privacy desktop DE')
        no_severe_console(d, 'privacy desktop DE')
        d.save_screenshot(str(OUT / 'privacy-desktop-de.png'))

        d.find_element(By.CSS_SELECTOR, '[data-language-set="es"]').click()
        wait_lang(d, 'es')
        WebDriverWait(d, 10).until(lambda x: 'lang=es' in x.current_url)
        h1_es = d.find_element(By.TAG_NAME, 'h1').text
        check('privacidad' in h1_es.lower(), f'privacy ES switch: unexpected h1 {h1_es!r}')

        d.get(f'{BASE}/404.html?lang=es')
        wait_lang(d, 'es')
        h404 = WebDriverWait(d, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'h1'))).text
        check('Página no encontrada' in h404, f'404 ES: unexpected h1 {h404!r}')
        links = [a.get_attribute('href') for a in d.find_elements(By.CSS_SELECTOR, '.aux-actions a')]
        check(any('/workbench/' in href for href in links), '404: Workbench recovery link missing')
        no_severe_console(d, '404 desktop ES')
        d.save_screenshot(str(OUT / '404-desktop-es.png'))

        d.get(f'{BASE}/workbench/?lang=en#entry-portfolio')
        wait_lang(d, 'en')
        WebDriverWait(d, 10).until(lambda x: x.execute_script('return Boolean(document.querySelector("[data-entry-dialog]")?.open)'))
        check(d.current_url.endswith('#entry-portfolio'), f'Workbench deep link changed unexpectedly: {d.current_url}')
        no_severe_console(d, 'Workbench deep-link smoke')
    finally:
        d.quit()


def run_mobile() -> None:
    d = driver_for(390, 800)
    try:
        for path, lang, label in [
            ('/?lang=es', 'es', 'homepage mobile ES'),
            ('/privacy.html?lang=es', 'es', 'privacy mobile ES'),
            ('/404.html?lang=de', 'de', '404 mobile DE'),
        ]:
            d.get(BASE + path)
            wait_lang(d, lang)
            no_overflow(d, label)
            no_severe_console(d, label)
        d.get(f'{BASE}/privacy.html?lang=es')
        wait_lang(d, 'es')
        d.save_screenshot(str(OUT / 'privacy-mobile-390-es.png'))
    finally:
        d.quit()


try:
    run_desktop()
    run_mobile()
except Exception as exc:
    failures.append(f'unhandled browser audit error: {exc!r}')

report = {'failures': failures}
(OUT / 'report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
sys.exit(1 if failures else 0)
