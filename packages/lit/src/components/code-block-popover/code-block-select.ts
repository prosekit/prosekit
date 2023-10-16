import { definePlugin } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

/**
 * Returns a ProseKit extension that call `onSelect` when the text selection is
 * insert into a code block, and `onDismiss` when it is not.
 */
export function defineCodeBlockSelect(options: {
  onSelect: (info: {
    pos: number
    node: ProseMirrorNode
    dom: HTMLElement
  }) => void
  onDismiss: () => void
}) {
  let prevState: State = null

  const plugin = new ProseMirrorPlugin({
    view: () => {
      return {
        update: (view) => {
          const currState = getState(view)
          if (
            prevState?.pos !== currState?.pos ||
            prevState?.dom !== currState?.dom
          ) {
            if (currState) {
              options.onSelect(currState)
            } else {
              options.onDismiss()
            }
          }

          prevState = currState
        },
      }
    },
  })

  return definePlugin(plugin)
}

type State = {
  pos: number
  node: ProseMirrorNode
  dom: HTMLElement
} | null

function getState(view: EditorView): State {
  const { $from, $to } = view.state.selection
  if ($from.sameParent($to)) {
    const node = $from.parent
    if (isCodeBlock(node)) {
      const pos = $from.before()
      const dom = view.nodeDOM(pos) as HTMLElement | null
      if (dom) {
        return { pos, node, dom }
      }
    }
  }
  return null
}

function isCodeBlock(node: ProseMirrorNode): boolean | undefined {
  return node.type.spec.code && node.isTextblock
}
