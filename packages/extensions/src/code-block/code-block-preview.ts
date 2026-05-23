import { definePlugin, isCodeBlockType, type PlainExtension } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { Plugin, PluginKey, type EditorState } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

type PluginState = DecorationSet

export const HIDE_CODE_BLOCK_PREVIEW = 'prosekitHideCodeBlockPreview' as const
export const codeBlockPreviewDecorationsPluginKey: PluginKey<PluginState> = new PluginKey<PluginState>(
  'prosekit-code-block-preview-decorations',
)

export function defineCodeBlockPreviewDecorations(): PlainExtension {
  return definePlugin(
    new Plugin<PluginState>({
      key: codeBlockPreviewDecorationsPluginKey,
      state: {
        init(_, state) {
          return createCodeBlockPreviewDecorations(state)
        },
        apply(tr, oldValue, oldState, newState) {
          if (
            oldState.selection.head === newState.selection.head
            && !tr.docChanged
          ) {
            return oldValue
          }
          return createCodeBlockPreviewDecorations(newState)
        },
      },
      props: {
        decorations: (state) => {
          return codeBlockPreviewDecorationsPluginKey.getState(state)
        },
      },
    }),
  )
}

export function hasCodeBlockPreviewHiddenDecoration(
  decorations: readonly Decoration[],
): boolean {
  return decorations.some((decoration) => {
    const spec = decoration.spec as string | undefined
    return spec === HIDE_CODE_BLOCK_PREVIEW
  })
}

function createCodeBlockPreviewDecorations(state: EditorState): DecorationSet {
  const isHeadInside = isHeadInsideCodeBlock(state)
  const isAnchorInside = isAnchorInsideCodeBlock(state)

  const isInside = isHeadInside || isAnchorInside

  if (!isInside) {
    return DecorationSet.empty
  }

  let parent: ProseMirrorNode
  let before: number
  if (isHeadInside) {
    const { $head } = state.selection
    parent = $head.parent
    before = $head.before()
  } else {
    const { $anchor } = state.selection
    parent = $anchor.parent
    before = $anchor.before()
  }

  const deco = Decoration.node(
    before,
    before + parent.nodeSize,
    { class: 'prosemirror-code-block-head-inside' },
    HIDE_CODE_BLOCK_PREVIEW,
  )
  return DecorationSet.create(state.doc, [deco])
}

function isHeadInsideCodeBlock(state: EditorState) {
  const { $head } = state.selection
  const node = $head.parent

  return isCodeBlockType(node.type) && node.isTextblock
}

function isAnchorInsideCodeBlock(state: EditorState) {
  const { $anchor } = state.selection
  const node = $anchor.parent

  return isCodeBlockType(node.type) && node.isTextblock
}
