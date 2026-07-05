document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector('.prototype-stage');
    const svg = document.querySelector('.prototype-svg');

    if (!stage || !svg) {
        console.warn('[DNA prototype] No se encontró el laboratorio visual.');
        return;
    }

    stage.classList.add('is-ready');
    svg.setAttribute('data-ready', 'true');
});
