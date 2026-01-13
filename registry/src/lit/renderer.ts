import { LitElement } from 'lit'
import {
  html,
  unsafeStatic,
} from 'lit/static-html.js'

import { loaders } from './loaders.gen'

export class LitRenderer extends LitElement {
  story: string

  override createRenderRoot() {
    return this
  }

  static override properties = {
    story: { type: String },
  }

  constructor() {
    super()
    this.story = ''
  }

  override render() {
    const story = this.story

    if (!story) {
      return html`<p>Loading...</p>`
    }

    const loader = loaders[story as keyof typeof loaders]
    if (!loader) {
      const message = `[LitRenderer] No loader found for story ${story}`
      console.warn(message)
      return html`<p>${message}</p>`
    }

    void loader()
    const tag = unsafeStatic('lit-editor-' + story)
    return html`<${tag}></${tag}>`
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
