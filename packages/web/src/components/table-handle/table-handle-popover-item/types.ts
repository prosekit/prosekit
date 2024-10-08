import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import {
  menuItemEvents,
  type MenuItemEvents,
  type MenuItemProps,
  menuItemProps,
} from '@aria-ui/menu'

export interface TableHandlePopoverItemProps extends MenuItemProps {}

export const tableHandlePopoverItemProps: PropDeclarations<TableHandlePopoverItemProps> =
  {
    ...menuItemProps,
  }

export interface TableHandlePopoverItemEvents extends MenuItemEvents {}

export const tableHandlePopoverItemEvents: EventDeclarations<TableHandlePopoverItemEvents> =
  {
    ...menuItemEvents,
  }
