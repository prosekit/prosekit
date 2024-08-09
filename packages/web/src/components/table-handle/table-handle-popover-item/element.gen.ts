import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableHandlePopoverItemProps, type TableHandlePopoverItemProps } from './props'
import { useTableHandlePopoverItem } from './state'

class TableHandlePopoverItemElement extends ElementBuilder<TableHandlePopoverItemProps>(useTableHandlePopoverItem, defaultTableHandlePopoverItemProps) {}

defineCustomElement('prosekit-table-handle-popover-item', TableHandlePopoverItemElement)

export { TableHandlePopoverItemElement }
