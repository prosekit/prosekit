import { once } from '@ocavue/utils'
import { customElements, HTMLElement } from 'server-dom-shim'

/**
 * @internal
 */
export const PAGE_CHUNK_TAG_NAME = 'pm-page-chunk'

/**
 * @internal
 */
export function registerPageChunkElement(): void {
  if (typeof window === 'undefined' || customElements.get(PAGE_CHUNK_TAG_NAME)) return
  customElements.define(PAGE_CHUNK_TAG_NAME, PageChunkElement)
}

class PageChunkElement extends HTMLElement {
  static observedAttributes = [
    'data-group',
    'data-break',
    'data-h',
    'data-mt',
    'data-mb',

    // Only the first chunk of the whole document has this attribute.
    'data-size',
  ]

  // Data attributes set by external code
  #group: string = ''
  #forceNextBreak: boolean = false
  #pageHeight: number = 0
  #pageMarginTop: number = 0
  #pageMarginBottom: number = 0
  #size: number | undefined = undefined

  // Internal states
  #updateRequested: boolean = false
  #contentBoxHeight: number = 0

  // Rendering states
  #isHead: boolean = false
  #isTail: boolean = false
  #paddingTop: number = 0
  #paddingBottom: number = 0

  // Pending rendering states
  #isHeadPending: boolean = false
  #isTailPending: boolean = false
  #paddingTopPending: number = 0
  #paddingBottomPending: number = 0

  connectedCallback() {
    this.#parseDataAttributes()

    if (this.#isLeader()) {
      this.#isHeadPending = true
    }

    this.#render()

    // Get the initial content box height when the resize observer is not started yet. Notice that
    // `this.clientHeight` is an integer while the content box height can be a float, so this is not
    // accurate but should be good enough for the first render.
    this.#contentBoxHeight = this.clientHeight - this.#paddingTop - this.#paddingBottom

    observeElement(this)

    this.#requestUpdate()
  }

  disconnectedCallback() {
    unobserveElement(this)
  }

  attributeChangedCallback(_: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return
    this.#parseDataAttributes()
    this.#requestUpdate()
  }

  #parseDataAttributes() {
    this.#group = this.getAttribute('data-group') || ''
    this.#forceNextBreak = this.hasAttribute('data-break')
    this.#pageHeight = this.#parseFloatAttribute('data-h')
    this.#pageMarginTop = this.#parseFloatAttribute('data-mt')
    this.#pageMarginBottom = this.#parseFloatAttribute('data-mb')

    const sizeAttr = this.getAttribute('data-size')
    this.#size = sizeAttr ? Number.parseInt(sizeAttr, 10) : undefined
  }

  #parseFloatAttribute(name: string): number {
    const value = this.getAttribute(name)
    return value != null ? Number.parseFloat(value) : 0
  }

  #isLeader() {
    return this.#size != null
  }

  #render() {
    if (this.#paddingTop !== this.#paddingTopPending || this.#paddingBottom !== this.#paddingBottomPending) {
      Object.assign(this.style, {
        paddingTop: `${this.#paddingTop = this.#paddingTopPending}px`,
        paddingBottom: `${this.#paddingBottom = this.#paddingBottomPending}px`,
      })
    }
    if (this.#isHead !== this.#isHeadPending) {
      this.toggleAttribute('data-page-head', this.#isHead = this.#isHeadPending)
    }
    if (this.#isTail !== this.#isTailPending) {
      this.toggleAttribute('data-page-tail', this.#isTail = this.#isTailPending)
    }
  }

  setHeight(height: number) {
    // Avoid potential float number precision issues
    if (Math.abs(this.#contentBoxHeight - height) < 0.1) {
      return
    }
    this.#contentBoxHeight = height
    this.#requestUpdate()
  }

  /**
   * Schedules a batched page layout recalculation.
   *
   * Any chunk can call this method, but the actual layout work (#updateAll)
   * always runs on the leader chunk, because it needs to iterate over every
   * chunk in order to compute page breaks.
   *
   * Two nested microtasks are used to batch updates:
   *
   *   Microtask 1 – Delegation: non-leader chunks forward the request to the
   *   leader chunk, so multiple chunks changing in the same tick only trigger
   *   one layout pass.
   *
   *   Microtask 2 – Execution: the leader chunk defers #updateAll to a second
   *   microtask so that any other attribute / resize changes that were queued
   *   in the same tick (and forwarded during microtask 1) are already reflected
   *   before the layout is recalculated.
   *
   * The #updateRequested flag acts as a deduplication guard so that rapid
   * successive calls (e.g. multiple attributes changing at once) result in at
   * most one scheduled pass per chunk.
   */
  #requestUpdate() {
    if (this.#updateRequested) {
      return
    }

    this.#updateRequested = true
    queueMicrotask(() => {
      if (!this.#isLeader()) {
        this.#updateRequested = false
        const leader = findLeaderChunk(this, this.#group)
        if (!leader) return
        leader.#requestUpdate()
        return
      }
      queueMicrotask(() => {
        this.#updateRequested = false
        this.#updateAll()
      })
    })
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

    let currentContentHeight = 0
    let forceNextBreak = false

    for (let i = 0; i < count; i++) {
      const element = elements[i]
      const h = element.#contentBoxHeight
      const isHead = forceNextBreak || i === 0 || (currentContentHeight + h > maxContentHeight)

      forceNextBreak = element.#forceNextBreak

      if (isHead && i > 0) {
        const prev = elements[i - 1]
        prev.#paddingBottomPending = Math.max(0, pageHeight - pageMarginTop - currentContentHeight)
        prev.#isTailPending = true
        currentContentHeight = h
      } else {
        currentContentHeight += h
      }

      element.#paddingTopPending = isHead ? pageMarginTop : 0
      element.#paddingBottomPending = 0
      element.#isTailPending = false
      element.#isHeadPending = isHead
    }

    const last = elements[count - 1]
    last.#paddingBottomPending = Math.max(0, pageHeight - pageMarginTop - currentContentHeight)
    last.#isTailPending = true

    for (const element of elements) {
      element.#render()
    }
  }
}

function handleResize(entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const contentBoxHeight = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height
    const element = entry.target as PageChunkElement
    element.setHeight(contentBoxHeight)
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

function findLeaderChunk(element: HTMLElement, group: string): PageChunkElement | null | undefined {
  const root = element.closest('.ProseMirror')
  return root?.querySelector<PageChunkElement>(`${PAGE_CHUNK_TAG_NAME}[data-group="${group}"][data-size]`)
}

function findAllChunks(element: HTMLElement, group: string): PageChunkElement[] {
  const root = element.closest('.ProseMirror')
  const elements = root?.querySelectorAll<PageChunkElement>(`${PAGE_CHUNK_TAG_NAME}[data-group="${group}"]`)
  return Array.from(elements || [])
}
