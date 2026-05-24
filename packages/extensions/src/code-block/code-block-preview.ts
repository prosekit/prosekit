import { definePlugin, type PlainExtension } from '@prosekit/core'
import { Plugin, PluginKey, type EditorState } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

type PluginState = DecorationSet | undefined

/** @interface */
export const HIDE_CODE_BLOCK_PREVIEW = 'prosekitHideCodeBlockPreview' as const

/** @interface */
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
            oldState.selection.anchor === newState.selection.anchor
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
    const spec: unknown = decoration.spec
    return spec === HIDE_CODE_BLOCK_PREVIEW
  })
}

function createCodeBlockPreviewDecorations(state: EditorState): DecorationSet | undefined {
  const $anchor = state.selection.$anchor
  const parent  = $anchor.parent
  if (!parent.isTextblock || !parent.type.spec.code) {
    return
  }

  const before = $anchor.before()
  const deco = Decoration.node(
    before,
    before + parent.nodeSize,
    {},
    HIDE_CODE_BLOCK_PREVIEW,
  )
  return DecorationSet.create(state.doc, [deco])
}
