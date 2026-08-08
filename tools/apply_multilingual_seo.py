#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://cuenca-john1999.github.io"


def replace_once(path: Path, old: str, new: str, label: str) -> None:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"[seo-apply] {path.relative_to(ROOT)} expected one {label}; found {count}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


def add_main_head_markers() -> None:
    path = ROOT / "index.html"
    replace_once(
        path,
        '<html lang="en" data-theme="dark">',
        '<html lang="en" data-theme="dark" data-language-route="profile">',
        "profile route marker",
    )
    hreflang = (
        f'    <link rel="canonical" href="{BASE}/">\n'
        f'    <link rel="alternate" hreflang="en" href="{BASE}/">\n'
        f'    <link rel="alternate" hreflang="de" href="{BASE}/de/">\n'
        f'    <link rel="alternate" hreflang="es" href="{BASE}/es/">\n'
        f'    <link rel="alternate" hreflang="x-default" href="{BASE}/">'
    )
    replace_once(path, f'    <link rel="canonical" href="{BASE}/">', hreflang, "main hreflang cluster")
    replace_once(
        path,
        '    <meta property="og:locale" content="en_US">',
        '    <meta property="og:locale" content="en_US">\n    <meta property="og:locale:alternate" content="de_DE">\n    <meta property="og:locale:alternate" content="es_ES">',
        "main Open Graph locale alternates",
    )


def add_workbench_head_markers() -> None:
    path = ROOT / "workbench" / "index.html"
    replace_once(
        path,
        '<html lang="en" data-theme="dark">',
        '<html lang="en" data-theme="dark" data-language-route="workbench" data-site-root="../">',
        "workbench route marker",
    )
    hreflang = (
        f'    <link rel="canonical" href="{BASE}/workbench/">\n'
        f'    <link rel="alternate" hreflang="en" href="{BASE}/workbench/">\n'
        f'    <link rel="alternate" hreflang="de" href="{BASE}/de/workbench/">\n'
        f'    <link rel="alternate" hreflang="es" href="{BASE}/es/workbench/">\n'
        f'    <link rel="alternate" hreflang="x-default" href="{BASE}/workbench/">'
    )
    replace_once(path, f'    <link rel="canonical" href="{BASE}/workbench/">', hreflang, "workbench hreflang cluster")
    replace_once(
        path,
        '    <meta property="og:locale" content="en_US">',
        '    <meta property="og:locale" content="en_US">\n    <meta property="og:locale:alternate" content="de_DE">\n    <meta property="og:locale:alternate" content="es_ES">',
        "workbench Open Graph locale alternates",
    )


def patch_language_js() -> None:
    path = ROOT / "assets" / "js" / "language.js"
    replace_once(
        path,
        "    const AVAILABLE_LANGUAGES = ['en', 'de', 'es'];\n    const CV_BY_LANGUAGE = {",
        "    const AVAILABLE_LANGUAGES = ['en', 'de', 'es'];\n    const LOCALIZED_LANGUAGE = document.documentElement.dataset.localizedLanguage?.slice(0, 2).toLowerCase() || null;\n    const SITE_ROOT = document.documentElement.dataset.siteRoot || '';\n    const LANGUAGE_ROUTE = document.documentElement.dataset.languageRoute || '';\n    const CV_BY_LANGUAGE = {",
        "localized route constants",
    )
    replace_once(
        path,
        "    let currentLanguage = DEFAULT_LANGUAGE;\n    let translations = {};\n\n    /**\n     * Comprobar que el idioma existe",
        "    let currentLanguage = DEFAULT_LANGUAGE;\n    let translations = {};\n\n    function getSiteRootUrl() {\n        return new URL(SITE_ROOT || './', window.location.href);\n    }\n\n    function resolveSitePath(path) {\n        return `${SITE_ROOT}${path}`;\n    }\n\n    function getProfileUrl(language) {\n        const root = getSiteRootUrl();\n        return language === DEFAULT_LANGUAGE ? root : new URL(`${language}/`, root);\n    }\n\n    function getWorkbenchUrl(language) {\n        const root = getSiteRootUrl();\n        return language === DEFAULT_LANGUAGE\n            ? new URL('workbench/', root)\n            : new URL(`${language}/workbench/`, root);\n    }\n\n    /**\n     * Comprobar que el idioma existe",
        "site route helpers",
    )
    replace_once(
        path,
        "    function getInitialLanguage() {\n        const urlLanguage = getUrlLanguage();",
        "    function getInitialLanguage() {\n        if (isSupportedLanguage(LOCALIZED_LANGUAGE)) {\n            return LOCALIZED_LANGUAGE;\n        }\n\n        const urlLanguage = getUrlLanguage();",
        "localized language priority",
    )
    replace_once(
        path,
        "            const response = await fetch(`data/translations/${language}.json?v=${TRANSLATION_VERSION}`);",
        "            const response = await fetch(resolveSitePath(`data/translations/${language}.json?v=${TRANSLATION_VERSION}`));",
        "root-aware translation fetch",
    )
    replace_once(
        path,
        "    function syncLanguageInUrl(language) {\n        try {",
        "    function syncLanguageInUrl(language) {\n        if (isSupportedLanguage(LOCALIZED_LANGUAGE)) return;\n\n        try {",
        "localized URL lock",
    )
    replace_once(
        path,
        "            link.setAttribute('href', cvPath);",
        "            link.setAttribute('href', resolveSitePath(cvPath));",
        "root-aware CV links",
    )
    replace_once(
        path,
        "            link.setAttribute('href', projectPath);",
        "            link.setAttribute('href', resolveSitePath(projectPath));",
        "root-aware project links",
    )
    replace_once(
        path,
        "            link.setAttribute('href', defensePath);",
        "            link.setAttribute('href', resolveSitePath(defensePath));",
        "root-aware defense links",
    )
    old_workbench = '''    function updateWorkbenchLinks() {
        document.querySelectorAll('a[href^="workbench/"]').forEach((link) => {
            try {
                const target = new URL(link.getAttribute('href'), window.location.href);
                target.searchParams.set(URL_LANGUAGE_PARAM, currentLanguage);
                link.setAttribute('href', `${target.pathname.replace(/^\\//, '')}${target.search}${target.hash}`);
            } catch (error) {
                console.warn('[LANGUAGE] No se pudo actualizar un enlace de Workbench', error);
            }
        });
    }'''
    new_workbench = '''    function updateWorkbenchLinks() {
        document.querySelectorAll('a[href^="workbench/"]').forEach((link) => {
            try {
                const currentTarget = new URL(link.getAttribute('href'), window.location.href);
                const target = getWorkbenchUrl(currentLanguage);
                target.hash = currentTarget.hash;
                link.setAttribute('href', `${target.pathname}${target.hash}`);
            } catch (error) {
                console.warn('[LANGUAGE] No se pudo actualizar un enlace de Workbench', error);
            }
        });
    }'''
    replace_once(path, old_workbench, new_workbench, "canonical Workbench links")
    old_listener = '''            control.addEventListener('click', () => {
                if (control.getAttribute('aria-disabled') === 'true') {
                    return;
                }

                this.set(control.dataset.languageSet);
            });'''
    new_listener = '''            control.addEventListener('click', () => {
                if (control.getAttribute('aria-disabled') === 'true') {
                    return;
                }

                const language = control.dataset.languageSet;
                if (LANGUAGE_ROUTE === 'profile') {
                    saveLanguagePreference(language);
                    const target = getProfileUrl(language);
                    target.hash = window.location.hash;
                    const current = new URL(window.location.href);
                    if (target.pathname !== current.pathname || current.search) {
                        window.location.assign(`${target.pathname}${target.hash}`);
                        return;
                    }
                }

                this.set(language);
            });'''
    replace_once(path, old_listener, new_listener, "profile language route navigation")


def patch_workbench_js() -> None:
    path = ROOT / "workbench" / "js" / "workbench.js"
    replace_once(
        path,
        "    const DEFAULT_LANGUAGE = 'en';\n    const LANGUAGES = ['en', 'de', 'es'];",
        "    const DEFAULT_LANGUAGE = 'en';\n    const LANGUAGES = ['en', 'de', 'es'];\n    const LOCALIZED_LANGUAGE = document.documentElement.dataset.localizedLanguage?.slice(0, 2).toLowerCase() || null;\n    const SITE_ROOT = document.documentElement.dataset.siteRoot || '../';\n    const LANGUAGE_ROUTE = document.documentElement.dataset.languageRoute || '';",
        "workbench localized route constants",
    )
    replace_once(
        path,
        "    function getUrlLanguage() {",
        "    function getSiteRootUrl() {\n        return new URL(SITE_ROOT, window.location.href);\n    }\n\n    function getProfileUrl(language) {\n        const root = getSiteRootUrl();\n        return language === DEFAULT_LANGUAGE ? root : new URL(`${language}/`, root);\n    }\n\n    function getWorkbenchUrl(language) {\n        const root = getSiteRootUrl();\n        return language === DEFAULT_LANGUAGE\n            ? new URL('workbench/', root)\n            : new URL(`${language}/workbench/`, root);\n    }\n\n    function resolveWorkbenchResource(href) {\n        if (href === '../') return getProfileUrl(currentLanguage).href;\n        if (href.startsWith('../assets/')) {\n            return new URL(`${SITE_ROOT}assets/${href.slice('../assets/'.length)}`, window.location.href).href;\n        }\n        return href;\n    }\n\n    function getUrlLanguage() {",
        "workbench route helpers",
    )
    replace_once(
        path,
        "    function getInitialLanguage() {\n        const urlLanguage = getUrlLanguage();",
        "    function getInitialLanguage() {\n        if (LANGUAGES.includes(LOCALIZED_LANGUAGE)) return LOCALIZED_LANGUAGE;\n\n        const urlLanguage = getUrlLanguage();",
        "workbench localized language priority",
    )
    replace_once(
        path,
        "    function syncLanguageInUrl(language) {\n        try {",
        "    function syncLanguageInUrl(language) {\n        if (LANGUAGES.includes(LOCALIZED_LANGUAGE)) return;\n\n        try {",
        "workbench localized URL lock",
    )
    old_profile = '''    function updateProfileLinks() {
        document.querySelectorAll('.profile-return, .hero-actions a[href^="../"]').forEach((link) => {
            const target = new URL('../', window.location.href);
            target.searchParams.set(URL_LANGUAGE_PARAM, currentLanguage);
            link.setAttribute('href', `../?${target.searchParams.toString()}`);
        });
    }'''
    new_profile = '''    function updateProfileLinks() {
        document.querySelectorAll('.profile-return, .hero-actions a[href^="../"]').forEach((link) => {
            const target = getProfileUrl(currentLanguage);
            link.setAttribute('href', target.pathname);
        });
    }'''
    replace_once(path, old_profile, new_profile, "canonical profile links")
    old_set = '''    function setLanguage(language) {
        if (!LANGUAGES.includes(language)) return;
        currentLanguage = language;
        try { window.localStorage.setItem(STORAGE_KEY, language); } catch (error) { console.warn('[WORKBENCH] Could not save language', error); }
        translatePage();
        if (dialog.open && dialog.dataset.entryId) {
            populateDialog(dialog.dataset.entryId, {
                resetScroll: false,
                page: Number(dialog.dataset.page || 0)
            });
        }
    }'''
    new_set = '''    function setLanguage(language) {
        if (!LANGUAGES.includes(language)) return;
        try { window.localStorage.setItem(STORAGE_KEY, language); } catch (error) { console.warn('[WORKBENCH] Could not save language', error); }

        if (LANGUAGE_ROUTE === 'workbench') {
            const target = getWorkbenchUrl(language);
            target.hash = window.location.hash;
            const current = new URL(window.location.href);
            if (target.pathname !== current.pathname || current.search) {
                window.location.assign(`${target.pathname}${target.hash}`);
                return;
            }
        }

        currentLanguage = language;
        translatePage();
        if (dialog.open && dialog.dataset.entryId) {
            populateDialog(dialog.dataset.entryId, {
                resetScroll: false,
                page: Number(dialog.dataset.page || 0)
            });
        }
    }'''
    replace_once(path, old_set, new_set, "workbench language route navigation")
    old_resource = '''            link.href = resource.href === '../'
                ? `../?${URL_LANGUAGE_PARAM}=${encodeURIComponent(currentLanguage)}`
                : resource.href;'''
    new_resource = '''            link.href = resolveWorkbenchResource(resource.href);'''
    replace_once(path, old_resource, new_resource, "root-aware Workbench resources")


def sync_cache_tokens() -> None:
    language_token = hashlib.sha256((ROOT / "assets/js/language.js").read_bytes()).hexdigest()[:12]
    workbench_token = hashlib.sha256((ROOT / "workbench/js/workbench.js").read_bytes()).hexdigest()[:12]

    for relative in ("index.html", "privacy.html", "404.html"):
        path = ROOT / relative
        text = path.read_text(encoding="utf-8")
        updated, count = re.subn(
            r'assets/js/language\.js\?v=[0-9a-f]{12}',
            f'assets/js/language.js?v={language_token}',
            text,
            count=1,
        )
        if count != 1:
            raise SystemExit(f"[seo-apply] expected language.js cache reference in {relative}")
        path.write_text(updated, encoding="utf-8")

    path = ROOT / "workbench/index.html"
    text = path.read_text(encoding="utf-8")
    updated, count = re.subn(
        r'js/workbench\.js\?v=[0-9a-f]{12}',
        f'js/workbench.js?v={workbench_token}',
        text,
        count=1,
    )
    if count != 1:
        raise SystemExit("[seo-apply] expected workbench.js cache reference")
    path.write_text(updated, encoding="utf-8")

    print(f"[seo-apply] language.js={language_token} workbench.js={workbench_token}")


def patch_integrity_workflow() -> None:
    path = ROOT / ".github/workflows/portfolio-integrity.yml"
    old = "      - name: Verify Workbench evidence provenance\n        run: python3 tools/verify_workbench_evidence.py\n      - name: Install PDF privacy checker"
    new = "      - name: Verify Workbench evidence provenance\n        run: python3 tools/verify_workbench_evidence.py\n      - name: Verify localized SEO pages\n        run: python3 tools/generate_localized_pages.py --check\n      - name: Install PDF privacy checker"
    replace_once(path, old, new, "localized SEO CI step")


def main() -> None:
    add_main_head_markers()
    add_workbench_head_markers()
    patch_language_js()
    patch_workbench_js()
    sync_cache_tokens()
    patch_integrity_workflow()

    from generate_localized_pages import main as _unused  # noqa: F401
    import subprocess
    subprocess.run(["python3", "tools/generate_localized_pages.py"], cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
