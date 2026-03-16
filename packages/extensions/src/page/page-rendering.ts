import { getId } from '@ocavue/utils'
import { definePlugin, type Extension } from '@prosekit/core'
import type { EditorState } from '@prosekit/pm/state'
import { Plugin, PluginKey } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

/**
 * @internal
 */
export type PageRenderingExtension = Extension

interface PageRenderingOptions {
  /**
   * The width of the page in px.
   *
   * @default 1754 (Lanscape A4 size in 150 DPI)
   */
  pageWidth?: number

  /**
   * The height of the page in px.
   *
   * @default 1240 (Lanscape A4 size in 150 DPI)
   */
  pageHeight?: number

  /**
   * The top margin of the page in px.
   *
   * @default 100
   */
  marginTop?: number

  /**
   * The right margin of the page in px.
   *
   * @default 100
   */
  marginRight?: number

  /**
   * The bottom margin of the page in px.
   *
   * @default 100
   */
  marginBottom?: number

  /**
   * The left margin of the page in px.
   *
   * @default 100
   */
  marginLeft?: number
}

/**
 * @public
 */
export function definePageRendering(options: PageRenderingOptions = {}): PageRenderingExtension {
  return definePlugin(
    createPlugin(options),
  )
}

function definePageMeasureElement() {
  if (typeof window === 'undefined') return
  if (typeof customElements === 'undefined') return
  if (customElements.get('prosemirror-page-measure')) return

  class ProseMirrorPageMeasure extends HTMLElement {
    static observedAttributes = [
      'data-group',
      'data-index',
      'data-page-width',
      'data-page-height',
      'data-margin-top',
      'data-margin-right',
      'data-margin-bottom',
      'data-margin-left',
    ]

    #group: string
    #index: number
    #pageWidth: number
    #pageHeight: number
    #marginTop: number
    #marginRight: number
    #marginBottom: number
    #marginLeft: number

    constructor() {
      super()
      this.#group = ''
      this.#index = -1
      this.#pageWidth = 0
      this.#pageHeight = 0
      this.#marginTop = 0
      this.#marginRight = 0
      this.#marginBottom = 0
      this.#marginLeft = 0
    }

    connectedCallback() {
      this.style.display = 'block'
      this.style.boxSizing = 'border-box'
      this.style.margin = '0'
      this.style.padding = '0'
      this.updateSelf()
    }

    attributeChangedCallback() {
      this.updateSelf()
    }

    updateSelf() {
      this.#group = this.getAttribute('data-group') || ''
      this.#index = Number.parseInt(this.getAttribute('data-index') || '-1', 10)
      this.#pageWidth = Number.parseInt(this.getAttribute('data-page-width') || '0', 10)
      this.#pageHeight = Number.parseInt(this.getAttribute('data-page-height') || '0', 10)
      this.#marginTop = Number.parseInt(this.getAttribute('data-margin-top') || '0', 10)
      this.#marginRight = Number.parseInt(this.getAttribute('data-margin-right') || '0', 10)
      this.#marginBottom = Number.parseInt(this.getAttribute('data-margin-bottom') || '0', 10)
      this.#marginLeft = Number.parseInt(this.getAttribute('data-margin-left') || '0', 10)

      this.style.marginLeft = `${this.#marginLeft}px`
      this.style.marginRight = `${this.#marginRight}px`
      this.style.width = `${this.#pageWidth - this.#marginLeft - this.#marginRight}px`
    }

    private findAllElements() {
      const root = this.closest('.ProseMirror')
      if (!root) {
        return []
      }
      const allElements = root.querySelectorAll(`prosemirror-page-measure[data-group="${this.#group}"]`)
      return Array.from(allElements) as ProseMirrorPageMeasure[]
    }

    public updateAll() {
      if (this.#index !== 0) {
        console.warn('Only the first page measure element will trigger the page rendering update.')
        return
      }

      const allElements = this.findAllElements()
      const maxPageHeight = this.#pageHeight - this.#marginTop - this.#marginBottom
      let pageHeight = 0
      let prevElement: ProseMirrorPageMeasure | null = null
      let isFirst = true
      for (const element of allElements) {
        element.updateSelf()
        let isPageFirst = false

        if (isFirst) {
          element.style.marginTop = `${this.#marginTop}px`
          isFirst = false
          isPageFirst = true
        } else {
          element.style.marginTop = `0px`
        }

        const nodeHeight = element.offsetHeight

        if (nodeHeight > maxPageHeight) {
          if (prevElement) {
            console.warn('A page is too long to fit the page height, please adjust the page height or margin settings.')
          } else {
            console.warn('The first page is too long to fit the page height, please adjust the page height or margin settings.')
          }
        }

        if (pageHeight + nodeHeight >= maxPageHeight) {
          if (prevElement) {
            prevElement.style.marginBottom = `${this.#pageHeight - this.#marginBottom - pageHeight}px`
            prevElement.style.breakAfter = 'page'
          }
          element.style.marginTop = `${this.#marginTop}px`
          isFirst = false
          isPageFirst = true
          pageHeight = nodeHeight
        } else {
          pageHeight += nodeHeight
        }

        if (isPageFirst) {
          element.setAttribute('data-page-first', '')
          element.style.setProperty('--page-width', `${this.#pageWidth}px`)
          element.style.setProperty('--page-height', `${this.#pageHeight}px`)
          element.style.setProperty('--page-margin-top', `${this.#marginTop}px`)
          element.style.setProperty('--page-margin-left', `${this.#marginLeft}px`)
        } else {
          element.removeAttribute('data-page-first')
          element.style.removeProperty('--page-width')
          element.style.removeProperty('--page-height')
          element.style.removeProperty('--page-margin-top')
          element.style.removeProperty('--page-margin-left')
        }

        element.style.marginBottom = '0px'
        element.style.breakAfter = 'auto'
        prevElement = element
      }
      if (prevElement) {
        const nodeHeight = prevElement.offsetHeight
        if (nodeHeight < maxPageHeight) {
          prevElement.style.marginBottom = `${this.#pageHeight - this.#marginBottom - pageHeight}px`
        }
      }
    }
  }

  customElements.define('prosemirror-page-measure', ProseMirrorPageMeasure)

  const style = document.createElement('style')
  style.textContent = `
    prosemirror-page-measure[data-page-first] {
      position: relative;
    }
    prosemirror-page-measure[data-page-first]::before {
      content: '';
      position: absolute;
      top: calc(-1 * var(--page-margin-top));
      left: calc(-1 * var(--page-margin-left));
      width: var(--page-width);
      height: var(--page-height);
      border: 1px solid #d0d0d0;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      pointer-events: none;
      z-index: -1;
      box-sizing: border-box;
    }
  `
  document.head.appendChild(style)

  return ProseMirrorPageMeasure
}

function createPlugin(options: PageRenderingOptions) {
  const {
    pageWidth = 1754,
    pageHeight = 1240,
    marginTop = 100,
    marginRight = 100,
    marginBottom = 100,
    marginLeft = 100,
  } = options

  interface PluginState {
    group: string
  }

  const key = new PluginKey<PluginState>('prosekit-page-render')

  function createDecoration(state: EditorState) {
    const pluginState = key.getState(state)
    if (!pluginState) return null

    const { group } = pluginState

    const decorations: Decoration[] = []

    state.doc.forEach((node, pos, index) => {
      decorations.push(Decoration.node(pos, pos + node.nodeSize, {
        'nodeName': 'prosemirror-page-measure',
        'data-group': group,
        'data-index': String(index),
        'data-page-width': String(pageWidth),
        'data-page-height': String(pageHeight),
        'data-margin-top': String(marginTop),
        'data-margin-right': String(marginRight),
        'data-margin-bottom': String(marginBottom),
        'data-margin-left': String(marginLeft),
      }))
    })

    return DecorationSet.create(state.doc, decorations)
  }

  function refresh(view: EditorView) {
    const pluginState = key.getState(view.state)
    if (!pluginState) return
    const { group } = pluginState

    const maybeElement = view.dom.querySelector(`prosemirror-page-measure[data-group="${group}"][data-index="0"]`)
    if (!maybeElement) return

    type ProseMirrorPageMeasure = InstanceType<Exclude<ReturnType<typeof definePageMeasureElement>, undefined>>
    const firstElement = maybeElement as ProseMirrorPageMeasure
    firstElement.updateAll()
  }

  function delayRefresh(view: EditorView) {
    setTimeout(() => {
      refresh(view)
    }, 0)
  }

  const plugin = new Plugin<PluginState>({
    key,
    state: {
      init: () => {
        return {
          group: `prosemirror-page-${getId()}`,
        }
      },
      apply: (tr, value) => {
        return value
      },
    },
    view: (view) => {
      delayRefresh(view)
      return {
        update: (view) => {
          delayRefresh(view)
        },
      }
    },
    props: {
      decorations: (state) => {
        definePageMeasureElement()
        return createDecoration(state)
      },
    },
  })

  return plugin
}
