import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableRowPopoverRootProps, type TableRowPopoverRootProps } from './props'
import { useTableRowPopoverRoot } from './state'

class TableRowPopoverRootElement extends ElementBuilder<TableRowPopoverRootProps>(useTableRowPopoverRoot, defaultTableRowPopoverRootProps) {}

defineCustomElement('prosekit-table-row-popover-root', TableRowPopoverRootElement)

export { TableRowPopoverRootElement }
