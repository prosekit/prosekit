import { addPlugin } from '@prosekit/core'
import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'
import { ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

export function addCodeBlockHovering(options: {
  onHover: (options: {
    pos: number
    node: ProseMirrorNode
    dom: HTMLElement
  }) => void
  onLeave: () => void
}) {
  let hovering = false

  const findCodeBlock = (
    $pos: ResolvedPos,
  ): { pos: number; node: ProseMirrorNode } | null => {
    for (let d = $pos.depth; d >= 0; d--) {
      const node = $pos.node(d)
      if (node.type.spec.code && node.isTextblock) {
        return { node, pos: $pos.before(d) }
      }
    }
    return null
  }

  const handleMouseOver = (view: EditorView, event: MouseEvent) => {
    if (hovering) return

    const enteredTarget = event.target as HTMLElement | null
    if (enteredTarget?.tagName !== 'PRE') return

    const pos = view.posAtDOM(enteredTarget, 0)
    const $pos = view.state.doc.resolve(pos)
    const node = findCodeBlock($pos)

    if (!node) return

    hovering = true
    options.onHover({ ...node, dom: enteredTarget })
  }

  const handleMouseOut = (view: EditorView, event: MouseEvent) => {
    if (!hovering) return

    const leavedTarget = event.target as HTMLElement | null
    if (leavedTarget?.tagName !== 'PRE') return

    const enteredTarget = event.relatedTarget as HTMLElement | null
    // Quick exit if the mouse is still inside a SPAN element inside the PRE element
    if (!enteredTarget || enteredTarget.tagName === 'SPAN') return

    const pos = view.posAtDOM(enteredTarget, 0)
    const $pos = view.state.doc.resolve(pos)
    const node = findCodeBlock($pos)

    if (node) return

    hovering = false
    options.onLeave()
  }

  const plugin = new ProseMirrorPlugin({
    props: {
      handleDOMEvents: {
        mouseover: (view, event) => {
          try {
            handleMouseOver(view, event)
          } catch (error) {
            // ignore error
          }
        },
        mouseout: (view, event) => {
          try {
            handleMouseOut(view, event)
          } catch (error) {
            // ignore error
          }
        },
      },
    },
  })

  return addPlugin({ plugins: [plugin] })
}
