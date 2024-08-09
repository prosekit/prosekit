import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableHandlePopoverContentProps, type TableHandlePopoverContentProps } from './props'
import { useTableHandlePopoverContent } from './state'

class TableHandlePopoverContentElement extends ElementBuilder<TableHandlePopoverContentProps>(useTableHandlePopoverContent, defaultTableHandlePopoverContentProps) {}

defineCustomElement('prosekit-table-handle-popover-content', TableHandlePopoverContentElement)

export { TableHandlePopoverContentElement }
