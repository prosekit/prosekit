import { html, LitElement } from 'lit'
import type { SelectEvent } from 'prosekit/lit/autocomplete'

export class SlashMenuItemElement extends LitElement {
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

  // Relay the inner item's non-bubbling `select` event on this element, so
  // consumers can listen for it without reaching into the light DOM.
  handleSelect = (event: SelectEvent) => {
    this.dispatchEvent(new CustomEvent('select', { detail: event.detail }))
  }

  override render() {
    return html`<prosekit-autocomplete-item
      @select=${this.handleSelect}
      class="CSS_AUTOCOMPLETE_MENU_ITEM"
    >
      <span>${this.label}</span>${
        this.kbd ? html`<kbd class="CSS_AUTOCOMPLETE_MENU_KEYBOARD">${this.kbd}</kbd>` : ''
      }
    </prosekit-autocomplete-item>`
  }
}
