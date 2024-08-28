import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableColumnPopoverTriggerProps, type TableColumnPopoverTriggerProps } from './props'
import { useTableColumnPopoverTrigger } from './state'

class TableColumnPopoverTriggerElement extends ElementBuilder<TableColumnPopoverTriggerProps>(useTableColumnPopoverTrigger, defaultTableColumnPopoverTriggerProps) {}

defineCustomElement('prosekit-table-column-popover-trigger', TableColumnPopoverTriggerElement)

export { TableColumnPopoverTriggerElement }
