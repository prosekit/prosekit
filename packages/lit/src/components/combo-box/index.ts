import { ContextProvider } from '@lit/context'
import type { PropertyDeclarations } from 'lit'

import { ListManager } from '../../manager/list-manager'
import { defineCustomElement } from '../../utils/define-custom-element'
import { ComboBoxItem } from '../combo-box-item'
import {
  isComboBoxItem,
  queryClosestComboBoxItem,
} from '../combo-box-item/helpers'
import { Popover, type PopoverProps } from '../popover'

import { comboBoxContext, type ComboBoxContext } from './context'

export const propNames = ['onDismiss'] as const

export interface ComboBoxProps extends PopoverProps {
  onDismiss?: VoidFunction
}

export class ComboBox extends Popover {
  static properties = {
    ...Popover.properties,
    onDismiss: { attribute: false },
  } satisfies PropertyDeclarations

  onDismiss?: VoidFunction

  constructor() {
    super()
  }

  private listManager = new ListManager<ComboBoxItem>({
    getItems: () => {
      return this.items
    },
    getSelectedValue: () => {
      return (this.getContext().selectedValue ?? '').trim()
    },
    setSelectedValue: (value: string) => {
      return this.setSelectedValue(value)
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
      this.setSelectedValue('')
      this.setInputValue('')
      item?.onSelect?.()
      this.onDismiss?.()
    },
  })

  private context = new ContextProvider(this, {
    context: comboBoxContext,
    initialValue: {
      inputValue: '',
      setInputValue: (inputValue: string) => {
        this.setInputValue(inputValue)
      },

      selectedValue: '',

      listManager: this.listManager,
    },
  })

  private getContext(): ComboBoxContext {
    return this.context.value
  }

  private setInputValue(inputValue: string) {
    const context = this.context.value
    if (context.inputValue === inputValue) {
      return
    }
    this.context.setValue({ ...context, inputValue })
  }

  private setSelectedValue(selectedValue: string) {
    const context = this.context.value
    if (context.selectedValue === selectedValue) {
      return
    }
    this.context.setValue({ ...context, selectedValue })
  }

  get items(): ComboBoxItem[] {
    const items = this.querySelectorAll('∏prosekit-combo-box-item')
    return Array.from(items).filter(isComboBoxItem)
  }
}

defineCustomElement('prosekit-combo-box', ComboBox)
