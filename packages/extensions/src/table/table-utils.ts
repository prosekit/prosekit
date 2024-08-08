import { CellSelection } from "prosemirror-tables";

export function isCellSelection(value: unknown): value is CellSelection {
  return typeof value === 'object' && value instanceof CellSelection
}
