(() => {
    'use strict';

    const STORAGE_KEY = 'portfolio-language';
    const URL_LANGUAGE_PARAM = 'lang';
    const DEFAULT_LANGUAGE = 'en';
    const LANGUAGES = ['en', 'de', 'es'];
    const LOCALIZED_LANGUAGE = document.documentElement.dataset.localizedLanguage?.slice(0, 2).toLowerCase() || null;
    const SITE_ROOT = document.documentElement.dataset.siteRoot || '../';
    const LANGUAGE_ROUTE = document.documentElement.dataset.languageRoute || '';

    const { translations, entryData } = window.WorkbenchData || {};
    if (!translations || !entryData) {
        throw new Error('[WORKBENCH] Static data failed to load before workbench.js');
    }

    let currentLanguage = getInitialLanguage();
    let updateCarouselTranslations = null;
    let syncCarouselRotation = null;

    function getSiteRootUrl() {
        return new URL(SITE_ROOT, window.location.href);
    }

    function getProfileUrl(language) {
        const root = getSiteRootUrl();
        return language === DEFAULT_LANGUAGE ? root : new URL(`${language}/`, root);
    }

    function getWorkbenchUrl(language) {
        const root = getSiteRootUrl();
        return language === DEFAULT_LANGUAGE
            ? new URL('workbench/', root)
            : new URL(`${language}/workbench/`, root);
    }

    function resolveWorkbenchResource(href) {
        if (href === '../') return getProfileUrl(currentLanguage).href;
        if (href.startsWith('../assets/')) {
            return new URL(`${SITE_ROOT}assets/${href.slice('../assets/'.length)}`, window.location.href).href;
        }
        return href;
    }

    function getUrlLanguage() {
        try {
            const language = new URL(window.location.href).searchParams.get(URL_LANGUAGE_PARAM)?.slice(0, 2).toLowerCase();
            return LANGUAGES.includes(language) ? language : null;
        } catch (error) {
            console.warn('[WORKBENCH] Could not read URL language', error);
            return null;
        }
    }

    function getInitialLanguage() {
        if (LANGUAGES.includes(LOCALIZED_LANGUAGE)) return LOCALIZED_LANGUAGE;

        const urlLanguage = getUrlLanguage();
        if (urlLanguage) return urlLanguage;

        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (LANGUAGES.includes(saved)) return saved;
        } catch (error) {
            console.warn('[WORKBENCH] localStorage unavailable', error);
        }

        const browserLanguage = (window.navigator.language || '').slice(0, 2).toLowerCase();
        if (LANGUAGES.includes(browserLanguage)) return browserLanguage;

        const documentLanguage = document.documentElement.lang.slice(0, 2).toLowerCase();
        return LANGUAGES.includes(documentLanguage) ? documentLanguage : DEFAULT_LANGUAGE;
    }

    function syncLanguageInUrl(language) {
        if (LANGUAGES.includes(LOCALIZED_LANGUAGE)) return;

        try {
            const url = new URL(window.location.href);
            url.searchParams.set(URL_LANGUAGE_PARAM, language);
            window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
        } catch (error) {
            console.warn('[WORKBENCH] Could not synchronize URL language', error);
        }
    }

    function updateProfileLinks() {
        document.querySelectorAll('.profile-return, .hero-actions a[href^="../"]').forEach((link) => {
            const target = getProfileUrl(currentLanguage);
            link.setAttribute('href', target.pathname);
        });
    }

    function getTranslation(key) {
        return key.split('.').reduce((value, part) => value?.[part], translations[currentLanguage]) ?? key;
    }

    function translatePage() {
        document.documentElement.lang = currentLanguage;
        document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-aria-label], [data-i18n-aria-roledescription]').forEach((element) => {
            if (element.dataset.i18nHtml) {
                element.innerHTML = getTranslation(element.dataset.i18nHtml);
            } else if (element.dataset.i18n) {
                element.textContent = getTranslation(element.dataset.i18n);
            }

            if (element.dataset.i18nAriaLabel) {
                element.setAttribute('aria-label', getTranslation(element.dataset.i18nAriaLabel));
            }

            if (element.dataset.i18nAriaRoledescription) {
                element.setAttribute('aria-roledescription', getTranslation(element.dataset.i18nAriaRoledescription));
            }
        });

        document.querySelectorAll('[data-language-set]').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.languageSet === currentLanguage));
        });

        updateProfileLinks();
        syncLanguageInUrl(currentLanguage);
        updateCarouselTranslations?.();
    }

    function setLanguage(language) {
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
    }

    document.querySelectorAll('[data-language-set]').forEach((button) => {
        button.addEventListener('click', () => setLanguage(button.dataset.languageSet));
    });

    const siteHeader = document.querySelector('.workbench-header');
    let lastScrollY = window.scrollY;
    let scrollDirectionStartY = window.scrollY;
    let scrollDirection = 'up';

    function updateHeaderVisibility() {
        if (!siteHeader) return;

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
    }

    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
    updateHeaderVisibility();

    const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
    const entries = Array.from(document.querySelectorAll('.entry-row'));
    const entryGroups = Array.from(document.querySelectorAll('.entry-group'));
    const entrySummaryBlocks = {
        learning: document.querySelector('#learning'),
        milestones: document.querySelector('#milestones')
    };
    const emptyState = document.querySelector('[data-empty-state]');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach((item) => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });

            entries.forEach((entry) => {
                const categories = entry.dataset.category.split(' ');
                const visible = filter === 'all' || categories.includes(filter);
                entry.hidden = !visible;
                if (visible) visibleCount += 1;
            });

            entryGroups.forEach((group) => {
                const groupEntries = Array.from(group.querySelectorAll('.entry-row'));
                const hasVisibleEntries = groupEntries.some((entry) => !entry.hidden);
                group.hidden = !hasVisibleEntries;
            });

            Object.entries(entrySummaryBlocks).forEach(([summaryKey, section]) => {
                if (!section) return;
                section.hidden = !(filter === 'all' || filter === summaryKey);
            });

            if (emptyState) emptyState.hidden = visibleCount > 0;
        });
    });

    const dialog = document.querySelector('[data-entry-dialog]');
    const dialogClose = document.querySelector('[data-dialog-close]');
    const dialogPanel = dialog?.querySelector('[data-dialog-panel]');
    const dialogPageTab = dialog?.querySelector('[data-dialog-page-tab]');
    const dialogPrevious = dialog?.querySelector('[data-dialog-previous]');
    const dialogNext = dialog?.querySelector('[data-dialog-next-entry]');
    const dialogNavigation = dialog?.querySelector('[data-dialog-navigation]');
    const dialogToolbarPosition = dialog?.querySelector('[data-dialog-toolbar-position]');
    const dialogTabPosition = dialog?.querySelector('[data-dialog-tab-position]');
    const dialogTabDirection = dialog?.querySelector('[data-dialog-tab-direction]');
    const dialogPageContent = dialog?.querySelector('[data-dialog-page-content]');
    const dialogScroll = dialog?.querySelector('[data-dialog-scroll]');
    const dialogAnnouncement = dialog?.querySelector('[data-dialog-announcement]');
    const featuredCarousel = document.querySelector('[data-featured-carousel]');

    if (featuredCarousel) {
        const track = featuredCarousel.querySelector('[data-carousel-track]');
        const slides = Array.from(featuredCarousel.querySelectorAll('[data-carousel-slide]'));
        const dots = Array.from(featuredCarousel.querySelectorAll('[data-carousel-go]'));
        const toggleButton = featuredCarousel.querySelector('[data-carousel-toggle]');
        const previousButton = featuredCarousel.querySelector('[data-carousel-prev]');
        const nextButton = featuredCarousel.querySelector('[data-carousel-next]');
        const currentCounter = featuredCarousel.querySelector('[data-carousel-current]');
        const progress = featuredCarousel.querySelector('[data-carousel-progress]');
        const statusRegion = featuredCarousel.querySelector('[data-carousel-status]');
        const viewport = featuredCarousel.querySelector('.carousel-viewport');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const rotationDelay = 11000;
        let activeIndex = 0;
        let rotationTimer = null;
        let pointerStartX = null;
        let userPaused = false;
        let pointerInside = false;
        let focusInside = false;

        function isDialogOpen() {
            return Boolean(dialog?.open);
        }

        function shouldRotate() {
            return !userPaused
                && !pointerInside
                && !focusInside
                && !isDialogOpen()
                && !reduceMotion.matches
                && !document.hidden
                && slides.length > 1;
        }

        function updatePauseButton() {
            if (!toggleButton) return;

            const textKey = userPaused ? 'featured.resumeRotation' : 'featured.pauseRotation';
            const labelKey = userPaused ? 'featured.resumeRotationLabel' : 'featured.pauseRotationLabel';
            const text = getTranslation(textKey);
            const label = getTranslation(labelKey);

            toggleButton.textContent = text;
            toggleButton.setAttribute('aria-label', label);
            toggleButton.classList.toggle('is-paused', userPaused);
        }

        function announceCurrentSlide() {
            if (!statusRegion) return;

            const activeSlide = slides[activeIndex];
            const slideLabel = activeSlide?.getAttribute('aria-label') || '';
            const title = activeSlide?.querySelector('h3')?.textContent?.trim() || '';
            statusRegion.textContent = title ? `${slideLabel}: ${title}` : slideLabel;
        }

        function updateCarousel(options = {}) {
            if (!track || slides.length === 0) return;

            const { userInitiated = false } = options;

            track.style.transform = `translateX(-${activeIndex * 100}%)`;

            slides.forEach((slide, index) => {
                const isActive = index === activeIndex;
                slide.setAttribute('aria-hidden', String(!isActive));
                slide.toggleAttribute('inert', !isActive);
            });

            dots.forEach((dot, index) => {
                const isActive = index === activeIndex;
                dot.classList.toggle('is-active', isActive);
                if (isActive) dot.setAttribute('aria-current', 'true');
                else dot.removeAttribute('aria-current');
            });

            if (currentCounter) currentCounter.textContent = String(activeIndex + 1).padStart(2, '0');
            if (progress) progress.style.transform = `translateX(${activeIndex * 100}%)`;

            if (statusRegion) {
                if (userInitiated) announceCurrentSlide();
                else statusRegion.textContent = '';
            }
        }

        function stopRotation() {
            if (rotationTimer !== null) {
                window.clearInterval(rotationTimer);
                rotationTimer = null;
            }
        }

        function startRotation() {
            if (!shouldRotate() || rotationTimer !== null) return;
            rotationTimer = window.setInterval(() => {
                activeIndex = (activeIndex + 1) % slides.length;
                updateCarousel();
            }, rotationDelay);
        }

        function syncRotation() {
            if (shouldRotate()) startRotation();
            else stopRotation();
        }

        syncCarouselRotation = syncRotation;

        function restartRotation() {
            stopRotation();
            syncRotation();
        }

        function goToSlide(index, options = {}) {
            const { userInitiated = false, restart = true } = options;
            activeIndex = (index + slides.length) % slides.length;
            updateCarousel({ userInitiated });
            if (restart) restartRotation();
        }

        updateCarouselTranslations = updatePauseButton;

        previousButton?.addEventListener('click', () => goToSlide(activeIndex - 1, { userInitiated: true }));
        nextButton?.addEventListener('click', () => goToSlide(activeIndex + 1, { userInitiated: true }));
        dots.forEach((dot) => dot.addEventListener('click', () => goToSlide(Number(dot.dataset.carouselGo), { userInitiated: true })));

        toggleButton?.addEventListener('click', () => {
            userPaused = !userPaused;
            updatePauseButton();
            syncRotation();
        });

        featuredCarousel.addEventListener('mouseenter', () => {
            pointerInside = true;
            syncRotation();
        });
        featuredCarousel.addEventListener('mouseleave', () => {
            pointerInside = false;
            syncRotation();
        });
        featuredCarousel.addEventListener('focusin', () => {
            focusInside = true;
            syncRotation();
        });
        featuredCarousel.addEventListener('focusout', () => {
            window.setTimeout(() => {
                focusInside = featuredCarousel.contains(document.activeElement);
                syncRotation();
            }, 0);
        });

        viewport?.addEventListener('pointerdown', (event) => {
            pointerStartX = event.clientX;
        });

        viewport?.addEventListener('pointerup', (event) => {
            if (pointerStartX === null) return;
            const distance = event.clientX - pointerStartX;
            pointerStartX = null;

            if (Math.abs(distance) < 45) return;
            goToSlide(distance > 0 ? activeIndex - 1 : activeIndex + 1, { userInitiated: true });
        });

        viewport?.addEventListener('pointercancel', () => {
            pointerStartX = null;
        });

        document.addEventListener('visibilitychange', syncRotation);

        if (typeof reduceMotion.addEventListener === 'function') {
            reduceMotion.addEventListener('change', syncRotation);
        } else if (typeof reduceMotion.addListener === 'function') {
            reduceMotion.addListener(syncRotation);
        }

        updatePauseButton();
        updateCarousel();
        syncRotation();
    }

    const dialogPageCounts = {
        deutschos: 1,
        portfolio: 2,
        phage: 2,
        chitosan: 2,
        laprincesa: 1,
        celignis: 1
    };
    const dialogTechnicalTags = {
        en: ['Chitosan', 'Microplastics', 'Biofilms', 'MiSeq', 'FTIR', 'Adsorption assays', 'Biocompatibility'],
        es: ['Quitosano', 'Microplásticos', 'Biopelículas', 'MiSeq', 'FTIR', 'Ensayos de adsorción', 'Biocompatibilidad'],
        de: ['Chitosan', 'Mikroplastik', 'Biofilme', 'MiSeq', 'FTIR', 'Adsorptionsassays', 'Biokompatibilität']
    };
    const reduceDialogMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastDialogTrigger = null;
    let dialogReturnHash = '';
    let dialogTransitioning = false;

    function formatDialogText(key, replacements) {
        return Object.entries(replacements).reduce(
            (text, [name, value]) => text.replace(`{${name}}`, value),
            getTranslation(key)
        );
    }

    function createDialogElement(tagName, className = '', text = '') {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function setLongTitleClass(element, text) {
        if (!element || typeof text !== 'string') return;
        element.classList.toggle('is-long-title', text.length > 78);
    }

    function getDialogPageTitles(entryId) {
        const titleKeys = {
            deutschos: ['dialog.overview'],
            portfolio: ['dialog.overview', 'dialog.portfolioDetails'],
            phage: ['dialog.overview', 'dialog.academicContext'],
            chitosan: ['dialog.proposal', 'dialog.hypotheses']
        };
        return (titleKeys[entryId] || ['dialog.overview']).map((key) => getTranslation(key));
    }

    function appendIntroduction(container, data) {
        const header = createDialogElement('header', 'dialog-introduction');
        const meta = createDialogElement('div', 'dialog-meta');
        const category = createDialogElement('span', '', data.category);
        const title = createDialogElement('h2', '', data.title);
        const summary = createDialogElement('p', 'dialog-lead', data.summary);
        const categorySegments = data.category
            .split('·')
            .map((segment) => segment.trim().toLocaleLowerCase(currentLanguage));
        const normalizedStatus = data.status.trim().toLocaleLowerCase(currentLanguage);

        title.id = 'dialog-title';
        title.dataset.dialogTitle = '';
        title.tabIndex = -1;
        setLongTitleClass(title, data.title);
        meta.append(category);
        if (!categorySegments.includes(normalizedStatus)) {
            meta.append(createDialogElement('span', '', data.status));
        }
        header.append(meta, title, summary);
        container.append(header);
    }

    function appendPageHeader(container, data, pageTitle, intro = '') {
        const header = createDialogElement('header', 'dialog-page-body');
        const kicker = createDialogElement('p', 'dialog-page-kicker', data.category);
        const title = createDialogElement('h2', 'dialog-page-heading', pageTitle);

        title.id = 'dialog-title';
        title.dataset.dialogTitle = '';
        title.tabIndex = -1;
        title.setAttribute('aria-label', `${data.title}: ${pageTitle}`);
        setLongTitleClass(title, pageTitle);
        header.append(kicker, title);
        if (intro) header.append(createDialogElement('p', 'dialog-lead', intro));
        container.append(header);
    }

    function appendSectionHeading(container, kickerText, headingText) {
        container.append(
            createDialogElement('p', 'dialog-section-kicker', kickerText),
            createDialogElement('h3', 'dialog-section-heading', headingText)
        );
    }

    function createEditorialBlock(title, body, modifier = '') {
        const section = createDialogElement('section', `dialog-editorial-block${modifier ? ` ${modifier}` : ''}`);
        section.append(
            createDialogElement('h3', '', title),
            createDialogElement('p', '', body)
        );
        return section;
    }

    function appendOverviewBand(container, items) {
        const band = createDialogElement('div', 'dialog-overview-band');
        items.forEach((item) => {
            const section = createDialogElement('section');
            section.append(
                createDialogElement('h3', '', item.title),
                createDialogElement('p', '', item.body)
            );
            band.append(section);
        });
        container.append(band);
    }

    function appendPracticeOverview(container, data) {
        const layout = createDialogElement('div', 'dialog-practice-layout');
        const context = createEditorialBlock(getTranslation('dialog.context'), data.context, 'dialog-practice-context');
        const columns = createDialogElement('div', 'dialog-practice-columns');
        const technicalWork = createEditorialBlock(
            getTranslation('dialog.technicalWork'),
            data.technicalWork,
            'dialog-practice-work'
        );
        const evidence = createDialogElement('section', 'dialog-practice-evidence');
        const evidenceGroups = createDialogElement('div', 'dialog-practice-evidence-groups');

        evidence.append(createDialogElement('h3', '', getTranslation('dialog.technicalEvidence')));
        if (data.technicalEvidenceLead) {
            evidence.append(createDialogElement('p', 'dialog-practice-evidence-lead', data.technicalEvidenceLead));
        }

        (data.technicalEvidenceGroups || []).forEach((group) => {
            const section = createDialogElement('section', 'dialog-practice-evidence-group');
            section.append(
                createDialogElement('h4', '', group.title),
                createDialogElement('p', '', group.body)
            );
            evidenceGroups.append(section);
        });

        evidence.append(evidenceGroups);
        columns.append(technicalWork, evidence);
        layout.append(context, columns);
        container.append(layout);
    }

    function appendDisclosure(container, disclosure) {
        if (!disclosure) {
            return;
        }

        const disclosureContainer = createDialogElement('p', 'dialog-disclosure');
        const disclosureText = createDialogElement('span', 'dialog-disclosure__text', disclosure);

        disclosureContainer.append(disclosureText);
        container.append(disclosureContainer);
    }

    function appendResources(container, resources = []) {
        if (resources.length === 0) return;

        const section = createDialogElement('section', 'dialog-resource-section');
        const links = createDialogElement('div', 'dialog-resources');
        section.append(createDialogElement('h3', '', getTranslation('dialog.resources')));

        resources.forEach((resource) => {
            const link = createDialogElement('a', 'dialog-resource', resource.label);
            link.href = resolveWorkbenchResource(resource.href);
            link.target = '_blank';
            link.rel = 'noopener';
            links.append(link);
        });

        section.append(links);
        container.append(section);
    }

    function renderOverviewPage(container, entryId, data) {
        const details = Array.isArray(data.details) ? data.details : [];
        appendIntroduction(container, data);

        if (entryId === 'laprincesa' || entryId === 'celignis') {
            appendPracticeOverview(container, data);

            const body = createDialogElement('section', 'dialog-page-body');
            appendDisclosure(body, data.disclosure);
            container.append(body);
            return;
        }

        if (entryId === 'chitosan') {
            appendOverviewBand(container, [
                { title: getTranslation('dialog.problem'), body: data.problem },
                details[0],
                details[5],
                details[6]
            ]);

            const body = createDialogElement('section', 'dialog-page-body');
            appendSectionHeading(body, getTranslation('dialog.proposal'), getTranslation('dialog.evidenceHeading'));
            const grid = createDialogElement('div', 'dialog-editorial-grid');
            grid.append(
                createEditorialBlock(getTranslation('dialog.contribution'), data.contribution),
                createEditorialBlock(getTranslation('dialog.result'), data.result)
            );
            body.append(grid);
            container.append(body);
            return;
        }

        appendOverviewBand(container, [
            { title: getTranslation('dialog.problem'), body: data.problem },
            { title: getTranslation('dialog.contribution'), body: data.contribution },
            { title: getTranslation('dialog.result'), body: data.result },
            { title: getTranslation('dialog.next'), body: data.next }
        ]);

        if (dialogPageCounts[entryId] === 1) {
            const body = createDialogElement('section', 'dialog-page-body');
            appendDisclosure(body, data.disclosure);
            container.append(body);
        }
    }

    function renderPortfolioDetails(container, data, pageTitle) {
        appendPageHeader(container, data, pageTitle, data.summary);
        const body = createDialogElement('section', 'dialog-page-body');
        const grid = createDialogElement('div', 'dialog-editorial-grid dialog-editorial-grid--asymmetric');
        const details = data.details || [];

        grid.append(
            createEditorialBlock(details[0].title, details[0].body),
            createEditorialBlock(details[1].title, details[1].body),
            createEditorialBlock(details[2].title, details[2].body)
        );
        body.append(grid);
        appendResources(body, data.resources);
        appendDisclosure(body, data.disclosure);
        container.append(body);
    }

    function renderPhageDetails(container, data, pageTitle) {
        container.classList.add('dialog-content--phage-details');
        appendPageHeader(container, data, pageTitle, data.summary);
        const body = createDialogElement('section', 'dialog-page-body');
        const grid = createDialogElement('div', 'dialog-editorial-grid dialog-editorial-grid--phage');
        const details = data.details || [];

        [details[0], details[2], details[1]].filter(Boolean).forEach((detail) => {
            grid.append(createEditorialBlock(detail.title, detail.body));
        });
        body.append(grid);
        appendResources(body, data.resources);
        appendDisclosure(body, data.disclosure);
        container.append(body);
    }

    function renderChitosanHypotheses(container, data, pageTitle) {
        appendPageHeader(container, data, pageTitle, getTranslation('dialog.hypothesesIntro'));
        const body = createDialogElement('section', 'dialog-page-body');
        const grid = createDialogElement('div', 'dialog-hypothesis-grid');
        const hypotheses = (data.details || []).slice(1, 5);

        hypotheses.forEach((hypothesis) => {
            const section = createDialogElement('section', 'dialog-hypothesis');
            section.append(
                createDialogElement('h3', '', hypothesis.title),
                createDialogElement('p', '', hypothesis.body)
            );
            grid.append(section);
        });

        body.append(grid);
        const nextGrid = createDialogElement('div', 'dialog-editorial-grid');
        nextGrid.append(
            createEditorialBlock(getTranslation('dialog.next'), data.next, 'dialog-editorial-block--wide')
        );
        body.append(nextGrid);

        const tags = createDialogElement('ul', 'dialog-tag-list');
        tags.setAttribute('aria-label', getTranslation('dialog.tags'));
        dialogTechnicalTags[currentLanguage].forEach((tag) => {
            tags.append(createDialogElement('li', '', tag));
        });
        body.append(tags);
        appendDisclosure(body, data.disclosure);
        container.append(body);
    }

    function renderDialogPage(entryId, pageIndex, data) {
        if (!dialogPageContent) return;
        dialogPageContent.replaceChildren();
        const pageTitles = getDialogPageTitles(entryId);

        if (pageIndex === 0) {
            renderOverviewPage(dialogPageContent, entryId, data);
            return;
        }

        if (entryId === 'portfolio') renderPortfolioDetails(dialogPageContent, data, pageTitles[pageIndex]);
        if (entryId === 'phage') renderPhageDetails(dialogPageContent, data, pageTitles[pageIndex]);
        if (entryId === 'chitosan') renderChitosanHypotheses(dialogPageContent, data, pageTitles[pageIndex]);
    }

    function populateDialogPageTab(entryId, pageIndex, pageCount) {
        if (!dialogPageTab) return;

        if (pageCount < 2) {
            dialogPageTab.hidden = true;
            return;
        }

        const otherPage = pageIndex === 0 ? 1 : 0;
        const pageTitles = getDialogPageTitles(entryId);
        const currentPosition = formatDialogText('dialog.pagePosition', {
            current: pageIndex + 1,
            total: pageCount
        });
        const nextPageLabel = `${getTranslation('dialog.pageShortLabel')} ${otherPage + 1}`;
        const direction = pageIndex === 0 ? '→' : '←';

        dialogPageTab.hidden = false;
        dialogPageTab.dataset.page = String(otherPage);

        if (dialogTabPosition) dialogTabPosition.textContent = currentPosition;
        if (dialogTabDirection) dialogTabDirection.textContent = direction;

        dialogPageTab.setAttribute('aria-label', formatDialogText('dialog.openPageNamed', {
            page: otherPage + 1,
            total: pageCount,
            title: pageTitles[otherPage]
        }));
        dialogPageTab.setAttribute('title', nextPageLabel);
    }

    function populateDialog(entryId, { resetScroll = true, page = 0 } = {}) {
        const data = entryData[currentLanguage]?.[entryId] || entryData.en[entryId];
        if (!dialog || !data || !dialogPageCounts[entryId]) return false;

        if (dialogAnnouncement) dialogAnnouncement.textContent = '';

        const pageCount = dialogPageCounts[entryId];
        const pageIndex = Math.max(0, Math.min(Number(page) || 0, pageCount - 1));
        dialog.dataset.entryId = entryId;
        dialog.dataset.page = String(pageIndex);
        dialog.classList.toggle('is-single-page', pageCount === 1);
        renderDialogPage(entryId, pageIndex, data);

        if (dialogNavigation) dialogNavigation.hidden = pageCount === 1;
        if (dialogPageTab) dialogPageTab.hidden = pageCount === 1;
        if (dialogPrevious) dialogPrevious.disabled = pageIndex === 0;
        if (dialogNext) dialogNext.disabled = pageIndex === pageCount - 1;

        const position = formatDialogText('dialog.pagePosition', {
            current: pageIndex + 1,
            total: pageCount
        });
        const positionNode = dialog.querySelector('[data-dialog-position]');
        if (positionNode) positionNode.textContent = position;
        if (dialogToolbarPosition) dialogToolbarPosition.textContent = position;
        populateDialogPageTab(entryId, pageIndex, pageCount);

        if (resetScroll && dialogScroll) dialogScroll.scrollTop = 0;
        return true;
    }

    function updateEntryHash(entryId, mode = 'replace') {
        const method = mode === 'push' ? 'pushState' : 'replaceState';
        window.history[method](null, '', `#entry-${entryId}`);
    }

    function focusDialogTitle() {
        dialog?.querySelector('[data-dialog-title]')?.focus({ preventScroll: true });
    }

    function announceDialogChange(entryId, pageIndex) {
        const pageCount = dialogPageCounts[entryId];
        const pageTitle = getDialogPageTitles(entryId)[pageIndex];
        if (!dialogAnnouncement || !pageTitle) return;

        dialogAnnouncement.textContent = '';
        dialogAnnouncement.textContent = formatDialogText('dialog.pageChanged', {
            current: pageIndex + 1,
            total: pageCount,
            title: pageTitle
        });
    }

    async function animateDialogChange(direction) {
        if (
            reduceDialogMotion.matches
            || typeof dialogPanel?.animate !== 'function'
        ) return;

        const offset = direction > 0 ? '-1rem' : '1rem';
        const animation = dialogPanel.animate(
            [
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: `translate(${offset}, 0.55rem) scale(0.992)`, opacity: 0.5 }
            ],
            { duration: 130, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
        );
        await animation.finished.catch(() => {});
        animation.cancel();
    }

    function animateDialogArrival(direction) {
        if (reduceDialogMotion.matches || typeof dialogPanel?.animate !== 'function') return;

        const horizontalOffset = direction > 0 ? '1rem' : '-1rem';
        dialogPanel.animate(
            [
                { transform: `translate(${horizontalOffset}, 0.45rem) scale(0.994)`, opacity: 0.68 },
                { transform: 'translate(0, 0) scale(1)', opacity: 1 }
            ],
            { duration: 170, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
        );
    }

    async function switchDialogPage(pageIndex) {
        const entryId = dialog?.dataset.entryId;
        const currentPage = Number(dialog?.dataset.page || 0);
        const pageCount = dialogPageCounts[entryId];
        if (!dialog?.open || dialogTransitioning || !pageCount) return;
        if (pageIndex < 0 || pageIndex >= pageCount || pageIndex === currentPage) return;

        dialogTransitioning = true;
        try {
            const direction = pageIndex > currentPage ? 1 : -1;
            await animateDialogChange(direction);
            if (!dialog.open) return;

            populateDialog(entryId, { page: pageIndex });
            announceDialogChange(entryId, pageIndex);
            focusDialogTitle();
            animateDialogArrival(direction);
        } finally {
            dialogTransitioning = false;
        }
    }

    function navigateDialog(offset) {
        const currentPage = Number(dialog?.dataset.page || 0);
        void switchDialogPage(currentPage + offset);
    }

    function restoreDialogFocus() {
        const focusTarget = lastDialogTrigger;
        lastDialogTrigger = null;

        if (focusTarget?.isConnected && typeof focusTarget.focus === 'function') {
            focusTarget.focus();
        }
    }

    function closeEntryDialog({ restoreHash = true } = {}) {
        if (!dialog) return;

        if (restoreHash && hashToEntry[window.location.hash]) {
            const target = `${window.location.pathname}${window.location.search}${dialogReturnHash}`;
            window.history.replaceState(null, '', target);
        }

        if (typeof dialog.close === 'function' && dialog.open) {
            dialog.close();
        } else if (dialog.hasAttribute('open')) {
            dialog.removeAttribute('open');
            document.body.classList.remove('is-entry-dialog-open');
            syncCarouselRotation?.();
            restoreDialogFocus();
            dialogReturnHash = '';
        }
    }

    const hashToEntry = {
        '#entry-deutschos': 'deutschos',
        '#entry-portfolio': 'portfolio',
        '#entry-laprincesa': 'laprincesa',
        '#entry-celignis': 'celignis',
        '#entry-phage': 'phage',
        '#entry-chitosan': 'chitosan',
        '#deutschos': 'deutschos',
        '#portfolio': 'portfolio',
        '#laprincesa': 'laprincesa',
        '#celignis': 'celignis',
        '#phage': 'phage',
        '#chitosan': 'chitosan'
    };

    function openEntryDialog(entryId, trigger = null, { updateHash = true } = {}) {
        if (!entryData.en[entryId] || !dialog) return;

        if (dialog.open) {
            populateDialog(entryId, { page: 0 });
            if (updateHash) updateEntryHash(entryId);
            focusDialogTitle();
            return;
        }

        lastDialogTrigger = trigger;
        dialogReturnHash = hashToEntry[window.location.hash] ? '' : window.location.hash;
        populateDialog(entryId);

        if (typeof dialog.showModal === 'function' && !dialog.open) {
            dialog.showModal();
        } else if (!dialog.open) {
            dialog.setAttribute('open', '');
        }

        document.body.classList.add('is-entry-dialog-open');
        if (updateHash) updateEntryHash(entryId, 'push');
        focusDialogTitle();
        syncCarouselRotation?.();
    }

    function handleEntryHash() {
        const entryId = hashToEntry[window.location.hash];
        if (!entryId) {
            if (dialog?.open) closeEntryDialog({ restoreHash: false });
            return;
        }

        const trigger = document.querySelector(`#entry-${entryId} [data-entry-open="${entryId}"]`)
            || document.querySelector(`[data-entry-open="${entryId}"]`);
        openEntryDialog(entryId, trigger, { updateHash: false });
    }

    document.querySelectorAll('[data-entry-open]').forEach((button) => {
        button.addEventListener('click', () => openEntryDialog(button.dataset.entryOpen, button));
    });

    dialogPrevious?.addEventListener('click', () => navigateDialog(-1));
    dialogNext?.addEventListener('click', () => navigateDialog(1));
    dialogPageTab?.addEventListener('click', () => {
        void switchDialogPage(Number(dialogPageTab.dataset.page));
    });
    dialogPageTab?.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        void switchDialogPage(Number(dialogPageTab.dataset.page));
    });
    dialogClose?.addEventListener('click', () => closeEntryDialog());
    dialog?.addEventListener('cancel', (event) => {
        event.preventDefault();
        closeEntryDialog();
    });
    dialog?.addEventListener('click', (event) => {
        const clickTarget = event.target;
        if (!(clickTarget instanceof Element)) return;
        if (clickTarget.closest('[data-dialog-panel], [data-dialog-page-tab]')) return;
        closeEntryDialog();
    });
    dialog?.addEventListener('close', () => {
        document.body.classList.remove('is-entry-dialog-open');
        syncCarouselRotation?.();
        restoreDialogFocus();
        dialogReturnHash = '';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !dialog?.open) return;
        event.preventDefault();
        closeEntryDialog();
    });

    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((records) => {
            records.forEach((record) => {
                if (record.isIntersecting) {
                    record.target.classList.add('is-visible');
                    observer.unobserve(record.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    }

    translatePage();
    handleEntryHash();
    window.addEventListener('hashchange', handleEntryHash);
})();
