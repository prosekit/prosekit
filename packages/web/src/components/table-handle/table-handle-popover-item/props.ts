import type { MenuItemProps } from '@aria-ui/menu'
import { defaultMenuItemProps } from '@aria-ui/menu'

export interface TableHandlePopoverItemProps extends MenuItemProps {
  disabled?: boolean
}

export const defaultTableHandlePopoverItemProps = Object.freeze({
  ...defaultMenuItemProps,
  disabled: false,
} satisfies TableHandlePopoverItemProps)
