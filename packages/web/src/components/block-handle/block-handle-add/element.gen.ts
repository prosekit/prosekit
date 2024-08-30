import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultBlockHandleAddProps, type BlockHandleAddProps } from './props'
import { useBlockHandleAdd } from './state'

class BlockHandleAddElement extends ElementBuilder<BlockHandleAddProps>(useBlockHandleAdd, defaultBlockHandleAddProps) {}

defineCustomElement('prosekit-block-handle-add', BlockHandleAddElement)

export { BlockHandleAddElement }
