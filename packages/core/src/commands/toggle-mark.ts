import { type Attrs, MarkType, ProseMirrorNode } from '@prosekit/pm/model'
import { SelectionRange, TextSelection, type Command } from '@prosekit/pm/state'

import { type CommandCreator } from '../types/command'
import { getMarkType } from '../utils/get-mark-type'

function markApplies(
  doc: ProseMirrorNode,
  ranges: readonly SelectionRange[],
  type: MarkType,
) {
  for (const { $from, $to } of ranges) {
    let can =
      $from.depth == 0
        ? doc.inlineContent && doc.type.allowsMarkType(type)
        : false
    doc.nodesBetween($from.pos, $to.pos, (node) => {
      if (can) return false
      can = node.inlineContent && node.type.allowsMarkType(type)
    })
    if (can) return true
  }
  return false
}

/// Create a command function that toggles the given mark with the
/// given attributes. Will return `false` when the current selection
/// doesn't support that mark. This will remove the mark if any marks
/// of that type exist in the selection, or add it otherwise. If the
/// selection is empty, this applies to the [stored
/// marks](#state.EditorState.storedMarks) instead of a range of the
/// document.
export function baseToggleMark(
  markType: MarkType,
  attrs: Attrs | null = null,
  options?: {
    /// Controls whether, when part of the selected range has the mark
    /// already and part doesn't, the mark is removed (`true`, the
    /// default) or added (`false`).
    removeWhenPresent: boolean
  },
): Command {
  const removeWhenPresent = (options && options.removeWhenPresent) !== false
  return function (state, dispatch) {
    const { empty, $cursor, ranges } = state.selection as TextSelection
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType))
      return false
    if (dispatch) {
      if ($cursor) {
        if (markType.isInSet(state.storedMarks || $cursor.marks()))
          dispatch(state.tr.removeStoredMark(markType))
        else dispatch(state.tr.addStoredMark(markType.create(attrs)))
      } else {
        let add
        const tr = state.tr
        if (removeWhenPresent) {
          add = !ranges.some((r) =>
            state.doc.rangeHasMark(r.$from.pos, r.$to.pos, markType),
          )
        } else {
          add = !ranges.every((r) => {
            let missing = false
            tr.doc.nodesBetween(r.$from.pos, r.$to.pos, (node, pos, parent) => {
              if (missing) return false
              missing =
                !markType.isInSet(node.marks) &&
                !!parent &&
                parent.type.allowsMarkType(markType) &&
                !(
                  node.isText &&
                  /^\s*$/.test(
                    node.textBetween(
                      Math.max(0, r.$from.pos - pos),
                      Math.min(node.nodeSize, r.$to.pos - pos),
                    ),
                  )
                )
            })
            return !missing
          })
        }
        for (const { $from, $to } of ranges) {
          if (!add) {
            tr.removeMark($from.pos, $to.pos, markType)
          } else {
            let from = $from.pos,
              to = $to.pos
            const start = $from.nodeAfter,
              end = $to.nodeBefore
            const spaceStart =
              start && start.isText ? /^\s*/.exec(start.text!)![0].length : 0
            const spaceEnd =
              end && end.isText ? /\s*$/.exec(end.text!)![0].length : 0
            if (from + spaceStart < to) {
              from += spaceStart
              to -= spaceEnd
            }
            tr.addMark(from, to, markType.create(attrs))
          }
        }
        dispatch(tr.scrollIntoView())
      }
    }
    return true
  }
}

/**
 * Returns a command that toggles the given mark with the given attributes.
 *
 * @public
 */
export function toggleMark({
  type,
  attrs,
}: {
  type: string | MarkType
  attrs?: Attrs | null
}): Command {
  return (state, dispatch, view) => {
    return baseToggleMark(getMarkType(state.schema, type), attrs, {
      removeWhenPresent: false,
    })(state, dispatch, view)
  }
}

toggleMark satisfies CommandCreator
