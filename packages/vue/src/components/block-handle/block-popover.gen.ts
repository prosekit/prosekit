import { defaultBlockPopoverProps, type BlockPopoverProps } from '@prosekit/primitives/block-handle'

import { createComponent } from '../create-component'

export const BlockPopover = createComponent<BlockPopoverProps>('prosekit-block-popover', 'BlockPopover', defaultBlockPopoverProps)
