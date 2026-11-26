import type { PluginView } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

/**
 * @internal
 */
export const PAGE_CHUNK_TAG_NAME = 'pm-page-chunk'

/**
 * @internal
 */
export const PAGE_CHUNK_ID_ATTRIBUTE = 'data-chunk-id'

/**
 * The key of the `ResizeObserver` stored on the editor root element and on
 * each page chunk element. `Symbol.for` lets every copy of this module share
 * the same key.
 */
const OBSERVER_KEY: unique symbol = Symbol.for('prosekit-page-chunk-observer')

interface ObserverHost extends Element {
  [OBSERVER_KEY]?: ResizeObserver
}

/**
 * Finds the `ResizeObserver` of the nearest editor that contains the element.
 */
function findObserver(element: Element): ResizeObserver | undefined {
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const observer = (parent as ObserverHost)[OBSERVER_KEY]
    if (observer) return observer
  }
}

/**
 * Defines the `<pm-page-chunk>` custom element. The element only tells the
 * editor's `ResizeObserver` when it is connected, disconnected or assigned to
 * another chunk. It never changes its own attributes or children, so
 * ProseMirror sees it as an inert decoration wrapper.
 */
function definePageChunkElement(): void {
  if (customElements.get(PAGE_CHUNK_TAG_NAME)) return

  class PageChunkElement extends HTMLElement implements ObserverHost {
    [OBSERVER_KEY]?: ResizeObserver

    static observedAttributes = [PAGE_CHUNK_ID_ATTRIBUTE]

    connectedCallback() {
      const observer = findObserver(this)
      this[OBSERVER_KEY] = observer
      observer?.observe(this)
    }

    disconnectedCallback() {
      this[OBSERVER_KEY]?.unobserve(this)
      this[OBSERVER_KEY] = undefined
    }

    attributeChangedCallback() {
      // Observe again so that the `ResizeObserver` reports the size for the
      // new chunk ID, even when the size is unchanged.
      const observer = this[OBSERVER_KEY]
      if (!observer) return
      observer.unobserve(this)
      observer.observe(this)
    }
  }

  customElements.define(PAGE_CHUNK_TAG_NAME, PageChunkElement)
}

/**
 * Measures the page chunk elements. It calls `onResize` with the content box
 * heights of the resized chunks, keyed by chunk ID. `onResize` runs in the
 * `ResizeObserver` callback, which runs after the layout and before the paint.
 *
 * @internal
 */
export class PageMeasureView implements PluginView {
  #view: EditorView
  #observer: ResizeObserver
  #onResize: (heights: Map<number, number>) => void

  constructor(view: EditorView, onResize: (heights: Map<number, number>) => void) {
    this.#view = view
    this.#onResize = onResize
    this.#observer = new ResizeObserver(this.#handleResize)

    const root = view.dom as ObserverHost
    root[OBSERVER_KEY] = this.#observer

    definePageChunkElement()

    // Chunks that were connected before this plugin view was created.
    for (const chunk of Array.from<ObserverHost>(root.getElementsByTagName(PAGE_CHUNK_TAG_NAME))) {
      chunk[OBSERVER_KEY] = this.#observer
      this.#observer.observe(chunk)
    }
  }

  destroy(): void {
    this.#observer.disconnect()
    const root = this.#view.dom as ObserverHost
    if (root[OBSERVER_KEY] === this.#observer) {
      root[OBSERVER_KEY] = undefined
    }
  }

  #handleResize = (entries: ResizeObserverEntry[]): void => {
    const heights = new Map<number, number>()
    for (const entry of entries) {
      const id = Number(entry.target.getAttribute(PAGE_CHUNK_ID_ATTRIBUTE))
      const height = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height
      heights.set(id, height)
    }
    this.#onResize(heights)
  }
}
