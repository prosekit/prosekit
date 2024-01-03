import { ContextConsumer } from '@lit/context'
import { html, type PropertyDeclarations } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'
import { comboBoxContext } from '../combo-box/context'

/**
 * @internal
 */
export const propNames = ['placeholder'] as const

/**
 * @internal
 */
export interface ComboBoxInputProps {
  placeholder?: string
}

/**
 * @internal
 */
export class ComboBoxInput extends LightElement {
  /**
   * @hidden
   */
  static properties = {
    placeholder: { attribute: true },
  } satisfies PropertyDeclarations

  placeholder = ''

  private comboBoxContext = new ContextConsumer(this, {
    context: comboBoxContext,
    subscribe: true,
  })

  private visible = false

  private handleKeydown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
        this.comboBoxContext.value?.listManager?.handleArrowUp()
        event.preventDefault()
        return
      case 'ArrowDown':
        this.comboBoxContext.value?.listManager?.handleArrowDown()
        event.preventDefault()
        return
      case 'Escape':
        this.comboBoxContext.value?.listManager?.handleEscape()
        event.preventDefault()
        return
      case 'Enter':
        this.comboBoxContext.value?.listManager?.handleEnter()
        event.preventDefault()
        return
    }
  }

  private handleInput(event: InputEvent) {
    const value: string = (event?.target as HTMLInputElement)?.value ?? ''
    this.comboBoxContext.value?.setInputValue(value)
  }

  /**
   * @hidden
   */
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

  /**
   * @hidden
   */
  render() {
    return html`
      <input 
        placeholder=${this.placeholder} 
        @keydown=${(event: KeyboardEvent) => this.handleKeydown(event)}
        @input=${(event: InputEvent) => this.handleInput(event)}
        .value=${this.comboBoxContext.value?.inputValue ?? ''}
      ></input>
    `
  }
}

defineCustomElement('prosekit-combo-box-input', ComboBoxInput)
