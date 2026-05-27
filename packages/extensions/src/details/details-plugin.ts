import { definePlugin, type PlainExtension } from '@prosekit/core'
import { Plugin, PluginKey, TextSelection } from '@prosekit/pm/state'

function createDetailsSelectionPlugin(): Plugin {
  return new Plugin({
    key: new PluginKey('prosekit-details-selection'),
    appendTransaction(_transactions, _oldState, newState) {
      const { selection } = newState
      if (!selection.empty) return null

      const hiddenDetails = findCollapsedDetails(selection.$from)
      if (!hiddenDetails) return null

      const summarySelectionPos = hiddenDetails.pos + 2 + hiddenDetails.node.firstChild!.content.size
      const resolvedPos = newState.doc.resolve(summarySelectionPos)
      if (resolvedPos.pos === selection.from) return null

      return newState.tr.setSelection(TextSelection.near(resolvedPos)).scrollIntoView()
    },
  })
}

function findCollapsedDetails($pos: Parameters<typeof TextSelection.near>[0]) {
  for (let depth = $pos.depth; depth >= 0; depth--) {
    const node = $pos.node(depth)
    if (node.type.name !== 'details') continue
    if (node.attrs.open) return null
    if ($pos.depth < depth + 1) return null
    if ($pos.node(depth + 1).type.name !== 'detailsContent') return null

    return {
      node,
      pos: $pos.before(depth),
    }
  }

  return null
}

/**
 * Prevents the selection from remaining inside hidden `detailsContent`.
 */
export function defineDetailsPlugin(): PlainExtension {
  return definePlugin(createDetailsSelectionPlugin())
}
