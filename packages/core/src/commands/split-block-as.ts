import type { Attrs, NodeType, ProseMirrorNode } from '@prosekit/pm/model'
import {
  AllSelection,
  NodeSelection,
  TextSelection,
  type Command,
} from '@prosekit/pm/state'
import { canSplit } from '@prosekit/pm/transform'

import { defaultBlockAt } from '../utils/default-block-at'

// Copied from https://github.com/prosemirror/prosemirror-commands/blob/2da5f6621ab684b5b3b2a2982b8f91d293d4a582/src/commands.ts#L357
// See also https://discuss.prosemirror.net/t/proposal-add-attributespec-splittable/6436
export function splitBlockAs(
  splitNode?: (
    node: ProseMirrorNode,
    deflt: NodeType | null,
    atEnd: boolean,
  ) => { type: NodeType; attrs?: Attrs } | null,
): Command {
  return (state, dispatch) => {
    const { $from, $to } = state.selection
    if (
      state.selection instanceof NodeSelection &&
      state.selection.node.isBlock
    ) {
      if (!$from.parentOffset || !canSplit(state.doc, $from.pos)) return false
      if (dispatch) dispatch(state.tr.split($from.pos).scrollIntoView())
      return true
    }

    if (!$from.parent.isBlock) return false

    if (dispatch) {
      const atEnd = $to.parentOffset == $to.parent.content.size
      const tr = state.tr
      if (
        state.selection instanceof TextSelection ||
        state.selection instanceof AllSelection
      )
        tr.deleteSelection()
      const deflt =
        $from.depth == 0
          ? null
          : defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)))
      // This line is changed to use $from.parent instead of $to.parent
      const splitType = splitNode && splitNode($from.parent, deflt, atEnd)
      let types = splitType
        ? [splitType]
        : atEnd && deflt
          ? [{ type: deflt }]
          : undefined
      let can = canSplit(tr.doc, tr.mapping.map($from.pos), 1, types)
      if (
        !types &&
        !can &&
        canSplit(
          tr.doc,
          tr.mapping.map($from.pos),
          1,
          deflt ? [{ type: deflt }] : undefined,
        )
      ) {
        if (deflt) types = [{ type: deflt }]
        can = true
      }
      if (can) {
        tr.split(tr.mapping.map($from.pos), 1, types)
        if (!atEnd && !$from.parentOffset && $from.parent.type != deflt) {
          const first = tr.mapping.map($from.before()),
            $first = tr.doc.resolve(first)
          if (
            deflt &&
            $from
              .node(-1)
              .canReplaceWith($first.index(), $first.index() + 1, deflt)
          )
            tr.setNodeMarkup(tr.mapping.map($from.before()), deflt)
        }
      }
      dispatch(tr.scrollIntoView())
    }
    return true
  }
}
