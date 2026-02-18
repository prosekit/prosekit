import { Plugin, PluginKey, type EditorState } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

const DECORATION_SPEC = 'MATH_CURSOR_INSIDE'

function createCursorInsideDecoration(
  state: EditorState,
): DecorationSet | undefined {
  const { $head } = state.selection
  const node = $head.parent

  if (!node.type.isInGroup('math')) return

  const before = $head.before()
  const deco = Decoration.node(
    before,
    before + node.nodeSize,
    { class: 'prosemirror-math-head-inside' },
    DECORATION_SPEC,
  )
  return DecorationSet.create(state.doc, [deco])
}

/**
 * @internal
 */
export function hasCursorInsideDecoration(decorations: readonly Decoration[]): boolean {
  return decorations.some(deco => deco.spec === DECORATION_SPEC)
}

type PluginState = DecorationSet | undefined

/**
 * Creates a plugin that adds a `prosemirror-math-head-inside` CSS class to math
 * nodes when the text selection head is inside them. This is useful for styling
 * math nodes differently while they are being edited.
 *
 * The plugin automatically detects nodes in the `math` group.
 *
 * @public
 */
export function createCursorInsidePlugin(): Plugin {
  const key = new PluginKey<PluginState>('prosemirror-math-cursor-inside')
  return new Plugin<PluginState>({
    key,
    state: {
      init(): PluginState {
        return undefined
      },
      apply(tr, oldValue, oldState, newState): PluginState {
        if (
          oldState.selection.head === newState.selection.head
          && !tr.docChanged
        ) {
          return oldValue
        }
        return createCursorInsideDecoration(newState)
      },
    },
    props: {
      decorations(state: EditorState): PluginState | undefined {
        return key.getState(state)
      },
    },
  })
}
