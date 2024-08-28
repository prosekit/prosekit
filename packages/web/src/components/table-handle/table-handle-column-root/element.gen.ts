import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableColumnPopoverRootProps, type TableColumnPopoverRootProps } from './props'
import { useTableColumnPopoverRoot } from './state'

class TableColumnPopoverRootElement extends ElementBuilder<TableColumnPopoverRootProps>(useTableColumnPopoverRoot, defaultTableColumnPopoverRootProps) {}

defineCustomElement('prosekit-table-column-popover-root', TableColumnPopoverRootElement)

export { TableColumnPopoverRootElement }
