export function hidePortalDiv(el: HTMLElement): void {
  el.style.display = 'contents'
  el.dataset.solidPortal = 'true'
}
