import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableHandleColumnTriggerProps, type TableHandleColumnTriggerProps } from './props'
import { useTableHandleColumnTrigger } from './state'

class TableHandleColumnTriggerElement extends ElementBuilder<TableHandleColumnTriggerProps>(useTableHandleColumnTrigger, defaultTableHandleColumnTriggerProps) {}

defineCustomElement('prosekit-table-handle-column-trigger', TableHandleColumnTriggerElement)

export { TableHandleColumnTriggerElement }
