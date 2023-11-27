import { ContextConsumer } from '@lit/context'
import type { Editor } from '@prosekit/core'
import { customElement, property } from 'lit/decorators.js'

import { LightElement } from '../block-element'
import { comboBoxContext } from '../combo-box/context'

export const propNames = []

export type ComboBoxItemProps = {
  onSelect?: VoidFunction
}

@customElement('prosekit-combo-box-item')
export class ComboBoxItem extends LightElement {
  @property({ attribute: false })
  editor?: Editor

  @property({ type: Boolean, reflect: true, attribute: 'data-selected' })
  selected = false

  private comboBoxContext = new ContextConsumer(this, {
    context: comboBoxContext,
    subscribe: true,
  })

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  protected updated(): void {
    const content = (this.textContent ?? '').trim()
    const query = (this.comboBoxContext.value?.inputValue ?? '').trim()

    const match = content.toLowerCase().includes(query.toLowerCase())
    this.selected =
      match && content === this.comboBoxContext.value?.selectedValue
    this.ariaSelected = String(this.selected)
    this.setHidden(!match)
  }
}
