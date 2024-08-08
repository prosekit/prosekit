import { defaultMenuContentProps, type MenuContentProps } from '@aria-ui/menu'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface TableHandlePopoverContentProps
  extends Omit<MenuContentProps, 'placement'> {
  /**
   * @default right
   */
  placement: Placement

  editor: Editor | null
}

export const defaultTableHandlePopoverContentProps = Object.freeze({
  ...defaultMenuContentProps,
  placement: 'right',
  offset: 0,
  editor: null,
} satisfies TableHandlePopoverContentProps)
