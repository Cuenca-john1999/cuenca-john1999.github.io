document.addEventListener('DOMContentLoaded', () => {
    if (typeof Language === 'undefined' || typeof Language.init !== 'function') return;
    const syncDocumentTitle = () => {
        const heading = document.querySelector('[data-page-title]');
        if (heading?.textContent?.trim()) document.title = `${heading.textContent.trim()} | Jhon M. Cuenca`;
    };
    Promise.resolve(Language.init()).then(() => {
        syncDocumentTitle();
        const heading = document.querySelector('[data-page-title]');
        if (heading && 'MutationObserver' in window) new MutationObserver(syncDocumentTitle).observe(heading, {childList:true,subtree:true,characterData:true});
    }).catch((error) => console.warn('[AUXILIARY PAGE] Language initialization failed', error));
});
