import { LitButton } from './button'

export function registryLitEditorButton() {
  if (customElements.get('lit-editor-button')) return
  customElements.define('lit-editor-button', LitButton)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-button': LitButton
  }
}
