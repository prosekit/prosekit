import { LitElement, type CSSResultGroup } from 'lit'

import { blockComponentStyles } from '../../styles/block-component.styles'

class BlockElement extends LitElement {
  setHidden(hidden: boolean) {
    if (this.hidden !== hidden) {
      this.hidden = hidden
      const display = this.style.display
      this.style.display = hidden ? 'none' : display === 'none' ? '' : display
    }
  }
}

export class LightBlockElement extends BlockElement {
  createRenderRoot() {
    return this
  }
}

export class ShadowBlockElement extends BlockElement {
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  setHidden(hidden: boolean) {
    if (this.hidden !== hidden) {
      this.hidden = hidden
      const display = this.style.display
      this.style.display = hidden ? 'none' : display === 'none' ? '' : display
    }
  }
}
