import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultPopoverRootProps, type PopoverRootProps } from './props'
import { usePopoverRoot } from './state'

class PopoverRootElement extends ElementBuilder<PopoverRootProps>(usePopoverRoot, defaultPopoverRootProps) {}

defineCustomElement('prosekit-popover-root', PopoverRootElement)

export { PopoverRootElement }
