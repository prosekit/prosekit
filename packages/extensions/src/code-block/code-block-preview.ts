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

/**
 * Defines a plugin that adds a decoration to hide the code block preview when the cursor is inside a code block. Use {@link isCodeBlockPreviewHiddenDecoration} to check whether a given decoration hides the code block preview.
 */
export function defineCodeBlockPreviewPlugin(): PlainExtension {
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

/**
 * Returns whether the given decoration hides the code block preview (i.e.
 * the cursor is inside the code block it decorates).
 */
export function isCodeBlockPreviewHiddenDecoration(decoration: Decoration): boolean {
  return decoration.spec === HIDE_CODE_BLOCK_PREVIEW
}

function createCodeBlockPreviewDecorations(state: EditorState): DecorationSet | undefined {
  const $anchor = state.selection.$anchor
  const parent = $anchor.parent
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
