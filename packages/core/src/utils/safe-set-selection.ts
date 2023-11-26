import { Transaction, TextSelection } from '@prosekit/pm/state'

export function safeSetSelection(tr: Transaction, pos: number) {
  let docSize = tr.doc.content.size

  if (pos > docSize) {
    pos = docSize
  } else if (pos < 0) {
    pos = 0
  }

  const $pos = tr.doc.resolve(pos)
  const selection = TextSelection.near($pos)
  tr.setSelection(selection)
}
