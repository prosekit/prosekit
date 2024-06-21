import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultPopoverContentProps, type PopoverContentProps } from './props'
import { usePopoverContent } from './state'

class PopoverContentElement extends ElementBuilder<PopoverContentProps>(usePopoverContent, defaultPopoverContentProps) {}

defineCustomElement('prosekit-popover-content', PopoverContentElement)

export { PopoverContentElement }
