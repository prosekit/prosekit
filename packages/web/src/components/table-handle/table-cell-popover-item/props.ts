import type { MenuItemProps } from '@aria-ui/menu'
import { defaultMenuItemProps } from '@aria-ui/menu'

export interface TableCellPopoverItemProps extends MenuItemProps {
  disabled?: boolean
}

export const defaultTableCellPopoverItemProps = Object.freeze({
  ...defaultMenuItemProps,
  disabled: false,
} satisfies TableCellPopoverItemProps)
