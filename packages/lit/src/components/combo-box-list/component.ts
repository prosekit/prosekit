import { consume } from '@lit-labs/context'
import { customElement, state } from 'lit/decorators.js'

import { BlockElement } from '../block-element'
import { comboBoxContext, type ComboBoxContext } from '../combo-box/context'

@customElement('prosekit-combo-box-list')
export class ComboBoxList extends BlockElement {
  @consume({ context: comboBoxContext, subscribe: true })
  @state()
  comboBoxContext: ComboBoxContext | null = null

  protected updated(): void {
    const hidden = !this.comboBoxContext?.inputFocus
    this.setHidden(hidden)
  }

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('mousemove', (event) => {
      this.comboBoxContext?.listManager.handleMouseMove(event)
    })
    this.addEventListener('mouseover', (event) => {
      this.comboBoxContext?.listManager.handleMouseOver(event)
    })
    this.addEventListener('mousedown', (event) => {
      this.comboBoxContext?.listManager.handleMouseDown(event)
    })
    this.addEventListener('click', (event) => {
      this.comboBoxContext?.listManager.handleClick(event)
    })
  }
}
