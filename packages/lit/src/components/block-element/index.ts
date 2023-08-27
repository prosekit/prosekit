import { LitElement, type CSSResultGroup } from 'lit'

import { blockComponentStyles } from '../../styles/block-component.styles'

export class BlockElement extends LitElement {
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  createRenderRoot() {
    return this
  }

  setHidden(hidden: boolean) {
    if (this.hidden !== hidden) {
      this.hidden = hidden
      const display = this.style.display
      this.style.display = hidden ? 'none' : display === 'none' ? '' : display
    }
  }
}
