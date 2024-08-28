import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableColumnPopoverRoot,
  TableColumnPopoverTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableColumnHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableColumnPopoverRoot className={Themes.TABLE_COLUMN_HANDLE}>
      <TableColumnPopoverTrigger>
        <div className={Themes.ICON_TABLE_COLUMN_HANDLE}></div>
      </TableColumnPopoverTrigger>
      <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          command={() => editor.commands.clearTableCellContent()}
          disabled={!editor.commands.clearTableCellContent.canApply()}
        >
          <div>clear column content</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={editor.commands.deleteTableColumn}
          disabled={!editor.commands.deleteTableColumn.canApply()}
        >
          <div>remove column </div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={editor.commands.addTableColumnBefore}
          disabled={!editor.commands.addTableColumnBefore.canApply()}
        >
          <div>add column before</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onClick={editor.commands.addTableColumnAfter}
          disabled={!editor.commands.addTableColumnAfter.canApply()}
        >
          <div>add column after</div>
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
    </TableColumnPopoverRoot>
  )
}
