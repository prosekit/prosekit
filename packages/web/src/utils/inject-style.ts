import { getDocument } from '@ocavue/utils'

export function injectStyle(container: HTMLElement, styleText: string): void {
  if (!styleText) {
    return
  }
  const document = getDocument(container)
  const style = document.createElement('style')
  style.textContent = styleText
  container.appendChild(style)
}
