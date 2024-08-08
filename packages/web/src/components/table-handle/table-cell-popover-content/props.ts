import { defaultMenuContentProps, type MenuContentProps } from '@aria-ui/menu'
import type { Placement } from '@floating-ui/dom'

export interface TableCellPopoverContentProps
  extends Omit<MenuContentProps, 'placement'> {
  /**
   * @default right
   */
  placement: Placement
}

export const defaultTableCellPopoverContentProps = Object.freeze({
  ...defaultMenuContentProps,
  placement: 'right',
})
