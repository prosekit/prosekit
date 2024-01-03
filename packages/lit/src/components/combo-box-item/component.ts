import { ContextConsumer } from '@lit/context'
import type { Editor } from '@prosekit/core'
import type { PropertyDeclarations, PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'
import { comboBoxContext } from '../combo-box/context'

/**
 * @internal
 */
export const propNames = ['onSelect'] as const

/**
 * @internal
 */
export type ComboBoxItemProps = {
  onSelect?: VoidFunction
}

/**
 * @internal
 */
export class ComboBoxItem extends LightElement {
  /**
   * @hidden
   */
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

  /**
   * @hidden
   */
  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    const content = (this.textContent ?? '').trim()
    const query = (this.comboBoxContext.value?.inputValue ?? '').trim()

    const match = content.toLowerCase().includes(query.toLowerCase())
    this.selected =
      match && content === this.comboBoxContext.value?.selectedValue
    this.ariaSelected = String(this.selected)
    this.setHidden(!match)

    if (
      this.selected &&
      changedProperties.has('selected') &&
      !changedProperties.get('selected') &&
      this.comboBoxContext.value?.selectedReason === 'keyboard'
    ) {
      this.scrollIntoView({ block: 'nearest' })
    }
  }
}

defineCustomElement('prosekit-combo-box-item', ComboBoxItem)
