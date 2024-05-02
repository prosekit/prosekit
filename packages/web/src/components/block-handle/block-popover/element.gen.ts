import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultBlockPopoverProps, type BlockPopoverProps } from './props'
import { useBlockPopover } from './state'

class BlockPopoverElement extends ElementMixin<BlockPopoverProps>(useBlockPopover, defaultBlockPopoverProps) {}

defineCustomElement('prosekit-block-popover', BlockPopoverElement)

export { BlockPopoverElement }
