import { provide } from '@lit-labs/context'
import type { Editor } from '@prosekit/core'
import { customElement, property, query, state } from 'lit/decorators.js'

import { ListManager } from '../../manager/list-manager'
import { ComboBoxItem } from '../combo-box-item'
import {
  isComboBoxItem,
  queryClosestComboBoxItem,
} from '../combo-box-item/helpers'
import type { ComboBoxList } from '../combo-box-list'
import { isComboBoxList } from '../combo-box-list/helpers'
import { Popover } from '../popover'

import { comboBoxContext, type ComboBoxContext } from './context'

export const propNames = []

export type ComboBoxProps = Record<string, never>

@customElement('prosekit-combo-box')
export class ComboBox extends Popover {
  @property({ attribute: false })
  editor?: Editor

  @property({ attribute: false })
  onDismiss?: VoidFunction

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
      return true
    },
    onDismiss: () => {
      this.onDismiss?.()
    },
    onSelect: (item) => {
      this.context.setSelectedValue('')
      this.context.setInputValue('')
      item?.onSelect?.()
      this.onDismiss?.()
    },
  })

  @provide({ context: comboBoxContext })
  @state()
  context: ComboBoxContext = {
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
}
