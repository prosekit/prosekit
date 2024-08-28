import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableHandleColumnRootProps, type TableHandleColumnRootProps } from './props'
import { useTableHandleColumnRoot } from './state'

class TableHandleColumnRootElement extends ElementBuilder<TableHandleColumnRootProps>(useTableHandleColumnRoot, defaultTableHandleColumnRootProps) {}

defineCustomElement('prosekit-table-handle-column-root', TableHandleColumnRootElement)

export { TableHandleColumnRootElement }
