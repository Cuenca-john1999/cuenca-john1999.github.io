(() => {
    'use strict';
    const section = document.querySelector('[data-market-filters]')?.closest('section');
    if (!section) return;
    const filters = section.querySelector('[data-market-filters]');
    const search = section.querySelector('[data-market-search]');
    const area = section.querySelector('[data-market-area]');
    const level = section.querySelector('[data-market-level]');
    const topic = section.querySelector('[data-market-topic]');
    const route = section.querySelector('[data-market-route]');
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
                (!topic.value || topic.value === node.dataset.topic) &&
                (!route.value || node.dataset.routes.split(' ').includes(route.value)) &&
                words.every(word => text.includes(word));
            node.hidden = !match;
            if (match) visible++;
        }
        count.textContent = ({en:visible+' of '+entries.length+' skills',es:visible+' de '+entries.length+' competencias',de:visible+' von '+entries.length+' Fachkompetenzen'}[document.documentElement.lang.slice(0,2)] || String(visible));
        empty.hidden = visible !== 0;
    }
    search.addEventListener('input',render);
    area.addEventListener('change',render);
    level.addEventListener('change',render);
    topic.addEventListener('change',render);
    route.addEventListener('change',render);
    reset.addEventListener('click',() => {search.value=''; area.value=''; level.value=''; topic.value=''; route.value=''; render(); search.focus();});
    const params=new URLSearchParams(location.search),focus=params.get('focus');
    if(params.has('q'))search.value=params.get('q').slice(0,120);
    if (focus && Array.from(route.options).some(o => o.value === focus)) route.value=focus;
    filters.hidden=false;
    render();
})();
