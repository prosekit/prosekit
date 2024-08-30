import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultBlockHandlePopoverProps, type BlockHandlePopoverProps } from './props'
import { useBlockHandlePopover } from './state'

class BlockHandlePopoverElement extends ElementBuilder<BlockHandlePopoverProps>(useBlockHandlePopover, defaultBlockHandlePopoverProps) {}

defineCustomElement('prosekit-block-handle-popover', BlockHandlePopoverElement)

export { BlockHandlePopoverElement }
