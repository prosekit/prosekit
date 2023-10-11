import { consume } from '@lit/context'
import { customElement, state } from 'lit/decorators.js'

import { LightBlockElement } from '../block-element'
import { comboBoxContext, type ComboBoxContext } from '../combo-box/context'

export const propNames = []

export type ComboBoxListProps = Record<string, never>

@customElement('prosekit-combo-box-list')
export class ComboBoxList extends LightBlockElement {
  @consume({ context: comboBoxContext, subscribe: true })
  @state()
  comboBoxContext: ComboBoxContext | null = null

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
