import { defaultInlinePopoverProps, type InlinePopoverProps } from '@prosekit/web/inline-popover'

import { createComponent } from '../create-component'

export const InlinePopover = createComponent<InlinePopoverProps>('prosekit-inline-popover', 'InlinePopover', defaultInlinePopoverProps)
