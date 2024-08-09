import { defaultMenuContentProps, type MenuContentProps } from '@aria-ui/menu'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface TableCellPopoverContentProps
  extends Omit<MenuContentProps, 'placement'> {
  /**
   * @default right
   */
  placement: Placement

  editor: Editor | null
}

export const defaultTableCellPopoverContentProps = Object.freeze({
  ...defaultMenuContentProps,
  placement: 'right',
  editor: null
})
