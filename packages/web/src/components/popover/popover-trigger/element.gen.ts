import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultPopoverTriggerProps, type PopoverTriggerProps } from './props'
import { usePopoverTrigger } from './state'

class PopoverTriggerElement extends ElementBuilder<PopoverTriggerProps>(usePopoverTrigger, defaultPopoverTriggerProps) {}

defineCustomElement('prosekit-popover-trigger', PopoverTriggerElement)

export { PopoverTriggerElement }
