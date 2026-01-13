import { LitElement } from 'lit'
import {
  html,
  unsafeStatic,
} from 'lit/static-html.js'

import { suppressLitWarnings } from './disable-lit-warnings'
import { loaders } from './loaders.gen'

suppressLitWarnings()

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
      return html`<p data-testid="lit-renderer-fallback">Loading...</p>`
    }

    const loader = loaders[story as keyof typeof loaders]
    if (!loader) {
      const message = `[LitRenderer] No loader found for story ${story}`
      console.warn(message)
      return html`<p data-testid="lit-renderer-fallback">${message}</p>`
    }

    void loader()
    const tag = unsafeStatic('lit-editor-' + story)
    return html`<${tag}></${tag}>`
  }
}

export function registerLitRenderer() {
  suppressLitWarnings()
  if (customElements.get('lit-renderer')) return
  customElements.define('lit-renderer', LitRenderer)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-renderer': LitRenderer
  }
}
