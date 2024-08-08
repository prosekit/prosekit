import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableCellPopoverContentProps, type TableCellPopoverContentProps } from './props'
import { useTableCellPopoverContent } from './state'

class TableCellPopoverContentElement extends ElementBuilder<TableCellPopoverContentProps>(useTableCellPopoverContent, defaultTableCellPopoverContentProps) {}

defineCustomElement('prosekit-table-cell-popover-content', TableCellPopoverContentElement)

export { TableCellPopoverContentElement }
