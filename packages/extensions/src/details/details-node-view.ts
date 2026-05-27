import { defineNodeView, type Extension } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { Decoration, EditorView, NodeView, NodeViewConstructor } from '@prosekit/pm/view'

const detailsNodeViewConstructor: NodeViewConstructor = (
  node: ProseMirrorNode,
  view: EditorView,
  getPos: () => number | undefined,
  _decorations: readonly Decoration[],
): NodeView => {
  const dom = document.createElement('details')
  const contentDOM = dom
  let isSyncing = false

  const syncDOM = (nextNode: ProseMirrorNode) => {
    isSyncing = true
    dom.open = Boolean(nextNode.attrs.open)
    isSyncing = false
  }

  const onToggle = () => {
    const pos = getPos()
    if (isSyncing || pos == null) return

    const currentNode = view.state.doc.nodeAt(pos)
    if (!currentNode || currentNode.type !== node.type) return
    if (Boolean(currentNode.attrs.open) === dom.open) return

    view.dispatch(view.state.tr.setNodeAttribute(pos, 'open', dom.open))
  }

  const onClick = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof HTMLElement)) return

    const summary = target.closest('summary')
    if (!(summary instanceof HTMLElement)) return

    const rect = summary.getBoundingClientRect()
    if (event.clientX - rect.left > 28) return

    const pos = getPos()
    if (pos == null) return

    event.preventDefault()
    event.stopPropagation()

    const currentNode = view.state.doc.nodeAt(pos)
    if (!currentNode || currentNode.type !== node.type) return

    view.dispatch(view.state.tr.setNodeAttribute(pos, 'open', !Boolean(currentNode.attrs.open)))
  }

  syncDOM(node)
  dom.addEventListener('toggle', onToggle)
  dom.addEventListener('click', onClick)

  return {
    dom,
    contentDOM,
    update(nextNode) {
      if (nextNode.type !== node.type) return false
      node = nextNode
      syncDOM(nextNode)
      return true
    },
    destroy() {
      dom.removeEventListener('toggle', onToggle)
      dom.removeEventListener('click', onClick)
    },
  }
}

function createDetailsNodeView(): NodeViewConstructor {
  return detailsNodeViewConstructor
}

/**
 * Defines a minimal node view for `details` that keeps the native open state in sync.
 */
export function defineDetailsNodeView(): Extension {
  return defineNodeView({
    name: 'details',
    constructor: createDetailsNodeView(),
  })
}
