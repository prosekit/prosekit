import { LitElement } from 'lit'

export class LightElement extends LitElement {
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
