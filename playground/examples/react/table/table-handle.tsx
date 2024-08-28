import { TableHandleRoot } from 'prosekit/react/table-handle'

import { TableColumnHandle } from './table-column-handle'
import { TableRowHandle } from './table-row-handle'

export function TableHandle() {
  return (
    <TableHandleRoot className="contents">
      <TableColumnHandle />
      <TableRowHandle />
    </TableHandleRoot>
  )
}
