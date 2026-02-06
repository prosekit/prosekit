import 'prosekit/lit/autocomplete'

import { html, LitElement } from 'lit'

class SlashMenuEmptyElement extends LitElement {
  override createRenderRoot() {
    return this
  }

  override render() {
    return html`<prosekit-autocomplete-empty class="CSS_AUTOCOMPLETE_MENU_ITEM">
      <span>No results</span>
    </prosekit-autocomplete-empty>`
  }
}

customElements.define('lit-editor-slash-menu-empty', SlashMenuEmptyElement)
