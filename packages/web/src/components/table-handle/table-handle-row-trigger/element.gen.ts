import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableRowPopoverTriggerProps, type TableRowPopoverTriggerProps } from './props'
import { useTableRowPopoverTrigger } from './state'

class TableRowPopoverTriggerElement extends ElementBuilder<TableRowPopoverTriggerProps>(useTableRowPopoverTrigger, defaultTableRowPopoverTriggerProps) {}

defineCustomElement('prosekit-table-row-popover-trigger', TableRowPopoverTriggerElement)

export { TableRowPopoverTriggerElement }
