import { definePlugin } from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import { Plugin, PluginKey, type EditorState, type Selection } from 'prosekit/pm/state'
import { Decoration, DecorationSet } from 'prosekit/pm/view'

export const hideCodeBlockPreviewDecorationKey = 'hideCodeBlockPreview'

export function defineCodeBlockPreviewDecorations() {
  return definePlugin(
    new Plugin({
      key: new PluginKey('registry-code-block-preview-decorations'),
      props: {
        decorations: (state) => createCodeBlockPreviewDecorations(state),
      },
    }),
  )
}

function createCodeBlockPreviewDecorations(state: EditorState): DecorationSet {
  const codeBlocks = getOverlappingCodeBlocks(state)
  if (codeBlocks.length === 0) {
    return DecorationSet.empty
  }

  return DecorationSet.create(
    state.doc,
    codeBlocks.map(([pos, node]) =>
      Decoration.node(pos, pos + node.nodeSize, {}, {
        [hideCodeBlockPreviewDecorationKey]: true,
      })),
  )
}

function getOverlappingCodeBlocks(state: EditorState): Array<[pos: number, node: ProseMirrorNode]> {
  const codeBlocks = new Map<number, ProseMirrorNode>()
  const { selection } = state

  collectCodeBlockAncestors(codeBlocks, selection, '$from')
  collectCodeBlockAncestors(codeBlocks, selection, '$to')

  if (!selection.empty) {
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
      if (node.type.name === 'codeBlock') {
        codeBlocks.set(pos, node)
      }
    })
  }

  return [...codeBlocks.entries()]
}

function collectCodeBlockAncestors(
  codeBlocks: Map<number, ProseMirrorNode>,
  selection: Selection,
  key: '$from' | '$to',
): void {
  const $pos = selection[key]

  for (let depth = $pos.depth; depth >= 0; depth--) {
    const node = $pos.node(depth)
    if (node.type.name !== 'codeBlock') continue
    codeBlocks.set($pos.before(depth), node)
    break
  }
}
