import 'prosekit/lit/drop-indicator'

import { ContextConsumer } from '@lit/context'
import { html, LitElement } from 'lit'

import { editorContext } from '../editor-context'

export class LitDropIndicator extends LitElement {
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
    return html`<prosekit-drop-indicator
      .editor=${this._editorConsumer.value ?? null}
      class="CSS_DROP_INDICATOR"
    ></prosekit-drop-indicator>`
  }
}
