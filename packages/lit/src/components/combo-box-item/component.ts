import { consume } from '@lit/context'
import type { Editor } from '@prosekit/core'
import { customElement, property, query, state } from 'lit/decorators.js'

import { LightElement } from '../block-element'
import { comboBoxContext, type ComboBoxContext } from '../combo-box/context'

export const propNames = []

export type ComboBoxItemProps = {
  onSelect?: VoidFunction
}

@customElement('prosekit-combo-box-item')
export class ComboBoxItem extends LightElement {
  @property({ attribute: false })
  editor?: Editor

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  @property({ type: Boolean, reflect: true, attribute: 'data-selected' })
  selected = false

  @consume({ context: comboBoxContext, subscribe: true })
  @state({})
  comboBoxContext?: ComboBoxContext

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  protected updated(): void {
    const content = (this.textContent ?? '').trim()
    const query = (this.comboBoxContext?.inputValue ?? '').trim()

    const match = content.toLowerCase().includes(query.toLowerCase())
    this.selected = match && content === this.comboBoxContext?.selectedValue
    this.ariaSelected = String(this.selected)
    this.setHidden(!match)
  }
}
