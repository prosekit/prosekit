import { definePlugin, type PlainExtension } from '@prosekit/core'
import { PluginKey, ProseMirrorPlugin, type Selection, type SelectionBookmark, type Transaction } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

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
 */
export function defineVirtualSelection(): VirtualSelectionExtension {
  return definePlugin(virtualSelectionPlugin)
}

type PluginState = {
  bookmark: SelectionBookmark
  from: number
  to: number
} | null

const key = new PluginKey<PluginState>('prosekit-virtual-selection')
const activeClass = 'prosekit-virtual-selection-active'

function getSelectionMeta(tr: Transaction): PluginState | undefined {
  return tr.getMeta(key) as PluginState | undefined
}

function setSelectionMeta(tr: Transaction, value: PluginState) {
  return tr.setMeta(key, value)
}

function shouldDecorate(selection: Selection): boolean {
  return !selection.empty && selection.visible
}

function toPluginState(selection: Selection): PluginState {
  if (!shouldDecorate(selection)) return null

  return {
    bookmark: selection.getBookmark(),
    from: selection.from,
    to: selection.to,
  }
}

const virtualSelectionPlugin = new ProseMirrorPlugin<PluginState>({
  key,
  state: {
    init: () => null,
    apply: (tr, value) => {
      const meta = getSelectionMeta(tr)
      if (meta !== undefined) return meta
      if (!value) return null
      if (!tr.docChanged) return value

      const bookmark = value.bookmark.map(tr.mapping)
      const selection = bookmark.resolve(tr.doc)
      return toPluginState(selection)
    },
  },
  props: {
    handleDOMEvents: {
      focus: (view) => {
        view.dispatch(setSelectionMeta(view.state.tr, null))
      },

      blur: (view) => {
        const { dom, root } = view
        const activeElement = root.activeElement

        // Don't show the decoration if the dom is blurred because the focus
        // moved outside the browser window.
        if (activeElement === dom) return

        view.dispatch(setSelectionMeta(view.state.tr, toPluginState(view.state.selection)))
      },
    },
    decorations: (state) => {
      const pluginState = key.getState(state)
      if (!pluginState) return null

      return DecorationSet.create(state.doc, [
        Decoration.inline(pluginState.from, pluginState.to, {
          class: 'prosekit-virtual-selection',
        }),
      ])
    },
  },
  view: (view) => {
    const updateClass = () => {
      view.dom.classList.toggle(activeClass, Boolean(key.getState(view.state)))
    }

    updateClass()

    return {
      update: updateClass,
      destroy: () => {
        view.dom.classList.remove(activeClass)
      },
    }
  },
})
