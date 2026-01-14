import { loaders } from './loaders.gen'

class VanillaRendererElement extends HTMLElement {
  static observedAttributes = ['data-story']

  private component: { render: () => HTMLElement; destroy: () => void } | undefined

  constructor() {
    super()
    this.component = undefined
  }

  connectedCallback() {
    this.load()
  }

  disconnectedCallback() {
    this.component?.destroy()
    this.component = undefined
  }

  attributeChangedCallback() {
    this.load()
  }

  private load() {
    const story = this.getAttribute('data-story')
    if (!story) return

    const loader = loaders[story as keyof typeof loaders]
    if (!loader) {
      throw new Error(`Loader for story ${story} not found`)
    }

    loader().then((component) => {
      if (this.component === component) {
        return
      }

      this.component?.destroy()
      this.component = undefined
      this.component = component
      this.render()
      this.setAttribute('data-loaded', 'true')
    }).catch((error) => {
      throw new Error(`[VanillaRendererElement] Error loading story ${story}: ${error}`, { cause: error })
    })
  }

  private render() {
    const component = this.component
    if (!component) return

    this.replaceChildren(component.render())
  }
}

export function registerVanillaRenderer() {
  if (customElements.get('vanilla-renderer')) return
  customElements.define('vanilla-renderer', VanillaRendererElement)
}
