import type { Command } from '@prosekit/pm/state'
import {
  NodeSelection,
  TextSelection,
} from '@prosekit/pm/state'
import {
  defineCommands,
  findParentNode,
  type Extension,
} from '@prosekit/core'

/**
 * @internal
 */
export type SelectBlockCommandsExtension = Extension<{
  Commands: {
    selectBlock: []
  }
}>

export function defineSelectBlockCommands(): SelectBlockCommandsExtension {
  return defineCommands({
    selectBlock: (): Command => {
      return (state, dispatch) => {
        const { selection } = state
        const { $from } = selection

        const textBlock = findParentNode(
          (node) => node.isTextblock,
          $from,
        )

        let block = textBlock

        if (textBlock) {
          const textBlockDepth = textBlock.depth
          // 从文本块向上查找最近的非文本块祖先，但不越过 doc（depth 0）
          for (let d = textBlockDepth - 1; d > 0; d--) {
            const ancestor = $from.node(d)
            if (ancestor.isBlock && !ancestor.isTextblock) {
              const pos = $from.before(d)
              const start = $from.start(d)
              block = {
                node: ancestor,
                pos,
                start,
                depth: d,
              }
              break
            }
          }
        }

        if (!block) {
          block = findParentNode(
            (node) => node.isBlock && !node.isTextblock,
            $from,
          )
        }

        if (!block) {
          const parent = $from.parent
          if (parent.isBlock) {
            const depth = $from.depth
            const pos = depth === 0 ? 0 : $from.before(depth)
            const start = $from.start(depth)
            block = {
              node: parent,
              pos,
              start,
              depth,
            }
          }
        }

        if (!block) {
          return false
        }

        const { node, start, pos } = block

        if (dispatch) {
          const tr = state.tr

          if (node.isAtom) {
            const nodeSelection = NodeSelection.create(tr.doc, pos)
            tr.setSelection(nodeSelection)
          } else {
            const from = start
            const to = start + node.content.size
            const textSelection = TextSelection.create(tr.doc, from, to)
            tr.setSelection(textSelection)
          }

          tr.scrollIntoView()
          dispatch(tr)
        }

        return true
      }
    },
  })
}

