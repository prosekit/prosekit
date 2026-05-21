import { definePlugin, type PlainExtension } from '@prosekit/core'
import { isCodeBlockType } from '@prosekit/core'
import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'
import { Plugin, PluginKey, type EditorState } from '@prosekit/pm/state'
import { Decoration, DecorationSet, type DecorationSource } from '@prosekit/pm/view'

export const HIDE_CODE_BLOCK_PREVIEW = 'prosekitHideCodeBlockPreview' as const

export function defineCodeBlockPreviewDecorations(): PlainExtension {
  return definePlugin(
    new Plugin({
      key: new PluginKey('prosekit-code-block-preview-decorations'),
      props: {
        decorations: createCodeBlockPreviewDecorations,
      },
    }),
  )
}

export function hasCodeBlockPreviewHiddenDecoration(
  decorations: readonly Decoration[],
): boolean {
  return decorations.some((decoration) => {
    const spec = decoration.spec as Record<string, unknown>
    return spec != null && typeof spec === 'object' && spec[HIDE_CODE_BLOCK_PREVIEW] === true
  })
}

function createCodeBlockPreviewDecorations(state: EditorState): DecorationSource {
  const codeBlocks = getOverlappingCodeBlocks(state)
  if (codeBlocks.length === 0) {
    return DecorationSet.empty
  }

  return DecorationSet.create(
    state.doc,
    codeBlocks.map(([pos, node]) =>
      Decoration.node(pos, pos + node.nodeSize, {}, {
        [HIDE_CODE_BLOCK_PREVIEW]: true,
      })
    ),
  )
}

function getOverlappingCodeBlocks(state: EditorState): Array<[pos: number, node: ProseMirrorNode]> {
  const codeBlocks = new Map<number, ProseMirrorNode>()
  const { selection } = state

  collectCodeBlockAncestors(codeBlocks, selection['$from'])
  collectCodeBlockAncestors(codeBlocks, selection['$to'])

  if (!selection.empty) {
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
      if (isCodeBlockType(node.type)) {
        codeBlocks.set(pos, node)
      }
    })
  }

  return [...codeBlocks.entries()]
}

function collectCodeBlockAncestors(
  codeBlocks: Map<number, ProseMirrorNode>,
  $pos: ResolvedPos,
): void {
  for (let depth = $pos.depth; depth >= 0; depth--) {
    const node = $pos.node(depth)
    if (!isCodeBlockType(node.type)) continue
    codeBlocks.set($pos.before(depth), node)
    break
  }
}
