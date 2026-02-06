import { CellSelection, findCellPos, findCellRange, findTable } from 'prosemirror-tables'

export { findCellPos, findCellRange, findTable }

/**
 * Checks if the given object is a `CellSelection` instance.
 *
 * @public
 */
export function isCellSelection(value: unknown): value is CellSelection {
  return value instanceof CellSelection
}
