import { provide } from '@lit-labs/context'
import type { Editor } from '@prosekit/core'
import { html, type CSSResultGroup } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { ListManager } from '../../manager/list-manager'
import { blockComponentStyles } from '../../styles/block-component.styles'
import { BlockElement } from '../block-element'
import { ComboBoxItem } from '../combo-box-item'
import {
  isComboBoxItem,
  queryClosestComboBoxItem,
} from '../combo-box-item/helpers'
import type { ComboBoxList } from '../combo-box-list'
import { isComboBoxList } from '../combo-box-list/helpers'

import { comboBoxContext, type ComboBoxContext } from './context'

@customElement('prosekit-combo-box')
export class ComboBox extends BlockElement {
  @property({ attribute: false })
  editor?: Editor

  private listManager = new ListManager<ComboBoxItem>({
    getItems: () => {
      return this.items
    },
    getSelectedValue: () => {
      return (this.context.selectedValue ?? '').trim()
    },
    setSelectedValue: (value: string) => {
      return this.context.setSelectedValue(value)
    },
    getItemValue: (item) => {
      return (item.textContent ?? '').trim()
    },
    queryClosestItem: queryClosestComboBoxItem,
    getActive: () => {
      return this.context.inputFocus ?? false
    },
    onDismiss: () => {
      return this.context.setInputFocus(false)
    },
    onSelect: (item) => {
      const value = (item?.textContent ?? '').trim()

      this.context.setSelectedValue(value)
      this.context.setInputValue(value)

      if (value) {
        this.context.setInputFocus(false)
      }
    },
  })

  @provide({ context: comboBoxContext })
  @state()
  context: ComboBoxContext = {
    inputFocus: false,
    setInputFocus: (inputFocus: boolean) => {
      if (this.context.inputFocus === inputFocus) {
        return
      }
      this.context = { ...this.context, inputFocus }
    },

    inputValue: '',
    setInputValue: (inputValue: string) => {
      if (this.context.inputValue === inputValue) {
        return
      }
      this.context = { ...this.context, inputValue }
    },

    selectedValue: '',
    setSelectedValue: (selectedValue: string) => {
      if (this.context.selectedValue === selectedValue) {
        return
      }
      this.context = { ...this.context, selectedValue }
    },

    listManager: this.listManager,
  }

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  get list(): ComboBoxList | null {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.find(isComboBoxList) ?? null
    )
  }

  get items(): ComboBoxItem[] {
    const items = this.querySelectorAll(':scope prosekit-combo-box-item')
    return Array.from(items).filter(isComboBoxItem)
  }

  /** @hidden */
  render() {
    return html`
      <slot></slot>
    `
  }
}
