import { defaultPopoverContentProps, type PopoverContentProps } from '@prosekit/primitives/popover'

import { createComponent } from '../create-component'

export const PopoverContent = createComponent<PopoverContentProps>('prosekit-popover-content', 'PopoverContent', defaultPopoverContentProps)
