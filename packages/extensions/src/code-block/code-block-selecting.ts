import { addPlugin } from '@prosekit/core'
import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'
import { ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

export function addCodeBlockSelection(options: {
  onHover: (options: { pos: number; dom: HTMLElement }) => void
  onLeave: () => void
}) {
  let hovering = false

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

  const plugin = new ProseMirrorPlugin<PluginState>({
    state: {
      init: (): PluginState => {
        return null
      },
      apply: (tr, prevValue): PluginState => {
        const { $from, $to } = tr.selection
        let nextValue: PluginState = null
        if ($from.sameParent($to) && isCodeBlock($from.parent)) {
          nextValue = $from.before()
        }

        if (prevValue !== nextValue) {
          if (nextValue == null) {
            onHover({ ...node, dom: enteredTarget })
          }
        }

        return nextValue

        if (nextValue == null) {
        }
      },
    },
  })

  return addPlugin({ plugins: [plugin] })
}

type PluginState = number | null

function findCodeBlock(
  $pos: ResolvedPos,
): { pos: number; node: ProseMirrorNode } | null {
  for (let d = $pos.depth; d >= 0; d--) {
    const node = $pos.node(d)
    if (node.type.spec.code && node.isTextblock) {
      return { node, pos: $pos.before(d) }
    }
  }
  return null
}

function isCodeBlock(node: ProseMirrorNode): boolean {
  return !!(node.type.spec.code && node.isTextblock)
}
