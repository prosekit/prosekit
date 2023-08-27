import { consume } from '@lit-labs/context'
import type { Editor } from '@prosekit/core'
import { LitElement, type CSSResultGroup, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { html } from 'lit-html'

import { blockComponentStyles } from '../../styles/block-component.styles'
import { BlockElement } from '../block-element'
import { comboBoxContext, type ComboBoxContext } from '../combo-box/context'

@customElement('prosekit-combo-box-input')
export class ComboBoxInput extends BlockElement {
  // style = 'display: contents!important; margin: 0 !important;';

  // /** @hidden */
  // static styles: CSSResultGroup = css`
  //   ${blockComponentStyles}

  //   :host {
  //     display: contents!important;
  //     margin: 0 !important;
  //   }
  // `

  @property({ attribute: false })
  editor?: Editor

  @property({ attribute: true })
  placeholder = ''

  @consume({ context: comboBoxContext, subscribe: true })
  @state()
  comboBoxContext: ComboBoxContext | null = null

  private handleFocus() {
    this.comboBoxContext?.setInputFocus(true)
  }

  private handleBlur() {
    this.comboBoxContext?.setInputFocus(false)
  }

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

  /** @hidden */
  render() {
    return html`
      <input 
        placeholder=${this.placeholder} 
        @focus=${() => this.handleFocus()} 
        @blur=${() => this.handleBlur()} 
        @keydown=${(event: KeyboardEvent) => this.handleKeydown(event)}
        @input=${(event: InputEvent) => this.handleInput(event)}
        value=${this.comboBoxContext?.inputValue ?? ''}
      ></input>
    `
  }
}
