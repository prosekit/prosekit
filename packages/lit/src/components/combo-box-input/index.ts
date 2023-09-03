import { consume } from '@lit-labs/context'
import { customElement, property, state } from 'lit/decorators.js'
import { html } from 'lit-html'

import { LightBlockElement } from '../block-element'
import { comboBoxContext, type ComboBoxContext } from '../combo-box/context'

export const propNames = ['placeholder'] as const

export type ComboBoxInputProps = {
  placeholder?: string
}

@customElement('prosekit-combo-box-input')
export class ComboBoxInput extends LightBlockElement {
  @property({ attribute: true })
  placeholder = ''

  @consume({ context: comboBoxContext, subscribe: true })
  @state()
  comboBoxContext: ComboBoxContext | null = null

  private visible = false

  private handleKeydown(event: KeyboardEvent) {
    if (event.code === 'ArrowUp') {
      this.comboBoxContext?.listManager?.handleArrowUp()
    } else if (event.code === 'ArrowDown') {
      this.comboBoxContext?.listManager?.handleArrowDown()
    } else if (event.code === 'Escape') {
      this.comboBoxContext?.listManager?.handleEscape()
    } else if (event.code === 'Enter') {
      this.comboBoxContext?.listManager?.handleEnter()
    }
  }

  private handleInput(event: InputEvent) {
    const value: string = (event?.target as HTMLInputElement)?.value ?? ''
    this.comboBoxContext?.setInputValue(value)
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
        value=${this.comboBoxContext?.inputValue ?? ''}
      ></input>
    `
  }
}
