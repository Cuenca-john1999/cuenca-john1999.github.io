/**
 * LANGUAGE.JS - Sistema de Internacionalización (i18n)
 * 
 * Módulo responsable de gestionar cambio de idioma.
 * 
 * Características:
 * - Soporta múltiples idiomas (es, en, de)
 * - Cambio de idioma sin recargar la página
 * - Guarda preferencia en localStorage
 * - Detecta idioma del navegador
 * - Traduce elementos del DOM usando data-i18n
 * 
 * Interfaz pública:
 * - Language.init() - Inicializar el módulo
 * - Language.set(lang) - Cambiar idioma
 * - Language.get() - Obtener idioma actual
 * - Language.translate(key) - Obtener traducción
 * 
 * Uso en HTML:
 * <h1 data-i18n="home.title">Título por defecto</h1>
 * 
 * Al cambiar idioma, se actualiza automáticamente el contenido.
 * 
 */

const Language = (() => {
    const STORAGE_KEY = 'portfolio-language';
    const DEFAULT_LANGUAGE = 'es';
    const AVAILABLE_LANGUAGES = ['es', 'en', 'de'];
    
    let currentLanguage = DEFAULT_LANGUAGE;
    let translations = {};

    /**
     * Comprobar que el idioma existe
     */
    function isSupportedLanguage(language) {
        return AVAILABLE_LANGUAGES.includes(language);
    }

    /**
     * Leer preferencia guardada sin romper navegadores con storage bloqueado
     */
    function getSavedLanguage() {
        try {
            const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
            return isSupportedLanguage(savedLanguage) ? savedLanguage : null;
        } catch (error) {
            console.warn('[LANGUAGE] No se pudo leer localStorage', error);
            return null;
        }
    }
    
    /**
     * Cargar traducciones desde data/translations/*.json
     */
    async function loadTranslations(language = currentLanguage) {
        if (translations[language]) {
            return translations[language];
        }

        try {
            const response = await fetch(`data/translations/${language}.json`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            translations[language] = await response.json();
            console.log(`[LANGUAGE] Traducciones cargadas: ${language}`);
        } catch (error) {
            console.warn(`[LANGUAGE] No se pudieron cargar traducciones para: ${language}`, error);
            translations[language] = {};
        }

        return translations[language];
    }
    
    /**
     * Obtener idioma del navegador
     */
    function getBrowserLanguage() {
        const browserLanguage = (window.navigator.language || DEFAULT_LANGUAGE).slice(0, 2).toLowerCase();
        return isSupportedLanguage(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
    }

    /**
     * Obtener idioma inicial
     */
    function getInitialLanguage() {
        const savedLanguage = getSavedLanguage();
        const documentLanguage = document.documentElement.lang.slice(0, 2).toLowerCase();
        const supportedDocumentLanguage = isSupportedLanguage(documentLanguage) ? documentLanguage : null;
        const hasTranslatableContent = Boolean(document.querySelector('[data-i18n]'));

        if (hasTranslatableContent && savedLanguage) {
            return savedLanguage;
        }

        return supportedDocumentLanguage || savedLanguage || getBrowserLanguage();
    }

    /**
     * Guardar preferencia del usuario
     */
    function saveLanguagePreference(language) {
        try {
            window.localStorage.setItem(STORAGE_KEY, language);
        } catch (error) {
            console.warn('[LANGUAGE] No se pudo guardar localStorage', error);
        }
    }
    
    /**
     * Traducir elemento del DOM
     */
    function translateElement(element) {
        const key = element.dataset.i18n;

        if (!key) {
            return;
        }

        element.textContent = translateKey(key);
    }

    /**
     * Obtener traduccion por ruta, por ejemplo common.theme
     */
    function translateKey(key) {
        const dictionary = translations[currentLanguage] || {};
        const value = key.split('.').reduce((result, pathPart) => {
            if (result && typeof result === 'object') {
                return result[pathPart];
            }

            return undefined;
        }, dictionary);

        return typeof value === 'string' ? value : key;
    }
    
    /**
     * Traducir todos los elementos de la página
     */
    function translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(translateElement);
        console.log(`[LANGUAGE] Traduciendo página a: ${currentLanguage}`);
    }
    
    return {
        /**
         * Inicializar módulo de lenguaje
         */
        async init() {
            console.log('[LANGUAGE] Módulo inicializado');
            currentLanguage = getInitialLanguage();
            document.documentElement.lang = currentLanguage;
            await loadTranslations(currentLanguage);
            translatePage();
        },
        
        /**
         * Cambiar idioma
         */
        async set(language) {
            if (!isSupportedLanguage(language)) {
                console.warn(`[LANGUAGE] Idioma no soportado: ${language}`);
                return;
            }

            currentLanguage = language;
            document.documentElement.lang = currentLanguage;
            await loadTranslations(currentLanguage);
            translatePage();
            saveLanguagePreference(currentLanguage);
        },
        
        /**
         * Obtener idioma actual
         */
        get() {
            return currentLanguage;
        },
        
        /**
         * Obtener traducción
         */
        translate(key) {
            return translateKey(key);
        },
        
        /**
         * Obtener idiomas disponibles
         */
        getAvailable() {
            return AVAILABLE_LANGUAGES;
        }
    };
})();

window.Language = Language;
