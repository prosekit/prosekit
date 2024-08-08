import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableCellPopoverProps, type TableCellPopoverProps } from './props'
import { useTableCellPopover } from './state'

class TableCellPopoverElement extends ElementBuilder<TableCellPopoverProps>(useTableCellPopover, defaultTableCellPopoverProps) {}

defineCustomElement('prosekit-table-cell-popover', TableCellPopoverElement)

export { TableCellPopoverElement }
