import {
  findParentNode,
  type FindParentNodeResult,
} from '@prosekit/core'
import type {
  ProseMirrorNode,
  ResolvedPos,
} from '@prosekit/pm/model'
import type { Selection } from '@prosekit/pm/state'
import {
  cellAround,
  cellNear,
  CellSelection,
  inSameTable,
} from 'prosemirror-tables'

/**
 * Checks if the given object is a `CellSelection` instance.
 *
 * @public
 */
export function isCellSelection(value: unknown): value is CellSelection {
  return value instanceof CellSelection
}

/**
 * Find the closest table node.
 *
 * @internal
 */
export function findTable($pos: ResolvedPos): FindParentNodeResult | undefined {
  return findParentNode((node) => node.type.spec.tableRole === 'table', $pos)
}

/**
 * Try to find the anchor and head cell in the same table by using the given
 * anchor and head as hit points, or fallback to the selection's anchor and
 * head.
 *
 * @internal
 */
export function findCellRange(
  selection: Selection,
  anchorHit?: number,
  headHit?: number,
): [ResolvedPos, ResolvedPos] | undefined {
  if (anchorHit == null && headHit == null && isCellSelection(selection)) {
    return [selection.$anchorCell, selection.$headCell]
  }

  const anchor: number = anchorHit ?? headHit ?? selection.anchor
  const head: number = headHit ?? anchorHit ?? selection.head

  const doc = selection.$head.doc

  const $anchorCell = findCellPos(doc, anchor)
  const $headCell = findCellPos(doc, head)

  if ($anchorCell && $headCell && inSameTable($anchorCell, $headCell)) {
    return [$anchorCell, $headCell]
  }
}

/**
 * Try to find a resolved pos of a cell by using the given pos as a hit point.
 *
 * @internal
 */
export function findCellPos(
  doc: ProseMirrorNode,
  pos: number,
): ResolvedPos | undefined {
  const $pos = doc.resolve(pos)
  return cellAround($pos) || cellNear($pos)
}
