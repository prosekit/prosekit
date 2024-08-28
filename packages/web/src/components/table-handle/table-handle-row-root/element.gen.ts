import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableHandleRowRootProps, type TableHandleRowRootProps } from './props'
import { useTableHandleRowRoot } from './state'

class TableHandleRowRootElement extends ElementBuilder<TableHandleRowRootProps>(useTableHandleRowRoot, defaultTableHandleRowRootProps) {}

defineCustomElement('prosekit-table-handle-row-root', TableHandleRowRootElement)

export { TableHandleRowRootElement }
