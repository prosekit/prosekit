import 'prosekit/lit/tooltip'

import { html, LitElement, nothing, type PropertyDeclaration } from 'lit'

class LitButton extends LitElement {
  static override properties = {
    pressed: { type: Boolean },
    disabled: { type: Boolean },
    tooltip: { type: String },
    icon: { type: String },
  } satisfies Record<string, PropertyDeclaration>

  pressed = false
  disabled = false
  tooltip = ''
  icon = ''

  override createRenderRoot() {
    return this
  }

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
  }

  private handleMouseDown = (event: MouseEvent) => {
    // Prevent the editor from being blurred when the button is clicked
    event.preventDefault()
  }

  override render() {
    const tooltip = this.tooltip

    return html`
      <prosekit-tooltip-root>
        <prosekit-tooltip-trigger class="CSS_TOOLTIP_TRIGGER">
          <button
            data-state=${this.pressed ? 'on' : 'off'}
            class="CSS_TOGGLE_BUTTON"
            ?disabled=${this.disabled}
            @mousedown=${this.handleMouseDown}
          >
            ${this.icon ? html`<div class="${this.icon}"></div>` : nothing}
            ${tooltip ? html`<span class="sr-only">${tooltip}</span>` : nothing}
          </button>
        </prosekit-tooltip-trigger>
        ${
          tooltip
            ? html`
              <prosekit-tooltip-content class="CSS_TOOLTIP_CONTENT">
                ${tooltip}
              </prosekit-tooltip-content>
            `
            : nothing
        }
      </prosekit-tooltip-root>
    `
  }
}

customElements.define('lit-editor-button', LitButton)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-button': LitButton
  }
}
