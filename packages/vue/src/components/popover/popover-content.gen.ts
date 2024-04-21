import { defaultPopoverContentProps, type PopoverContentProps } from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverContent = createComponent<PopoverContentProps>('prosekit-popover-content', 'PopoverContent', defaultPopoverContentProps)
