import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableHandleRowTriggerProps, type TableHandleRowTriggerProps } from './props'
import { useTableHandleRowTrigger } from './state'

class TableHandleRowTriggerElement extends ElementBuilder<TableHandleRowTriggerProps>(useTableHandleRowTrigger, defaultTableHandleRowTriggerProps) {}

defineCustomElement('prosekit-table-handle-row-trigger', TableHandleRowTriggerElement)

export { TableHandleRowTriggerElement }
