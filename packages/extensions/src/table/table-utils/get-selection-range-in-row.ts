
import type { Transaction } from '@prosekit/pm/state';

import { getCellsInColumn } from './get-cells-in-column';
import { getCellsInRow } from './get-cells-in-row';
import type { CellSelectionRange } from './types';

/**
 * Returns a range of rectangular selection spanning all merged cells around a row at index `rowIndex`.
 * 
 * @internal
 */
export function getSelectionRangeInRow (startRowIndex: number, endRowIndex: number = startRowIndex) {
  return (tr: Transaction): CellSelectionRange | undefined => {
		let startIndex = startRowIndex;
		let endIndex = endRowIndex;

		// looking for selection start row (startIndex)
		for (let i = startRowIndex; i >= 0; i--) {
			const cells = getCellsInRow(i)(tr.selection);
			if (cells) {
				cells.forEach((cell) => {
					const maybeEndIndex = cell.node.attrs.rowspan + i - 1;
					if (maybeEndIndex >= startIndex) {
						startIndex = i;
					}
					if (maybeEndIndex > endIndex) {
						endIndex = maybeEndIndex;
					}
				});
			}
		}
		// looking for selection end row (endIndex)
		for (let i = startRowIndex; i <= endIndex; i++) {
			const cells = getCellsInRow(i)(tr.selection);
			if (cells) {
				cells.forEach((cell) => {
					const maybeEndIndex = cell.node.attrs.rowspan + i - 1;
					if (cell.node.attrs.rowspan > 1 && maybeEndIndex > endIndex) {
						endIndex = maybeEndIndex;
					}
				});
			}
		}

		// filter out rows without cells (where all columns have rowspan > 1 in the same row)
		const indexes = [];
		for (let i = startIndex; i <= endIndex; i++) {
			const maybeCells = getCellsInRow(i)(tr.selection);
			if (maybeCells && maybeCells.length > 0) {
				indexes.push(i);
			}
		}
		startIndex = indexes[0];
		endIndex = indexes[indexes.length - 1];

		const firstSelectedRowCells = getCellsInRow(startIndex)(tr.selection);
		const firstColumnCells = getCellsInColumn(0)(tr.selection);
		if (!firstSelectedRowCells || !firstColumnCells) {
			return;
		}

		const $anchor = tr.doc.resolve(firstSelectedRowCells[firstSelectedRowCells.length - 1].pos);

		let headCell;
		for (let i = endIndex; i >= startIndex; i--) {
			const rowCells = getCellsInRow(i)(tr.selection);
			if (rowCells && rowCells.length > 0) {
				for (let j = firstColumnCells.length - 1; j >= 0; j--) {
					if (firstColumnCells[j].pos === rowCells[0].pos) {
						headCell = rowCells[0];
						break;
					}
				}
				if (headCell) {
					break;
				}
			}
		}
		if (!headCell) {
			return;
		}

		const $head = tr.doc.resolve(headCell.pos);
		return { $anchor, $head, indexes };
	}
}
