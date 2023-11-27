import { ContextConsumer } from '@lit/context'

import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'
import { comboBoxContext } from '../combo-box/context'

export const propNames = []

export type ComboBoxListProps = { lang?: string }

export class ComboBoxList extends LightElement {
  private comboBoxContext = new ContextConsumer(this, {
    context: comboBoxContext,
    subscribe: true,
  })

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('mousemove', (event) => {
      this.comboBoxContext.value?.listManager.handleMouseMove(event)
    })
    this.addEventListener('mouseover', (event) => {
      this.comboBoxContext.value?.listManager.handleMouseOver(event)
    })
    this.addEventListener('mousedown', (event) => {
      this.comboBoxContext.value?.listManager.handleMouseDown(event)
    })
    this.addEventListener('click', (event) => {
      this.comboBoxContext.value?.listManager.handleClick(event)
    })
  }
}

defineCustomElement('prosekit-combo-box-list', ComboBoxList)
