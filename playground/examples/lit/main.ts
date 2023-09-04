import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import './app'

@customElement('my-element')
export class MyElement extends LitElement {
  render() {
    return html`
      <my-editor></my-editor>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
