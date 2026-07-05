/**
 * THEME.JS - Sistema de Temas (Dark/Light)
 * 
 * Módulo responsable de gestionar el cambio entre temas.
 * 
 * Características:
 * - Detecta preferencia del sistema (prefers-color-scheme)
 * - Permite cambio manual de tema sin recargar
 * - Guarda preferencia en localStorage
 * - Aplica data-theme y clase .dark a :root
 * 
 * Interfaz pública:
 * - Theme.init() - Inicializar el módulo
 * - Theme.toggle() - Cambiar entre temas
 * - Theme.get() - Obtener tema actual
 * - Theme.set(theme) - Establecer tema específico
 * 
 * Uso:
 * Theme.init();        // Al cargar la página
 * Theme.toggle();      // Al hacer click en botón de tema
 * 
 */

const Theme = (() => {
    const STORAGE_KEY = 'portfolio-theme';
    const DARK_CLASS = 'dark';
    const AVAILABLE_THEMES = ['dark', 'light'];
    
    let currentTheme = document.documentElement.dataset.theme || 'dark';

    /**
     * Comprobar que el tema existe
     */
    function isSupportedTheme(theme) {
        return AVAILABLE_THEMES.includes(theme);
    }

    /**
     * Leer preferencia guardada sin romper navegadores con storage bloqueado
     */
    function getSavedTheme() {
        try {
            const savedTheme = window.localStorage.getItem(STORAGE_KEY);
            return isSupportedTheme(savedTheme) ? savedTheme : null;
        } catch (error) {
            console.warn('[THEME] No se pudo leer localStorage', error);
            return null;
        }
    }
    
    /**
     * Obtener tema del sistema
     */
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }

        return 'dark';
    }
    
    /**
     * Obtener tema guardado o del sistema
     */
    function getInitialTheme() {
        const savedTheme = getSavedTheme();

        if (savedTheme) {
            return savedTheme;
        }

        const documentTheme = document.documentElement.dataset.theme;

        if (isSupportedTheme(documentTheme)) {
            return documentTheme;
        }

        return getSystemTheme();
    }
    
    /**
     * Aplicar tema al DOM
     */
    function applyTheme(theme) {
        const nextTheme = isSupportedTheme(theme) ? theme : 'dark';
        const root = document.documentElement;

        root.dataset.theme = nextTheme;
        root.classList.toggle(DARK_CLASS, nextTheme === 'dark');
        root.style.colorScheme = nextTheme;

        currentTheme = nextTheme;
        console.log(`[THEME] Aplicando tema: ${nextTheme}`);

        return nextTheme;
    }
    
    /**
     * Guardar preferencia del usuario
     */
    function saveThemePreference(theme) {
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.warn('[THEME] No se pudo guardar localStorage', error);
        }
    }
    
    return {
        /**
         * Inicializar módulo de temas
         */
        init() {
            console.log('[THEME] Módulo inicializado');
            const theme = getInitialTheme();
            this.set(theme);
        },
        
        /**
         * Cambiar entre temas
         */
        toggle() {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.set(newTheme);
        },
        
        /**
         * Establecer tema específico
         */
        set(theme) {
            const appliedTheme = applyTheme(theme);
            saveThemePreference(appliedTheme);
        },
        
        /**
         * Obtener tema actual
         */
        get() {
            return currentTheme;
        }
    };
})();

window.Theme = Theme;
