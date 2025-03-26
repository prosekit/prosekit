import type { EditorView } from '@prosekit/pm/view'

import { NodeType } from './node-types'

export function getElementAtPos(view: EditorView, pos: number): HTMLElement | undefined {
  const node = view.nodeDOM(pos)
  if (node && node.nodeType === NodeType.ELEMENT_NODE) {
    return node as HTMLElement
  }
}
