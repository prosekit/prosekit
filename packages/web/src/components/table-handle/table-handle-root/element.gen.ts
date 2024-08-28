import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultTableHandleRootProps, type TableHandleRootProps } from './props'
import { useTableHandleRoot } from './state'

class TableHandleRootElement extends ElementBuilder<TableHandleRootProps>(useTableHandleRoot, defaultTableHandleRootProps) {}

defineCustomElement('prosekit-table-handle-root', TableHandleRootElement)

export { TableHandleRootElement }
