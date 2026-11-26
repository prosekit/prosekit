import { getId, isDeepEqual } from '@ocavue/utils'
import { definePlugin, type Extension } from '@prosekit/core'
import type { Node } from '@prosekit/pm/model'
import { Plugin, PluginKey } from '@prosekit/pm/state'
import type { Mapping } from '@prosekit/pm/transform'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

import { computePageLayout, type ChunkLayout } from './page-layout.ts'
import { PAGE_CHUNK_ID_ATTRIBUTE, PAGE_CHUNK_TAG_NAME, PageMeasureView } from './page-measure.ts'

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
   * chunk IDs and the layouts are unchanged. Pass `mapping` when the document
   * has changed since `prev`.
   */
  function createState(
    doc: Node,
    ids: number[],
    heights: number[],
    prev: PageRenderingState | undefined,
    mapping: Mapping | undefined,
  ): PageRenderingState {
    const breaks: boolean[] = []
    doc.forEach((node) => {
      breaks.push(!!node.type.spec.pageBreak)
    })

    const layouts = computePageLayout(heights, breaks, pageHeight, marginTop, marginBottom)

    if (prev && isDeepEqual(prev.ids, ids) && isDeepEqual(prev.layouts, layouts)) {
      if (!mapping) {
        return { ids: prev.ids, heights, layouts: prev.layouts, decorations: prev.decorations }
      }
      let removed = false
      const decorations = prev.decorations.map(mapping, doc, {
        onRemove: () => {
          removed = true
        },
      })
      if (!removed) {
        return { ids: prev.ids, heights, layouts: prev.layouts, decorations }
      }
    }

    const decorations: Decoration[] = []
    doc.forEach((node, pos, index) => {
      const layout = layouts[index]
      decorations.push(
        Decoration.node(pos, pos + node.nodeSize, {
          'nodeName': PAGE_CHUNK_TAG_NAME,
          [PAGE_CHUNK_ID_ATTRIBUTE]: String(ids[index]),
          'data-page-head': layout.head ? '' : undefined,
          'data-page-tail': layout.tail ? '' : undefined,
          'style': `padding-top:${layout.paddingTop}px;padding-bottom:${layout.paddingBottom}px;`,
        }),
      )
    })

    return { ids, heights, layouts, decorations: DecorationSet.create(doc, decorations) }
  }

  return new Plugin<PageRenderingState>({
    key,
    view: (view) => {
      return new PageMeasureView(view, (measured) => {
        const state = key.getState(view.state)
        if (!state) return

        // Avoid potential float number precision issues
        const changed = state.ids.some((id, i) => {
          const height = measured.get(id)
          return height != null && Math.abs(height - state.heights[i]) >= 0.1
        })
        if (!changed) return

        view.dispatch(view.state.tr.setMeta(key, measured).setMeta('addToHistory', false))
      })
    },
    state: {
      init: (_config, state): PageRenderingState => {
        const ids: number[] = []
        const heights: number[] = []
        state.doc.forEach(() => {
          ids.push(getId())
          heights.push(0)
        })
        return createState(state.doc, ids, heights, undefined, undefined)
      },
      apply: (tr, value, oldState, newState): PageRenderingState => {
        if (!tr.docChanged) {
          const measured = tr.getMeta(key) as Map<number, number> | undefined
          if (!measured) return value
          const heights = value.ids.map((id, i) => measured.get(id) ?? value.heights[i])
          return createState(newState.doc, value.ids, heights, value, undefined)
        }

        const { ids, heights } = mapChunks(value, oldState.doc, newState.doc)
        return createState(newState.doc, ids, heights, value, tr.mapping)
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
   * The chunk ID of each top-level node. A chunk ID stays the same over
   * document changes that keep the node.
   */
  ids: number[]
  /**
   * The measured content box height of each top-level node.
   */
  heights: number[]
  layouts: ChunkLayout[]
  decorations: DecorationSet
}

/**
 * Carries the chunk IDs and the measured heights over a document change.
 * Unchanged top-level nodes at the start and the end of the document keep
 * their IDs and heights. The other nodes keep the ID and the height at the
 * same index. New nodes get new IDs and zero heights until the next
 * measurement.
 */
function mapChunks(
  prev: PageRenderingState,
  oldDoc: Node,
  newDoc: Node,
): { ids: number[]; heights: number[] } {
  const oldCount = oldDoc.childCount
  const newCount = newDoc.childCount
  const ids = Array.from<number>({ length: newCount })
  const heights = Array.from<number>({ length: newCount })

  let start = 0
  while (start < oldCount && start < newCount && oldDoc.child(start) === newDoc.child(start)) {
    ids[start] = prev.ids[start]
    heights[start] = prev.heights[start]
    start++
  }

  let end = 0
  while (
    end < oldCount - start
    && end < newCount - start
    && oldDoc.child(oldCount - 1 - end) === newDoc.child(newCount - 1 - end)
  ) {
    ids[newCount - 1 - end] = prev.ids[oldCount - 1 - end]
    heights[newCount - 1 - end] = prev.heights[oldCount - 1 - end]
    end++
  }

  for (let i = start; i < newCount - end; i++) {
    if (i < oldCount - end) {
      ids[i] = prev.ids[i]
      heights[i] = prev.heights[i]
    } else {
      ids[i] = getId()
      heights[i] = 0
    }
  }

  return { ids, heights }
}
