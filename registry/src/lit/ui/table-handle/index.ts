import { LitTableHandle } from './table-handle'

export function registryLitEditorTableHandle() {
  if (customElements.get('lit-editor-table-handle')) return
  customElements.define('lit-editor-table-handle', LitTableHandle)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-table-handle': LitTableHandle
  }
}
