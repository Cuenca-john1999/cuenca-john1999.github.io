/**
 * THEME.JS - Sistema de Temas (Dark/Light)
 * 
 * Módulo responsable de gestionar el cambio entre temas.
 * 
 * Características:
 * - Detecta preferencia del sistema (prefers-color-scheme)
 * - Permite cambio manual de tema sin recargar
 * - Guarda preferencia en localStorage
 * - Aplica clase .dark a :root
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
    const STORAGE_KEY = 'helix-theme';
    const DARK_CLASS = 'dark';
    
    let currentTheme = 'light';
    
    /**
     * Obtener tema del sistema
     */
    function getSystemTheme() {
        // TODO: Implementar detección de tema del sistema
        return 'light';
    }
    
    /**
     * Obtener tema guardado o del sistema
     */
    function getInitialTheme() {
        // TODO: Implementar lógica de obtención de tema
        return getSystemTheme();
    }
    
    /**
     * Aplicar tema al DOM
     */
    function applyTheme(theme) {
        // TODO: Implementar aplicación de tema
        console.log(`[THEME] Aplicando tema: ${theme}`);
        currentTheme = theme;
    }
    
    /**
     * Guardar preferencia del usuario
     */
    function saveThemePreference(theme) {
        // TODO: Implementar guardado en localStorage
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
            applyTheme(theme);
            saveThemePreference(theme);
        },
        
        /**
         * Obtener tema actual
         */
        get() {
            return currentTheme;
        }
    };
})();
