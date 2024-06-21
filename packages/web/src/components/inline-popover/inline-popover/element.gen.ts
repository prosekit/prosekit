import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultInlinePopoverProps, type InlinePopoverProps } from './props'
import { useInlinePopover } from './state'

class InlinePopoverElement extends ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps) {}

defineCustomElement('prosekit-inline-popover', InlinePopoverElement)

export { InlinePopoverElement }
