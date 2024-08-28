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
          onSelect={editor.commands.addTableColumnBefore}
          disabled={!editor.commands.addTableColumnBefore.canExec()}
        >
          <div>Insert Left</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onSelect={editor.commands.addTableColumnAfter}
          disabled={!editor.commands.addTableColumnAfter.canExec()}
        >
          <div>Insert Right</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onSelect={editor.commands.deleteCellSelection}
          disabled={!editor.commands.deleteCellSelection.canExec()}
        >
          <div>Clear Contents</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onSelect={editor.commands.deleteTableColumn}
          disabled={!editor.commands.deleteTableColumn.canExec()}
        >
          <div>Delete Column</div>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableColumnPopoverRoot>
  )
}
