import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultInlinePopoverProps, type InlinePopoverProps } from './props'
import { useInlinePopover } from './state'

class InlinePopoverElement extends ElementMixin<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps) {}

defineCustomElement('prosekit-inline-popover', InlinePopoverElement)

export { InlinePopoverElement }
