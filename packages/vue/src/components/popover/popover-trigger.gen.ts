import { defaultPopoverTriggerProps, type PopoverTriggerProps } from '@prosekit/primitives/popover'

import { createComponent } from '../create-component'

export const PopoverTrigger = createComponent<PopoverTriggerProps>('prosekit-popover-trigger', 'PopoverTrigger', defaultPopoverTriggerProps)
