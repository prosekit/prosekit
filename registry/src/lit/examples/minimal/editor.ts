import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  html,
  LitElement,
} from 'lit'

export class Editor extends LitElement {
  override createRenderRoot() {
    return this
  }

  override render() {
    return html`<div class="CSS_MINIMAL_EDITOR">Hello from lit-editor-minimal.</div>`
  }
}

export function registerEditor() {
  customElements.define('lit-editor-minimal', Editor)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-minimal': Editor
  }
}
