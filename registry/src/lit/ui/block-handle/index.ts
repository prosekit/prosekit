import { LitBlockHandle } from './block-handle'

export function registryLitEditorBlockHandle() {
  if (customElements.get('lit-editor-block-handle')) return
  customElements.define('lit-editor-block-handle', LitBlockHandle)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-block-handle': LitBlockHandle
  }
}
