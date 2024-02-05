import { LitElement } from 'lit'

export class LightElement extends LitElement {
  /**
   * @hidden
   */
  constructor() {
    super()
  }

  /**
   * @hidden
   */
  createRenderRoot() {
    return this
  }

  /**
   * @hidden
   */
  setHidden(hidden: boolean) {
    if (this.hidden !== hidden) {
      this.hidden = hidden
      const display = this.style.display
      this.style.display = hidden ? 'none' : display === 'none' ? '' : display
    }
  }
}
