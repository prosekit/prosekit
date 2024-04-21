import { defaultBlockPopoverProps, type BlockPopoverProps } from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockPopover = createComponent<BlockPopoverProps>('prosekit-block-popover', 'BlockPopover', defaultBlockPopoverProps)
