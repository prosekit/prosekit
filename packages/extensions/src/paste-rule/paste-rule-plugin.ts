import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'
import type { Slice } from '@prosekit/pm/model'
import {
  PluginKey,
  ProseMirrorPlugin,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

type PasteRulePayload = (options: { slice: Slice; view: EditorView; plain: boolean }) => Slice

/**
 * @internal
 */
const pasteRuleFacet = defineFacet<PasteRulePayload, PluginPayload>({
  reduce: () => {
    let handlers: PasteRulePayload[] = []
    let isPlainText = false

    const transformPasted = (slice: Slice, view: EditorView): Slice => {
      for (const handler of handlers) {
        slice = handler({ slice, view, plain: isPlainText })
      }
      return slice
    }

    const plugin = new ProseMirrorPlugin({
      key: new PluginKey('prosekit-paste-rule'),
      props: {
        transformPasted,
        transformPastedText: (text, plain) => {
          isPlainText = plain
          return text
        },
        transformPastedHTML(html) {
          isPlainText = false
          return html
        },
      },
    })

    return (inputs: PasteRulePayload[]) => {
      // Last added rule (highest priority) is applied first
      handlers = [...inputs].reverse()
      return plugin
    }
  },
  singleton: true,
  parent: pluginFacet,
})

/**
 * @internal
 */
export function definePasteRulePlugin(payload: PasteRulePayload): PlainExtension {
  return defineFacetPayload(pasteRuleFacet, [payload]) as PlainExtension
}
