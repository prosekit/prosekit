import 'prosekit/lit/drop-indicator'

import {
  html,
  LitElement,
  type PropertyDeclaration,
} from 'lit'
import type { Editor } from 'prosekit/core'

export class LitDropIndicator extends LitElement {
  static override properties = {
    editor: { attribute: false } satisfies PropertyDeclaration<Editor>,
  }

  editor?: Editor

  override createRenderRoot() {
    return this
  }

  override render() {
    return html`<prosekit-drop-indicator
      .editor=${this.editor ?? null}
      class="CSS_DROP_INDICATOR"
    ></prosekit-drop-indicator>`
  }
}

customElements.define('lit-editor-drop-indicator', LitDropIndicator)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-drop-indicator': LitDropIndicator
  }
}
