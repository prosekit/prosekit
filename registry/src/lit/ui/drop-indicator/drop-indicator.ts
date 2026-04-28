import 'prosekit/lit/drop-indicator'

import { ContextConsumer } from '@lit/context'
import {
  html,
  LitElement,
  type PropertyDeclaration,
  type PropertyValues,
} from 'lit'
import type { Editor } from 'prosekit/core'

import { editorContext } from '../editor-context'

export class LitDropIndicator extends LitElement {
  private _editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override createRenderRoot() {
    return this
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    // Force the prosekit-drop-indicator to update when editor becomes available
    const dropIndicator = this.querySelector('prosekit-drop-indicator')
    if (dropIndicator && this._editorConsumer.value) {
      ;(dropIndicator as any).editor = this._editorConsumer.value
    }
  }

  override render() {
    return html`<prosekit-drop-indicator
      .editor=${this._editorConsumer.value ?? null}
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
