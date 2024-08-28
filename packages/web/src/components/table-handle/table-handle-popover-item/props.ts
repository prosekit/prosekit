import { type MenuItemProps, defaultMenuItemProps } from '@aria-ui/menu'

export interface TableHandlePopoverItemProps extends MenuItemProps {
  disabled?: boolean
}

export const defaultTableHandlePopoverItemProps = Object.freeze({
  ...defaultMenuItemProps,
  disabled: false,
} satisfies TableHandlePopoverItemProps)
