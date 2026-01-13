import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  html,
  LitElement,
} from 'lit'

export class Editor extends LitElement {
  override render() {
    return html`<p>Hello from lit-editor-minimal.</p>`
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
