import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableCellPopoverItemProps, type TableCellPopoverItemProps } from './props'
import { useTableCellPopoverItem } from './state'

class TableCellPopoverItemElement extends ElementBuilder<TableCellPopoverItemProps>(useTableCellPopoverItem, defaultTableCellPopoverItemProps) {}

defineCustomElement('prosekit-table-cell-popover-item', TableCellPopoverItemElement)

export { TableCellPopoverItemElement }
