import { ResolvedPos } from '@prosekit/pm/model'
import { EditorState } from '@prosekit/pm/state'

export function defaultIsValid({ state }: { state: EditorState }): boolean {
  return state.selection.empty && !isInsideCode(state.selection.$from)
}

function isInsideCode($pos: ResolvedPos): boolean {
  for (let d = $pos.depth; d > 0; d--) {
    if ($pos.node(d).type.spec.code) {
      return true
    }
  }

  return $pos.marks().some((mark) => mark.type.name === 'code')
}
