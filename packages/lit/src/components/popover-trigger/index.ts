import { PopoverTriggerElement } from '@aria-ui/popover'

import { defineCustomElement } from '../../utils/define-custom-element'

export { PopoverTriggerElement as PopoverTrigger }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PopoverTriggerProps {}

export { type PopoverTriggerProps }

export const propNames = []

defineCustomElement('prosekit-popover-trigger', PopoverTriggerElement)
