import 'prosekit/lit/block-handle'

import {
  html,
  LitElement,
  type PropertyDeclaration,
} from 'lit'
import type { Editor } from 'prosekit/core'

export class LitBlockHandle extends LitElement {
  static override properties = {
    editor: { attribute: false } satisfies PropertyDeclaration<Editor>,
    dir: { type: String } satisfies PropertyDeclaration<'ltr' | 'rtl'>,
  }

  editor?: Editor
  dir?: 'ltr' | 'rtl'

  override createRenderRoot() {
    return this
  }

  override render() {
    const placement = this.dir === 'rtl' ? 'right' : 'left'

    const editor = this.editor ?? null

    return html`<prosekit-block-handle-popover
      .editor=${editor}
      placement=${placement}
      class="CSS_BLOCK_HANDLE_POPOVER"
    >
      <prosekit-block-handle-add
        .editor=${editor}
        class="CSS_BLOCK_HANDLE_ADD"
      >
        <div class="CSS_ICON_PLUS"></div>
      </prosekit-block-handle-add>
      <prosekit-block-handle-draggable
        .editor=${editor}
        class="CSS_BLOCK_HANDLE_DRAG"
      >
        <div class="CSS_ICON_DRAG_HANDLE"></div>
      </prosekit-block-handle-draggable>
    </prosekit-block-handle-popover>`
  }
}

customElements.define('lit-editor-block-handle', LitBlockHandle)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-block-handle': LitBlockHandle
  }
}
