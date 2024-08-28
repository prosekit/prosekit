import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableCellPopoverRootProps, type TableCellPopoverRootProps } from './props'
import { useTableCellPopoverRoot } from './state'

class TableCellPopoverRootElement extends ElementBuilder<TableCellPopoverRootProps>(useTableCellPopoverRoot, defaultTableCellPopoverRootProps) {}

defineCustomElement('prosekit-table-cell-popover-root', TableCellPopoverRootElement)

export { TableCellPopoverRootElement }
