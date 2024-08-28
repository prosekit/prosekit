import { type MenuItemProps, defaultMenuItemProps } from '@aria-ui/menu'
import type { FindParentNodeResult } from '@prosekit/core'

import type { CellAxis } from '../context'

export interface TableHandlePopoverItemProps extends MenuItemProps {
  disabled?: boolean
  command?:
    | ((table: FindParentNodeResult, cellAxis?: CellAxis | null) => void)
    | null
}

export const defaultTableHandlePopoverItemProps = Object.freeze({
  ...defaultMenuItemProps,
  disabled: false,
  command: null,
} satisfies TableHandlePopoverItemProps)
