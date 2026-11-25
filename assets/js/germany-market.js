(() => {
    'use strict';
    const section = document.getElementById('fachkatalog');
    if (!section) return;
    const filters = section.querySelector('[data-market-filters]');
    const search = section.querySelector('[data-market-search]');
    const area = section.querySelector('[data-market-area]');
    const level = section.querySelector('[data-market-level]');
    const reset = section.querySelector('[data-market-reset]');
    const count = section.querySelector('[data-market-count]');
    const empty = section.querySelector('[data-market-empty]');
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const entries = Array.from(section.querySelectorAll('[data-market-skill]'), node => ({node, text:normalize(node.textContent)}));
    function render() {
        const words = normalize(search.value).split(/\s+/).filter(Boolean);
        let visible = 0;
        for (const {node,text} of entries) {
            const match = (!area.value || area.value === node.dataset.area) &&
                (!level.value || level.value === node.dataset.level) &&
                words.every(word => text.includes(word));
            node.hidden = !match;
            if (match) visible++;
        }
        count.textContent = visible + ' von ' + entries.length + ' Fachkompetenzen';
        empty.hidden = visible !== 0;
    }
    search.addEventListener('input',render);
    area.addEventListener('change',render);
    level.addEventListener('change',render);
    reset.addEventListener('click',() => {search.value=''; area.value=''; level.value=''; render(); search.focus();});
    filters.hidden=false;
    render();
})();
