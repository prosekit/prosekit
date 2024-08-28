import { defaultMenuContentProps, type MenuContentProps } from '@aria-ui/menu'
import type { Editor } from '@prosekit/core'

export interface TableHandlePopoverContentProps
  extends Omit<MenuContentProps, 'placement' | 'offset'> {
  /**
   * @default 'bottom-start'
   */
  placement: MenuContentProps['placement']

  /**
   * @default {mainAxis: -4, crossAxis: 4}
   */
  offset: MenuContentProps['offset']

  editor: Editor | null
}

export const defaultTableHandlePopoverContentProps = Object.freeze({
  ...defaultMenuContentProps,
  placement: 'bottom-start',
  offset: { mainAxis: -4, crossAxis: 4 },
  editor: null,
} satisfies TableHandlePopoverContentProps)
