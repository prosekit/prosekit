import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableCellPopoverTriggerProps, type TableCellPopoverTriggerProps } from './props'
import { useTableCellPopoverTrigger } from './state'

class TableCellPopoverTriggerElement extends ElementBuilder<TableCellPopoverTriggerProps>(useTableCellPopoverTrigger, defaultTableCellPopoverTriggerProps) {}

defineCustomElement('prosekit-table-cell-popover-trigger', TableCellPopoverTriggerElement)

export { TableCellPopoverTriggerElement }
