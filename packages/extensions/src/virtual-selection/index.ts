import { definePlugin, type Extension } from '@prosekit/core'
import {
  EditorState,
  PluginKey,
  ProseMirrorPlugin,
  Transaction,
} from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

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
export function defineVirtualSelection(): Extension {
  return definePlugin(virtualSelectionPlugin)
}

const enum FocusState {
  Focused = 1,
  Blurred = 2,
}

const key = new PluginKey<FocusState>('prosekit-virtual-selection')

function getFocusMeta(tr: Transaction): FocusState | undefined {
  return tr.getMeta(key) as FocusState | undefined
}

function setFocusMeta(tr: Transaction, value: FocusState) {
  return tr.setMeta(key, value)
}

function getFocusState(state: EditorState): FocusState | undefined {
  return key.getState(state)
}

const virtualSelectionPlugin = new ProseMirrorPlugin<FocusState>({
  key,
  state: {
    init: () => FocusState.Focused,
    apply: (tr, value) => {
      return getFocusMeta(tr) ?? value
    },
  },
  props: {
    handleDOMEvents: {
      focus: (view) => {
        view.dispatch(setFocusMeta(view.state.tr, FocusState.Focused))
      },

      blur: (view) => {
        view.dispatch(setFocusMeta(view.state.tr, FocusState.Blurred))
      },
    },
    decorations: (state) => {
      const { selection, doc } = state

      if (selection.empty || getFocusState(state) === FocusState.Focused) {
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
