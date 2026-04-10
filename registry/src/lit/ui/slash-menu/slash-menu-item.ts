import 'prosekit/lit/autocomplete'

import { html, LitElement } from 'lit'

class SlashMenuItemElement extends LitElement {
  static override properties = {
    label: { type: String },
    kbd: { type: String },
  }

  label: string
  kbd: string

  constructor() {
    super()
    this.label = ''
    this.kbd = ''
  }

  override createRenderRoot() {
    return this
  }

  // TODO: maybe this should changed to valueChange event??
  handleSelect = () => {
    this.dispatchEvent(new CustomEvent('select'))
  }

  override render() {
    return html`<prosekit-autocomplete-item
      @select=${this.handleSelect}
      class="CSS_AUTOCOMPLETE_MENU_ITEM"
    >
      <span>${this.label}</span>${this.kbd
        ? html`<kbd class="CSS_AUTOCOMPLETE_MENU_KEYBOARD">${this.kbd}</kbd>`
        : ''}
    </prosekit-autocomplete-item>`
  }
}

customElements.define('lit-editor-slash-menu-item', SlashMenuItemElement)
