import { getId } from '@ocavue/utils'
import { definePlugin, type Extension } from '@prosekit/core'
import type { Node } from '@prosekit/pm/model'
import { Plugin, PluginKey } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

import { registerPageMeasureElement } from './page-element.ts'

/**
 * @internal
 */
export type PageRenderingExtension = Extension

interface PageRenderingOptions {
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

/**
 * @public
 */
export function definePageRendering(options: PageRenderingOptions = {}): PageRenderingExtension {
  return definePlugin(
    createPageRenderingPlugin(options),
  )
}

function createPageRenderingPlugin(options: PageRenderingOptions): Plugin {
  const {
    pageWidth = 794,
    pageHeight = 1123,
    marginTop = 70,
    marginRight = 70,
    marginBottom = 70,
    marginLeft = 70,
  } = options

  type PluginState = [group: string, decoration: DecorationSet]

  const key = new PluginKey<PluginState>('prosekit-page-render')

  function createDecorationSet(doc: Node, group: string): DecorationSet {
    const decorations: Decoration[] = []

    doc.forEach((node, pos, index) => {
      const isPageBreak: boolean | undefined = node.type.spec.pageBreak

      decorations.push(Decoration.node(pos, pos + node.nodeSize, {
        'nodeName': 'pm-page-chunk',
        'data-group': group,
        'data-index': String(index),
        'data-w': String(pageWidth),
        'data-h': String(pageHeight),
        'data-mt': String(marginTop),
        'data-mr': String(marginRight),
        'data-mb': String(marginBottom),
        'data-ml': String(marginLeft),
        'data-break': isPageBreak ? 'true' : undefined,
      }))
    })

    return DecorationSet.create(doc, decorations)
  }

  registerPageMeasureElement()

  return new Plugin<PluginState>({
    key,
    state: {
      init: (_config, state): PluginState => {
        const group = `page-group-${getId()}`
        const decoration = createDecorationSet(state.doc, group)
        return [group, decoration]
      },
      apply: (tr, value, oldState, newState): PluginState => {
        if (!tr.docChanged) return value

        const [group, decoration] = value
        let needRecreate = oldState.doc.childCount !== newState.doc.childCount

        if (!needRecreate) {
          const mapped = decoration.map(tr.mapping, tr.doc, {
            onRemove: () => {
              needRecreate = true
            },
          })
          if (!needRecreate) {
            return [group, mapped]
          }
        }

        return [group, createDecorationSet(newState.doc, group)]
      },
    },
    props: {
      decorations: (state) => {
        return key.getState(state)?.[1]
      },
    },
  })
}
