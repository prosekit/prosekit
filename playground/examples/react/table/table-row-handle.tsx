import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableRowPopoverRoot,
  TableRowPopoverTrigger,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableRowHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableRowPopoverRoot className={Themes.TABLE_ROW_HANDLE}>
      <TableRowPopoverTrigger>
        <div className={Themes.ICON_DRAG_HANDLE}></div>
      </TableRowPopoverTrigger>
      <TableHandlePopoverContent className={Themes.TABLE_HANDLE_MENU}>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onSelect={ editor.commands.addTableRowAbove}
          disabled={!editor.commands.addTableRowAbove.canExec()}
        >
          <div>Insert Above</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onSelect={ editor.commands.addTableRowBelow}
          disabled={!editor.commands.addTableRowBelow.canExec()}
        >
          <div>add row below</div>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onSelect={ 
            editor.commands.deleteCellSelection
          }
          disabled={!editor.commands.deleteCellSelection.canExec()}
        >
          <div>Clear Contents</div>
        </TableHandlePopoverItem>{' '}
        <TableHandlePopoverItem
          className={Themes.TABLE_CELL_MENU_ITEM}
          onSelect={editor.commands.deleteTableRow}
          disabled={!editor.commands.deleteTableRow.canExec()}
        >
          <div>Delete Row</div>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableRowPopoverRoot>
  )
}
