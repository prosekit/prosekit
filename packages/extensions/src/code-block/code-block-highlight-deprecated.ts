import { definePlugin } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import { DecorationSet } from '@prosekit/pm/view'
import type { HLJSApi } from 'highlight.js'
import { getHighlightDecorations } from 'prosemirror-highlightjs'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * @deprecated
 */
export function defineCodeBlockHighlightDeprecated(options: {
  hljs?: HLJSApi
}) {
  const hljs = options.hljs

  const plugin = new ProseMirrorPlugin<DecorationSet>({
    key,
    state: {
      init(_config, state) {
        const decorations = hljs
          ? getHighlightDecorations(
              state.doc,
              hljs,
              blockTypes,
              languageExtractor,
            )
          : []
        return DecorationSet.create(state.doc, decorations)
      },
      apply(tr, set) {
        if (!tr.docChanged) {
          return set.map(tr.mapping, tr.doc)
        }

        const decorations = hljs
          ? getHighlightDecorations(tr.doc, hljs, blockTypes, languageExtractor)
          : []
        return DecorationSet.create(tr.doc, decorations)
      },
    },
    props: {
      decorations(state) {
        return key.getState(state)
      },
    },
  })

  return definePlugin(plugin)
}

const key = new PluginKey<DecorationSet>('prosekit-code-block-highlight')

const blockTypes = ['codeBlock']

function languageExtractor(node: ProseMirrorNode) {
  return (node.attrs as CodeBlockAttrs).language || 'javascript'
}
