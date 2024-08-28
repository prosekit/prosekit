import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'
import { CellSelection } from 'prosemirror-tables'

import { tableCellPopoverContext } from '../context'

import type { TableCellPopoverTriggerProps } from './props'

export function useTableCellPopoverTrigger(
  host: ConnectableElement,
  state: SignalState<TableCellPopoverTriggerProps>,
) {
  useMenuTrigger(host)

  const context = tableCellPopoverContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const { cellAxis, cellSelection } = context.get()
    const editor = state.editor.get()
    if (!cellAxis || !editor) return
    const { view } = editor
    const { $cell } = cellAxis
    if (!cellSelection) {
      view.dispatch(view.state.tr.setSelection(new CellSelection($cell)))
    } else {
      const node = editor.state.doc.nodeAt($cell.pos)
      let nodeInSelection = false

      cellSelection.forEachCell((cellNode) => {
        if (node === cellNode) nodeInSelection = true
      })
      if (!nodeInSelection) {
        view.dispatch(view.state.tr.setSelection(new CellSelection($cell)))
      }
    }
  })
}
