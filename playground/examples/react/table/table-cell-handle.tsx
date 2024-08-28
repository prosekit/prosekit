import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableCellPopoverRoot,
  TableCellPopoverTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableCellHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableCellPopoverRoot className={Themes.TABLE_CELL_HANDLE}>
      <TableCellPopoverTrigger>
        <div className={Themes.ICON_TABLE_CELL_HANDLE}></div>
      </TableCellPopoverTrigger>
      <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={() => editor.commands.clearTableCellContent()}
          disabled={!editor.commands.clearTableCellContent.canExec()}
        >
          <div>clear cell content</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={editor.commands.mergeTableCells}
          disabled={!editor.commands.mergeTableCells.canExec()}
        >
          <div>merge cells</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={editor.commands.splitTableCell}
          disabled={!editor.commands.splitTableCell.canExec()}
        >
          <div>split cell</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={() => editor.commands.selectTableColumn()}
        >
          <div>select column</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={() => editor.commands.selectTableRow()}
        >
          <div>select row</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={(table) => editor.commands.selectTable({ table })}
        >
          <div>select entire table</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={editor.commands.deleteTable}
        >
          <div>remove entire table</div>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableCellPopoverRoot>
  )
}
