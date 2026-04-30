import 'prosekit/lit/block-handle'

import { ContextConsumer } from '@lit/context'
import { html, LitElement } from 'lit'

import { editorContext } from '../editor-context'

export class LitBlockHandle extends LitElement {
  declare dir: 'ltr' | 'rtl' | 'auto'

  private _editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
  }

  override createRenderRoot() {
    return this
  }

  override render() {
    const placement = this.dir === 'rtl' ? 'right' : 'left'
    const editor = this._editorConsumer.value ?? null

    return html`<prosekit-block-handle-root .editor=${editor}>
      <prosekit-block-handle-positioner .placement=${placement} class="CSS_BLOCK_HANDLE_POSITIONER">
        <prosekit-block-handle-popup class="CSS_BLOCK_HANDLE_POPUP">
          <prosekit-block-handle-add .editor=${editor} class="CSS_BLOCK_HANDLE_ADD">
            <div class="CSS_ICON_PLUS"></div>
          </prosekit-block-handle-add>
          <prosekit-block-handle-draggable .editor=${editor} class="CSS_BLOCK_HANDLE_DRAG">
            <div class="CSS_ICON_DRAG_HANDLE"></div>
          </prosekit-block-handle-draggable>
        </prosekit-block-handle-popup>
      </prosekit-block-handle-positioner>
    </prosekit-block-handle-root>`
  }
}
