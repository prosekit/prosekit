import { registryLitEditorButton } from '../button'
import { registryLitEditorImageUploadPopover } from '../image-upload-popover'

import { LitToolbar } from './toolbar'

export function registryLitEditorToolbar() {
  registryLitEditorButton()
  registryLitEditorImageUploadPopover()

  if (customElements.get('lit-editor-toolbar')) return
  customElements.define('lit-editor-toolbar', LitToolbar)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-toolbar': LitToolbar
  }
}
