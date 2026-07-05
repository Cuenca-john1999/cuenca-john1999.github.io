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
    const documentExplorer = document.querySelector('#document-explorer');
    const documentExplorerTitle = document.querySelector('#document-explorer-title');
    const documentExplorerFrame = document.querySelector('#document-explorer-frame');
    const documentExplorerFallback = document.querySelector('#document-explorer-fallback');
    const documentExplorerLabel = document.querySelector('#document-explorer-label');
    const documentExplorerClose = document.querySelector('[data-document-close]');
    const documentOpenLinks = Array.from(document.querySelectorAll('[data-document-open]'));
    const contactForms = Array.from(document.querySelectorAll('[data-contact-form]'));
    let lastScrollY = window.scrollY;
    let scrollDirectionStartY = window.scrollY;
    let scrollDirection = 'up';
    let activeSectionFrame = null;
    let lastFocusedElement = null;

    const initializeOptionalModules = () => {
        if (typeof Theme !== 'undefined' && typeof Theme.init === 'function') {
            Theme.init();
        }

        if (typeof Language !== 'undefined' && typeof Language.init === 'function') {
            const languageInit = Language.init();

            if (languageInit && typeof languageInit.catch === 'function') {
                languageInit.catch((error) => {
                    console.warn('[LANGUAGE] No se pudo inicializar el idioma', error);
                });
            }
        }
    };

    initializeOptionalModules();

    contactForms.forEach((form) => {
        const status = form.querySelector('[data-contact-status]');
        const submitButton = form.querySelector('button[type="submit"]');
        const accessKey = form.querySelector('input[name="access_key"]');
        const hasAccessKey = accessKey && accessKey.value && accessKey.value !== 'WEB3FORMS_ACCESS_KEY';

        if (!status || !submitButton) {
            return;
        }

        if (!hasAccessKey) {
            submitButton.disabled = true;
            status.textContent = 'Contact form ready. Add the Web3Forms access key to activate it.';
            return;
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            submitButton.disabled = true;
            status.textContent = 'Sending message...';

            try {
                const response = await window.fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        Accept: 'application/json',
                    },
                });
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || 'The message could not be sent.');
                }

                form.reset();
                status.textContent = 'Message sent. Thank you for reaching out.';
            } catch (error) {
                console.warn('[CONTACT] No se pudo enviar el formulario', error);
                status.textContent = 'The message could not be sent. Please try again later.';
            } finally {
                submitButton.disabled = false;
            }
        });
    });

    const closeDocumentExplorer = () => {
        if (!documentExplorer) {
            return;
        }

        documentExplorer.hidden = true;
        document.body.classList.remove('is-document-explorer-open');

        if (documentExplorerFrame) {
            documentExplorerFrame.removeAttribute('src');
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };

    const openDocumentExplorer = (trigger) => {
        if (!documentExplorer || !documentExplorerFrame || !documentExplorerFallback) {
            return;
        }

        const documentUrl = trigger.href;
        const documentHeading = trigger.dataset.documentHeading || 'Bacteriophage Therapy: Rediscovering an Innovative Therapy';
        const documentLabel = trigger.dataset.documentLabel || trigger.textContent.trim();

        lastFocusedElement = trigger;
        documentExplorerFrame.src = `${documentUrl}#zoom=125`;
        documentExplorerFrame.title = `${documentHeading} PDF reader`;
        documentExplorerFallback.href = documentUrl;

        if (documentExplorerTitle) {
            documentExplorerTitle.textContent = documentHeading;
        }

        if (documentExplorerLabel) {
            documentExplorerLabel.textContent = documentLabel;
        }

        documentExplorer.hidden = false;
        document.body.classList.add('is-document-explorer-open');

        if (documentExplorerClose) {
            documentExplorerClose.focus();
        }
    };

    documentOpenLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            openDocumentExplorer(link);
        });
    });

    if (documentExplorerClose) {
        documentExplorerClose.addEventListener('click', closeDocumentExplorer);
    }

    if (documentExplorer) {
        documentExplorer.addEventListener('click', (event) => {
            if (event.target === documentExplorer) {
                closeDocumentExplorer();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && documentExplorer && !documentExplorer.hidden) {
            closeDocumentExplorer();
        }
    });

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
        if (activeSectionFrame !== null) {
            return;
        }

        activeSectionFrame = window.requestAnimationFrame(() => {
            activeSectionFrame = null;
            updateActiveSectionFromViewport();
        });
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
