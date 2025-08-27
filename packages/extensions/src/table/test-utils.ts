import type {
  Command,
  Selection,
} from '@prosekit/pm/state'
import { CellSelection } from 'prosemirror-tables'

import { isCellSelection } from './table-utils'

// Helper to create a cell selection between two positions
export function setCellSelection(from: number, to: number): Command {
  const command: Command = (state, dispatch) => {
    const selection = CellSelection.create(state.doc, from, to)
    dispatch?.(state.tr.setSelection(selection))
    return true
  }
  return command
}

export function inspectSelectedCells(selection: Selection): string[] {
  if (isCellSelection(selection)) {
    const cells: string[] = []
    selection.forEachCell((node) => {
      cells.push(node.textContent)
    })
    return cells
  }
  return []
}
