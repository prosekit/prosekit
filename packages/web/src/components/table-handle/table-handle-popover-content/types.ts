import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import { menuContentEvents, menuContentProps, type MenuContentEvents, type MenuContentProps } from '@aria-ui/menu/elements'
import type { Editor } from '@prosekit/core'

export interface TableHandlePopoverContentProps extends Omit<MenuContentProps, 'placement' | 'offset'> {
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

/** @internal */
export const tableHandlePopoverContentProps: PropDeclarations<TableHandlePopoverContentProps> = Object.freeze({
  ...menuContentProps,
  placement: { default: 'right-start' },
  offset: { default: { mainAxis: -4, crossAxis: 4 } },
  editor: { default: null },
})

export interface TableHandlePopoverContentEvents extends MenuContentEvents {}

/** @internal */
export const tableHandlePopoverContentEvents: EventDeclarations<TableHandlePopoverContentEvents> = Object.freeze({
  ...menuContentEvents,
})
