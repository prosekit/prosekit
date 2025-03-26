import type { EditorView } from '@prosekit/pm/view'

import { NodeTypes } from './node-types'

export function getElementAtPos(view: EditorView, pos: number): HTMLElement | undefined {
  const node = view.nodeDOM(pos)
  if (node && node.nodeType === NodeTypes.ELEMENT_NODE) {
    return node as HTMLElement
  }
}
