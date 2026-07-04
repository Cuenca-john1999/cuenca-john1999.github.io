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
    console.log('[APP] Portfolio iniciado');

    const siteHeader = document.querySelector('.site-header');
    const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
    const trackedSections = Array.from(document.querySelectorAll('[data-sequence-section]'));
    let lastScrollY = window.scrollY;
    let scrollDirectionStartY = window.scrollY;
    let scrollDirection = 'up';

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

    const updateActiveSectionFromViewport = () => {
        if (trackedSections.length === 0) {
            return;
        }

        const viewportAnchor = window.innerHeight * 0.48;
        const closestSection = trackedSections
            .map((section) => {
                const rect = section.getBoundingClientRect();
                const sectionAnchor = rect.top + (rect.height * 0.32);

                return {
                    section,
                    distance: Math.abs(sectionAnchor - viewportAnchor)
                };
            })
            .sort((a, b) => a.distance - b.distance)[0]?.section;

        if (closestSection) {
            closestSection.classList.add('is-sequence-revealed');
            setActiveSection(closestSection.id);
        }
    };

    const scheduleActiveSectionUpdate = () => {
        window.requestAnimationFrame(updateActiveSectionFromViewport);
    };

    const updateHeaderVisibility = () => {
        if (!siteHeader) {
            return;
        }

        const currentScrollY = window.scrollY;
        const nextDirection = currentScrollY > lastScrollY ? 'down' : 'up';

        if (nextDirection !== scrollDirection) {
            scrollDirection = nextDirection;
            scrollDirectionStartY = lastScrollY;
        }

        const distanceInDirection = Math.abs(currentScrollY - scrollDirectionStartY);

        if (scrollDirection === 'down' && currentScrollY > 120 && distanceInDirection > 18) {
            siteHeader.classList.add('is-header-hidden');
        }

        if ((scrollDirection === 'up' && distanceInDirection > 10) || currentScrollY <= 120) {
            siteHeader.classList.remove('is-header-hidden');
        }

        lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
        scheduleActiveSectionUpdate();
        updateHeaderVisibility();
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

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', scheduleActiveSectionUpdate);
    } else {
        trackedSections.forEach((section) => section.classList.add('is-sequence-revealed'));
    }

    updateActiveSectionFromViewport();
    updateHeaderVisibility();

    console.log('[APP] Módulos inicializados');
});

/**
 * Manejo global de errores (opcional)
 */
window.addEventListener('error', (event) => {
    console.error('[APP ERROR]', event.error);
});
