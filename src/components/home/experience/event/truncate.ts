const TRUNCATE_AT = 140;
const BTN_CLASSES =
    'text-amber-600 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-1';

function renderCollapsed(
    prose: HTMLElement,
    id: string,
    title: string,
    snippet: string
) {
    prose.innerHTML = `<p>${snippet}\u2026 <button class="${BTN_CLASSES}" data-event-action="expand" aria-expanded="false" aria-controls="${id}"><span aria-hidden="true">more</span><span class="sr-only">Read more about ${title}</span></button></p>`;
}

function renderExpanded(
    prose: HTMLElement,
    id: string,
    title: string,
    fullHTML: string
) {
    prose.innerHTML = fullHTML;
    const lessBtn = document.createElement('button');
    lessBtn.className = BTN_CLASSES;
    lessBtn.setAttribute('data-event-action', 'collapse');
    lessBtn.setAttribute('aria-expanded', 'true');
    lessBtn.setAttribute('aria-controls', id);
    lessBtn.innerHTML = `<span aria-hidden="true">less</span><span class="sr-only">Read less about ${title}</span>`;
    prose.appendChild(lessBtn);
}

function initTruncation(prose: HTMLElement) {
    const id = prose.id;
    const title = prose.dataset.eventTitle ?? '';
    const fullHTML = prose.innerHTML;
    const fullText = prose.textContent?.trim() ?? '';

    if (prose.dataset.eventActive === 'true') return;
    if (fullText.length <= TRUNCATE_AT) return;

    let cutAt = TRUNCATE_AT;
    while (cutAt > 0 && fullText[cutAt] !== ' ') cutAt--;
    const snippet = fullText.slice(0, cutAt).replace(/[.,;:!?]+$/, '');

    renderCollapsed(prose, id, title, snippet);

    prose.addEventListener('click', (e) => {
        const btn = (e.target as HTMLElement).closest<HTMLElement>(
            '[data-event-action]'
        );
        if (!btn) return;
        if (btn.dataset.eventAction === 'expand')
            renderExpanded(prose, id, title, fullHTML);
        else if (btn.dataset.eventAction === 'collapse')
            renderCollapsed(prose, id, title, snippet);
    });
}

document
    .querySelectorAll<HTMLElement>('[data-event-prose]')
    .forEach(initTruncation);
