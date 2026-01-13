import {
  html,
  LitElement,
} from 'lit'

export class LitRenderer extends LitElement {
  story: string

  static override properties = {
    story: { type: String },
  }

  constructor() {
    super()
    this.story = ''
  }

  override render() {
    return html`<p>Hello from my LitRenderer.</p>`
  }
}

export function registerLitRenderer() {
  customElements.define('lit-renderer', LitRenderer)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-renderer': LitRenderer
  }
}
