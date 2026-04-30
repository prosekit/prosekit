import { registryLitEditorButton } from '../button'

import { LitImageUploadPopover } from './image-upload-popover'

export function registryLitEditorImageUploadPopover() {
  registryLitEditorButton()

  if (customElements.get('lit-editor-image-upload-popover')) return
  customElements.define('lit-editor-image-upload-popover', LitImageUploadPopover)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-image-upload-popover': LitImageUploadPopover
  }
}
