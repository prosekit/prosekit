import { defineBasicExtension } from 'prosekit/basic'
import { defineNodeSpec, definePlugin, union } from 'prosekit/core'
import { PluginKey, ProseMirrorPlugin, type Transaction } from 'prosekit/pm/state'
import { Decoration, DecorationSet } from 'prosekit/pm/view'
import { defineReactNodeView } from 'prosekit/react'

import { NestedEditableView } from './nested-editable-view.tsx'

const legacyVirtualSelectionKey = new PluginKey<boolean>('virtual-selection-repro-legacy')

function getLegacyFocusMeta(tr: Transaction): boolean | undefined {
  return tr.getMeta(legacyVirtualSelectionKey) as boolean | undefined
}

function defineLegacyVirtualSelection() {
  return definePlugin(
    new ProseMirrorPlugin<boolean>({
      key: legacyVirtualSelectionKey,
      state: {
        init: () => false,
        apply: (tr, value) => getLegacyFocusMeta(tr) ?? value,
      },
      props: {
        handleDOMEvents: {
          focus: (view) => {
            view.dispatch(view.state.tr.setMeta(legacyVirtualSelectionKey, false))
          },
          blur: (view) => {
            const { dom, root } = view
            const domSelection = 'getSelection' in root ? root.getSelection() : window.getSelection()
            if (domSelection?.anchorNode && dom.contains(domSelection.anchorNode)) {
              domSelection.removeAllRanges()
            }
            view.dispatch(view.state.tr.setMeta(legacyVirtualSelectionKey, true))
          },
        },
        decorations: (state) => {
          const { selection } = state
          if (!legacyVirtualSelectionKey.getState(state) || selection.empty || !selection.visible) {
            return null
          }
          return DecorationSet.create(state.doc, [
            Decoration.inline(selection.from, selection.to, {
              class: 'prosekit-virtual-selection-repro-legacy',
            }),
          ])
        },
      },
    }),
  )
}

export function defineExtension(legacy: boolean) {
  return union(
    defineBasicExtension(),
    ...(legacy ? [defineLegacyVirtualSelection()] : []),
    defineNodeSpec({
      name: 'nestedEditable',
      content: 'block+',
      group: 'block',
      toDOM: () => ['div', 0],
    }),
    defineReactNodeView({
      name: 'nestedEditable',
      component: NestedEditableView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
