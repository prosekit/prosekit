import { once } from '@ocavue/utils'
import { customElements, HTMLElement } from 'server-dom-shim'

const TAG_NAME = 'pm-page-chunk'

export const registerPageMeasureElement: VoidFunction = /* @__PURE__ */ once(() => {
  if (typeof window === 'undefined' || customElements.get(TAG_NAME)) return
  customElements.define(TAG_NAME, PageChunkElement)
})

class PageChunkElement extends HTMLElement {
  static observedAttributes = [
    'data-group',
    'data-index',
    'data-break',
    'data-w',
    'data-h',
    'data-mt',
    'data-mr',
    'data-mb',
    'data-ml',

    // Only trigger updates; no need to store this attribute as a property
    'data-total',
  ]

  // Data attributes set by external code
  #group: string
  #index: number
  #forceNextBreak: boolean
  #pageWidth: number
  #pageHeight: number
  #pageMarginTop: number
  #pageMarginRight: number
  #pageMarginBottom: number
  #pageMarginLeft: number

  // Internal states
  #updateRequested: boolean
  #isDirty: boolean
  #isHead: boolean
  #isTail: boolean
  #paddingTop: number
  #paddingBottom: number
  #contentBoxHeight: number

  constructor() {
    super()
    this.#group = ''
    this.#index = -1
    this.#forceNextBreak = false
    this.#pageWidth = 0
    this.#pageHeight = 0
    this.#pageMarginTop = 0
    this.#pageMarginRight = 0
    this.#pageMarginBottom = 0
    this.#pageMarginLeft = 0

    this.#updateRequested = false
    this.#isDirty = true
    this.#isHead = false
    this.#isTail = false
    this.#paddingTop = 0
    this.#paddingBottom = 0
    this.#contentBoxHeight = 0
  }

  connectedCallback() {
    this.#parseDataAttributes()

    if (this.#index === 0) {
      this.#isHead = true
    }

    this.#render()

    // Get the initial content box height when the resize observer is not started yet. Notice that
    // `this.clientHeight` is an integer while the content box height can be a float, so this is not
    // accurate but should be good enough for the first render.
    this.#contentBoxHeight = this.clientHeight - this.#paddingTop - this.#paddingBottom

    observeElement(this)

    this.requestUpdate()
  }

  disconnectedCallback() {
    unobserveElement(this)
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return
    this.#parseDataAttributes()
    this.requestUpdate()
  }

  #parseDataAttributes() {
    this.#group = this.getAttribute('data-group') || ''
    this.#index = Number.parseInt(this.getAttribute('data-index') || '-1', 10)
    this.#forceNextBreak = this.hasAttribute('data-break')

    this.#pageWidth = this.#parseFloatAttribute('data-w')
    this.#pageHeight = this.#parseFloatAttribute('data-h')
    this.#pageMarginTop = this.#parseFloatAttribute('data-mt')
    this.#pageMarginRight = this.#parseFloatAttribute('data-mr')
    this.#pageMarginBottom = this.#parseFloatAttribute('data-mb')
    this.#pageMarginLeft = this.#parseFloatAttribute('data-ml')
  }

  #parseFloatAttribute(name: string): number {
    const value = this.getAttribute(name)
    return value != null ? Number.parseFloat(value) : 0
  }

  #render() {
    if (!this.#isDirty) {
      return
    }
    this.#isDirty = false

    const width = `${this.#pageWidth}px`
    const paddingTop = `${this.#paddingTop}px`
    const paddingBottom = `${this.#paddingBottom}px`
    const paddingLeft = `${this.#pageMarginLeft}px`
    const paddingRight = `${this.#pageMarginRight}px`

    if (this.style.width !== width) {
      this.style.width = width
    }
    if (this.style.paddingTop !== paddingTop) {
      this.style.paddingTop = paddingTop
    }
    if (this.style.paddingBottom !== paddingBottom) {
      this.style.paddingBottom = paddingBottom
    }
    if (this.style.paddingLeft !== paddingLeft) {
      this.style.paddingLeft = paddingLeft
    }
    if (this.style.paddingRight !== paddingRight) {
      this.style.paddingRight = paddingRight
    }

    this.toggleAttribute('data-page-head', this.#isHead)
    this.toggleAttribute('data-page-tail', this.#isTail)

    if (this.#isHead) {
      const pageHeight = `${this.#pageHeight}px`
      if (this.style.getPropertyValue('--page-h') !== pageHeight) {
        this.style.setProperty('--page-h', pageHeight)
      }
    } else {
      if (this.style.getPropertyValue('--page-h')) {
        this.style.removeProperty('--page-h')
      }
    }
  }

  updateContentBoxHeight(height: number) {
    // Avoid potential float number precision issues
    if (Math.abs(this.#contentBoxHeight - height) < 0.1) {
      return
    }
    this.#contentBoxHeight = height
    this.requestUpdate()
  }

  /**
   * Schedules a batched page layout recalculation.
   *
   * Any chunk can call this method, but the actual layout work (#updateAll)
   * always runs on the head chunk (index 0), because it needs to iterate
   * over every chunk in order to compute page breaks.
   *
   * Two nested microtasks are used to batch updates:
   *
   *   Microtask 1 – Delegation: non-head chunks forward the request to the
   *   head chunk, so multiple chunks changing in the same tick only trigger
   *   one layout pass.
   *
   *   Microtask 2 – Execution: the head chunk defers #updateAll to a second
   *   microtask so that any other attribute / resize changes that were
   *   queued in the same tick (and forwarded during microtask 1) are
   *   already reflected before the layout is recalculated.
   *
   * The #updateRequested flag acts as a deduplication guard so that
   * rapid successive calls (e.g. multiple attributes changing at once)
   * result in at most one scheduled pass per chunk.
   */
  requestUpdate() {
    if (this.#updateRequested) {
      return
    }

    this.#updateRequested = true
    queueMicrotask(() => {
      if (this.#index !== 0) {
        this.#updateRequested = false
        const head = findFirstChunk(this, this.#group)
        head?.requestUpdate()
        return
      }
      queueMicrotask(() => {
        this.#updateRequested = false
        this.#updateAll()
      })
    })
  }

  #setPaddingTop(paddingTop: number) {
    if (this.#paddingTop !== paddingTop) {
      this.#paddingTop = paddingTop
      this.#isDirty = true
    }
  }

  #setPaddingBottom(paddingBottom: number) {
    if (this.#paddingBottom !== paddingBottom) {
      this.#paddingBottom = paddingBottom
      this.#isDirty = true
    }
  }

  #setIsHead(isHead: boolean) {
    if (this.#isHead !== isHead) {
      this.#isHead = isHead
      this.#isDirty = true
    }
  }

  #setIsTail(isTail: boolean) {
    if (this.#isTail !== isTail) {
      this.#isTail = isTail
      this.#isDirty = true
    }
  }

  #updateAll() {
    if (!this.isConnected) {
      return
    }

    const elements = findAllChunks(this, this.#group)
    const count = elements.length
    if (count === 0) return

    const pageHeight = this.#pageHeight
    const pageMarginTop = this.#pageMarginTop
    const maxContentHeight = pageHeight - pageMarginTop - this.#pageMarginBottom

    let currentPageHeight = 0
    let forceNextBreak = false

    for (let i = 0; i < count; i++) {
      const element = elements[i]
      const h = element.#contentBoxHeight
      const isHead = i === 0 || currentPageHeight + h > maxContentHeight || forceNextBreak

      forceNextBreak = element.#forceNextBreak

      if (isHead && i > 0) {
        const prev = elements[i - 1]
        prev.#setPaddingBottom(Math.max(0, pageHeight - pageMarginTop - currentPageHeight))
        prev.#setIsTail(true)
        currentPageHeight = h
      } else {
        currentPageHeight += h
      }

      element.#setPaddingTop(isHead ? pageMarginTop : 0)
      element.#setPaddingBottom(0)
      element.#setIsTail(false)
      element.#setIsHead(isHead)
    }

    const last = elements[count - 1]
    last.#setPaddingBottom(Math.max(0, pageHeight - pageMarginTop - currentPageHeight))
    last.#setIsTail(true)

    for (const element of elements) {
      element.#render()
    }
  }
}

function handleResize(entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const contentBoxHeight = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height
    const element = entry.target as PageChunkElement
    element.updateContentBoxHeight(contentBoxHeight)
  }
}

const getResizeObserver = /* @__PURE__ */ once(() => {
  return new ResizeObserver(handleResize)
})

function observeElement(element: PageChunkElement) {
  getResizeObserver().observe(element)
}

function unobserveElement(element: PageChunkElement) {
  getResizeObserver().unobserve(element)
}

function findFirstChunk(element: HTMLElement, group: string): PageChunkElement | null | undefined {
  const root = element.closest('.ProseMirror')
  return root?.querySelector<PageChunkElement>(`${TAG_NAME}[data-group="${group}"][data-index="0"]`)
}

function findAllChunks(element: HTMLElement, group: string): PageChunkElement[] {
  const root = element.closest('.ProseMirror')
  const allElements = root?.querySelectorAll<PageChunkElement>(`${TAG_NAME}[data-group="${group}"]`)
  return Array.from(allElements || [])
}
