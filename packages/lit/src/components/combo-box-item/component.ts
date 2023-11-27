import { ContextConsumer } from '@lit/context'
import type { Editor } from '@prosekit/core'
import type { PropertyDeclarations } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'
import { comboBoxContext } from '../combo-box/context'

export const propNames = []

export type ComboBoxItemProps = {
  onSelect?: VoidFunction
}

export class ComboBoxItem extends LightElement {
  static properties = {
    editor: { attribute: false },
    selected: { type: Boolean, reflect: true, attribute: 'data-selected' },
    onSelect: { attribute: false },
  } satisfies PropertyDeclarations

  editor?: Editor
  selected = false
  onSelect?: VoidFunction

  private comboBoxContext = new ContextConsumer(this, {
    context: comboBoxContext,
    subscribe: true,
  })

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

defineCustomElement('prosekit-combo-box-item', ComboBoxItem)
