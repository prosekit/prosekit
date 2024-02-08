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

/**
 * @internal
 */
export const propNames = ['onDismiss'] as const

/**
 * @internal
 */
export interface ComboBoxProps extends PopoverProps {
  onDismiss?: VoidFunction
}

/**
 * @internal
 */
export class ComboBox extends Popover {
  /**
   * @hidden
   */
  static properties = {
    ...Popover.properties,
    onDismiss: { attribute: false },
  } satisfies PropertyDeclarations

  onDismiss?: VoidFunction

  private listManager = new ListManager<ComboBoxItem>({
    getItems: () => {
      return this.items
    },
    getSelectedValue: () => {
      return (this.getContext().selectedValue ?? '').trim()
    },
    setSelectedValue: (value, reason) => {
      return this.setSelectedValue(value, reason)
    },
    getItemValue: (item) => {
      return (item.textContent ?? '').trim()
    },
    queryClosestItem: queryClosestComboBoxItem,
    getActive: () => {
      return true
    },
    onDismiss: () => {
      this.hide()
    },
    onSelect: (item) => {
      if (item?.onSelect) {
        this.setSelectedValue('', 'keyboard')
        item?.onSelect?.()
        this.hide()
        return true
      }
      return false
    },
  })

  /**
   * @hidden
   */
  hide() {
    super.hide()
    this.setInputValue('')
    this.onDismiss?.()
  }

  private context = new ContextProvider(this, {
    context: comboBoxContext,
    initialValue: {
      inputValue: '',
      setInputValue: (inputValue: string) => {
        this.setInputValue(inputValue)
      },

      selectedValue: '',
      selectedReason: 'keyboard',

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

  private setSelectedValue(
    selectedValue: string,
    selectedReason: 'mouse' | 'keyboard',
  ) {
    const context = this.context.value
    if (context.selectedValue === selectedValue) {
      return
    }
    this.context.setValue({ ...context, selectedValue, selectedReason })
  }

  get items(): ComboBoxItem[] {
    const items = this.querySelectorAll('prosekit-combo-box-item')
    return Array.from(items).filter(isComboBoxItem)
  }
}

defineCustomElement('prosekit-combo-box', ComboBox)
