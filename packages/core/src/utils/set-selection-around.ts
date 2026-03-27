import { TextSelection, type Transaction } from '@prosekit/pm/state'

export function setSelectionAround(tr: Transaction, pos: number): void {
  const docSize = tr.doc.content.size
  const $pos = tr.doc.resolve(pos > docSize ? docSize : pos < 0 ? 0 : pos)
  const selection = TextSelection.between($pos, $pos)
  tr.setSelection(selection)
}
