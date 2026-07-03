/**
 * APP.JS - Inicializador Principal
 * 
 * Este archivo orquesta la inicialización de toda la aplicación.
 * 
 * Responsabilidades:
 * - Ejecutar en DOMContentLoaded
 * - Inicializar módulos de tema y lenguaje
 * - Gestionar el ciclo de vida de la aplicación
 * - Manejar errores globales
 * 
 * NO contiene lógica de negocio.
 * NO maneja directamente el DOM.
 * Delega en módulos específicos (theme.js, language.js, etc.)
 * 
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('[APP] Helix App iniciado');

    const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
    const trackedSections = Array.from(document.querySelectorAll('[data-sequence-section]'));

    reveals.forEach((element, index) => {
        window.setTimeout(() => {
            element.classList.add('is-visible');
        }, 260 + (index * 220));
    });

    const setActiveSection = (sectionId) => {
        if (!sectionId) {
            return;
        }

        trackedSections.forEach((section) => {
            const isActive = section.id === sectionId;
            section.classList.toggle('is-sequence-active', isActive);

            if (isActive) {
                section.classList.add('is-sequence-revealed');
            }
        });
    };

    if ('IntersectionObserver' in window && trackedSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-sequence-revealed');
                }
            });

            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visibleEntry) {
                setActiveSection(visibleEntry.target.id);
            }
        }, {
            rootMargin: '-35% 0px -35% 0px',
            threshold: [0.2, 0.45, 0.7]
        });

        trackedSections.forEach((section) => sectionObserver.observe(section));
    } else {
        trackedSections.forEach((section) => section.classList.add('is-sequence-revealed'));
    }

    setActiveSection('profile');

    console.log('[APP] Módulos inicializados');
});

/**
 * Manejo global de errores (opcional)
 */
window.addEventListener('error', (event) => {
    console.error('[APP ERROR]', event.error);
});
