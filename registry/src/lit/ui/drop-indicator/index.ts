import { LitDropIndicator } from './drop-indicator'

export function registryLitEditorDropIndicator() {
  if (customElements.get('lit-editor-drop-indicator')) return
  customElements.define('lit-editor-drop-indicator', LitDropIndicator)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-drop-indicator': LitDropIndicator
  }
}
