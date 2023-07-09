/**
 * @module @prosekit/lit/elements/menu-item
 */

import { CSSResultGroup, LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { blockComponentStyles } from '../styles/block-component.styles'

@customElement('prosekit-menu-item')
export class MenuItem extends LitElement {
  /** @hidden */
  constructor() {
    super()
  }

  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  @property({ type: Boolean, reflect: true, attribute: 'data-focused' })
  focused = false

  @property({ type: Boolean, reflect: true, attribute: 'data-hidden' })
  hidden = false

  @property({ attribute: false })
  onSelect?: VoidFunction

  /** @hidden */
  render() {
    return html`
      <div role="menuitem">
        <slot></slot>
      </div>
    `
  }
}
