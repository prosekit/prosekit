import { ContextConsumer } from '@lit/context'
import { html } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'
import { comboBoxContext } from '../combo-box/context'

export const propNames = ['placeholder'] as const

export interface ComboBoxInputProps {
  placeholder?: string
}

export class ComboBoxInput extends LightElement {
  static properties = {
    placeholder: { attribute: true },
  };

  placeholder = ''

  private comboBoxContext = new ContextConsumer(this, {
    context: comboBoxContext,
    subscribe: true,
  })

  private visible = false

  private handleKeydown(event: KeyboardEvent) {
    if (event.code === 'ArrowUp') {
      this.comboBoxContext.value?.listManager?.handleArrowUp()
    } else if (event.code === 'ArrowDown') {
      this.comboBoxContext.value?.listManager?.handleArrowDown()
    } else if (event.code === 'Escape') {
      this.comboBoxContext.value?.listManager?.handleEscape()
    } else if (event.code === 'Enter') {
      this.comboBoxContext.value?.listManager?.handleEnter()
    }
  }

  private handleInput(event: InputEvent) {
    const value: string = (event?.target as HTMLInputElement)?.value ?? ''
    this.comboBoxContext.value?.setInputValue(value)
  }

  protected firstUpdated(): void {
    const resizeObserver = new ResizeObserver((entries) => {
      const visible = entries.some(
        (entry) => entry.contentRect.width > 0 && entry.contentRect.width > 0,
      )
      if (this.visible !== visible && visible) {
        setTimeout(() => this.querySelector('input')?.focus(), 0)
      }
      this.visible = visible
    })

    resizeObserver.observe(this)
  }

  /** @hidden */
  render() {
    return html`
      <input 
        placeholder=${this.placeholder} 
        @keydown=${(event: KeyboardEvent) => this.handleKeydown(event)}
        @input=${(event: InputEvent) => this.handleInput(event)}
        value=${this.comboBoxContext.value?.inputValue ?? ''}
      ></input>
    `
  }
}

defineCustomElement('prosekit-combo-box-input', ComboBoxInput)
