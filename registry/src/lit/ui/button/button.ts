import 'prosekit/lit/tooltip'

import {
  html,
  LitElement,
  type PropertyDeclaration,
} from 'lit'

export class LitButton extends LitElement {
  static override properties = {
    pressed: { type: Boolean } satisfies PropertyDeclaration<boolean>,
    disabled: { type: Boolean } satisfies PropertyDeclaration<boolean>,
    tooltip: { type: String } satisfies PropertyDeclaration<string | undefined>,
  }

  pressed = false
  disabled = false
  tooltip?: string

  override createRenderRoot() {
    return this
  }

  override render() {
    return html`<prosekit-tooltip-root>
      <prosekit-tooltip-trigger class="CSS_TOOLTIP_TRIGGER">
        <button
          data-state=${this.pressed ? 'on' : 'off'}
          ?disabled=${this.disabled}
          class="CSS_TOGGLE_BUTTON"
          @mousedown=${(event: MouseEvent) => event.preventDefault()}
        >
          <slot></slot>
          ${this.tooltip
            ? html`<span class="sr-only">${this.tooltip}</span>`
            : null}
        </button>
      </prosekit-tooltip-trigger>
      ${this.tooltip
        ? html`<prosekit-tooltip-content class="CSS_TOOLTIP_CONTENT">
          ${this.tooltip}
        </prosekit-tooltip-content>`
        : null}
    </prosekit-tooltip-root>`
  }
}

customElements.define('lit-editor-button', LitButton)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-button': LitButton
  }
}
