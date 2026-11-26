import { isDeepEqual } from '@ocavue/utils'
import { definePlugin, type Extension } from '@prosekit/core'
import type { Node } from '@prosekit/pm/model'
import { Plugin, PluginKey, type PluginView } from '@prosekit/pm/state'
import type { Mapping } from '@prosekit/pm/transform'
import { Decoration, DecorationSet, type EditorView } from '@prosekit/pm/view'

import { computePageLayout, type ChunkLayout } from './page-layout.ts'

const PAGE_CHUNK_TAG_NAME = 'pm-page-chunk'

export interface PageRenderingOptions {
  /**
   * The width of the page in px.
   *
   * @default 794 (Portrait A4 paper size in 96 DPI)
   */
  pageWidth?: number

  /**
   * The height of the page in px.
   *
   * @default 1123 (Portrait A4 paper size in 96 DPI)
   */
  pageHeight?: number

  /**
   * The top margin of the page in px.
   *
   * @default 70
   */
  marginTop?: number

  /**
   * The right margin of the page in px.
   *
   * @default 70
   */
  marginRight?: number

  /**
   * The bottom margin of the page in px.
   *
   * @default 70
   */
  marginBottom?: number

  /**
   * The left margin of the page in px.
   *
   * @default 70
   */
  marginLeft?: number
}

export function definePageRendering(options: PageRenderingOptions = {}): PageRenderingExtension {
  return definePlugin(createPageRenderingPlugin(options))
}

/**
 * @internal
 */
export type PageRenderingExtension = Extension

function createPageRenderingPlugin(options: PageRenderingOptions): Plugin {
  const {
    pageWidth = 794,
    pageHeight = 1123,
    marginTop = 70,
    marginRight = 70,
    marginBottom = 70,
    marginLeft = 70,
  } = options

  const key = new PluginKey<PageRenderingState>('prosekit-page-render')

  /**
   * Creates the plugin state. It reuses the decorations of `prev` when the
   * layouts are unchanged. Pass `mapping` when the document has changed since
   * `prev`.
   */
  function createState(
    doc: Node,
    heights: number[],
    prev: PageRenderingState | undefined,
    mapping: Mapping | undefined,
  ): PageRenderingState {
    const breaks: boolean[] = []
    doc.forEach((node) => {
      breaks.push(!!node.type.spec.pageBreak)
    })

    const layouts = computePageLayout(heights, breaks, pageHeight, marginTop, marginBottom)

    if (prev && isDeepEqual(prev.layouts, layouts)) {
      if (!mapping) {
        return { heights, layouts: prev.layouts, decorations: prev.decorations }
      }
      let removed = false
      const decorations = prev.decorations.map(mapping, doc, {
        onRemove: () => {
          removed = true
        },
      })
      if (!removed) {
        return { heights, layouts: prev.layouts, decorations }
      }
    }

    const decorations: Decoration[] = []
    doc.forEach((node, pos, index) => {
      const layout = layouts[index]
      decorations.push(
        Decoration.node(pos, pos + node.nodeSize, {
          'nodeName': PAGE_CHUNK_TAG_NAME,
          'data-page-head': layout.head ? '' : undefined,
          'data-page-tail': layout.tail ? '' : undefined,
          'style': `padding-top:${layout.paddingTop}px;padding-bottom:${layout.paddingBottom}px;`,
        }),
      )
    })

    return { heights, layouts, decorations: DecorationSet.create(doc, decorations) }
  }

  return new Plugin<PageRenderingState>({
    key,
    view: (view) => new PageMeasureView(view, key),
    state: {
      init: (_config, state): PageRenderingState => {
        return createState(state.doc, [], undefined, undefined)
      },
      apply: (tr, value, oldState, newState): PageRenderingState => {
        const measured = tr.getMeta(key) as number[] | undefined

        if (!tr.docChanged) {
          if (!measured || measured.length !== newState.doc.childCount) return value
          return createState(newState.doc, measured, value, undefined)
        }

        const heights = mapHeights(value.heights, oldState.doc, newState.doc)
        return createState(newState.doc, heights, value, tr.mapping)
      },
    },
    props: {
      decorations: (state) => {
        return key.getState(state)?.decorations
      },
      attributes: {
        style: [
          `--page-margin-right:${marginRight}px;`,
          `--page-margin-left:${marginLeft}px;`,
          `--page-width:${pageWidth}px;`,
          `--page-height:${pageHeight}px;`,
        ].join(''),
      },
    },
  })
}

interface PageRenderingState {
  /**
   * The measured content box height of each top-level node.
   */
  heights: number[]
  layouts: ChunkLayout[]
  decorations: DecorationSet
}

/**
 * Carries the measured heights over a document change. Unchanged top-level
 * nodes at the start and the end of the document keep their heights. The
 * other nodes keep the height at the same index until the next measurement.
 */
function mapHeights(heights: number[], oldDoc: Node, newDoc: Node): number[] {
  const oldCount = oldDoc.childCount
  const newCount = newDoc.childCount
  const result = Array.from<number>({ length: newCount })

  let start = 0
  while (start < oldCount && start < newCount && oldDoc.child(start) === newDoc.child(start)) {
    result[start] = heights[start] ?? 0
    start++
  }

  let end = 0
  while (
    end < oldCount - start
    && end < newCount - start
    && oldDoc.child(oldCount - 1 - end) === newDoc.child(newCount - 1 - end)
  ) {
    result[newCount - 1 - end] = heights[oldCount - 1 - end] ?? 0
    end++
  }

  for (let i = start; i < newCount - end; i++) {
    result[i] = i < oldCount - end ? (heights[i] ?? 0) : 0
  }

  return result
}

/**
 * Measures the page chunk wrappers and dispatches the heights to the plugin
 * state. It dispatches only from the `ResizeObserver` callback, which runs
 * after the layout and before the paint.
 */
class PageMeasureView implements PluginView {
  #view: EditorView
  #key: PluginKey<PageRenderingState>
  #observer: ResizeObserver
  #chunks: (HTMLElement | null)[] = []
  #observed = new Set<HTMLElement>()
  #heights = new WeakMap<HTMLElement, number>()

  constructor(view: EditorView, key: PluginKey<PageRenderingState>) {
    this.#view = view
    this.#key = key
    this.#observer = new ResizeObserver(this.#handleResize)
    this.#observe()
  }

  update(view: EditorView): void {
    this.#view = view
    this.#observe()
  }

  destroy(): void {
    this.#observer.disconnect()
  }

  #observe(): void {
    const view = this.#view
    const chunks: (HTMLElement | null)[] = []
    const current = new Set<HTMLElement>()

    view.state.doc.forEach((_node, pos) => {
      const dom = view.nodeDOM(pos)
      const chunk = dom?.parentElement?.closest<HTMLElement>(PAGE_CHUNK_TAG_NAME) ?? null
      chunks.push(chunk)
      if (chunk) current.add(chunk)
    })

    for (const chunk of this.#observed) {
      if (!current.has(chunk)) {
        this.#observer.unobserve(chunk)
      }
    }
    for (const chunk of current) {
      if (!this.#observed.has(chunk)) {
        this.#observer.observe(chunk)
      }
    }

    this.#chunks = chunks
    this.#observed = current
  }

  #handleResize = (entries: ResizeObserverEntry[]): void => {
    for (const entry of entries) {
      const height = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height
      this.#heights.set(entry.target as HTMLElement, height)
    }

    const view = this.#view
    const prev = this.#key.getState(view.state)?.heights ?? []
    const heights = this.#chunks.map((chunk, i) => {
      const height = chunk ? this.#heights.get(chunk) : undefined
      return height ?? prev[i] ?? 0
    })

    // Avoid potential float number precision issues
    const changed = heights.length !== prev.length
      || heights.some((height, i) => Math.abs(height - prev[i]) >= 0.1)
    if (!changed) return

    view.dispatch(view.state.tr.setMeta(this.#key, heights).setMeta('addToHistory', false))
  }
}
