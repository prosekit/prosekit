import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import {
  PluginKey,
  ProseMirrorPlugin,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'
import {
  Decoration,
  DecorationSet,
} from '@prosekit/pm/view'

/**
 * @internal
 */
export type VirtualSelectionExtension = PlainExtension

/**
 * Shows a virtual selection when the editor is not focused. When the editor is
 * not focused, the selected inline content will be wrapped in a `<span>`
 * element with the class `prosekit-virtual-selection`.
 *
 * This is useful when you want to move the focus to an element outside the
 * editor, but still want to show the selection.
 *
 * @public
 */
export function defineVirtualSelection(): VirtualSelectionExtension {
  return definePlugin(virtualSelectionPlugin)
}

// Show the decoration when this is true.
type PluginState = boolean

const key = new PluginKey<PluginState>('prosekit-virtual-selection')

function getFocusMeta(tr: Transaction): PluginState | undefined {
  return tr.getMeta(key) as PluginState | undefined
}

function setFocusMeta(tr: Transaction, value: PluginState) {
  return tr.setMeta(key, value)
}

function getFocusState(state: EditorState): PluginState | undefined {
  return key.getState(state)
}

const virtualSelectionPlugin = new ProseMirrorPlugin<PluginState>({
  key,
  state: {
    init: () => false,
    apply: (tr, value) => {
      return getFocusMeta(tr) ?? value
    },
  },
  props: {
    handleDOMEvents: {
      focus: (view) => {
        view.dispatch(setFocusMeta(view.state.tr, false))
      },

      blur: (view) => {
        const { dom, root } = view
        const activeElement = root.activeElement

        // Don't show the decoration if the dom is blurred because the focus
        // moved outside the browser window.
        if (activeElement === dom) return

        view.dispatch(setFocusMeta(view.state.tr, true))
      },
    },
    decorations: (state) => {
      const { selection, doc } = state

      if (
        selection.empty
        || !getFocusState(state)
        // When `selection.visible` is false, it indicates that the selection is
        // rendered by the editor and it's not a native browser selection. An
        // example of this is `NodeSelection`. In this situation, since the
        // editor already shows the selection, we don't need to display a
        // virtual selection.
        || !selection.visible
      ) {
        return null
      }

      return DecorationSet.create(doc, [
        Decoration.inline(selection.from, selection.to, {
          class: 'prosekit-virtual-selection',
        }),
      ])
    },
  },
})
