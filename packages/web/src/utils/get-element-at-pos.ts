import type { EditorView } from '@prosekit/pm/view'

const ELEMENT_NODE: typeof Node.ELEMENT_NODE = 1

export function getElementAtPos(view: EditorView, pos: number): HTMLElement | undefined {
  const node = view.nodeDOM(pos)
  if (node && node.nodeType === ELEMENT_NODE) {
    return node as HTMLElement
  }
}
