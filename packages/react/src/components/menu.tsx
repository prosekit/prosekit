/**
 * @module @prosekit/react/components/menu
 */

import { Editor } from '@prosekit/core'
import { Menu as MenuElement } from '@prosekit/lit/elements/menu'
import { ComponentType, ForwardedRef, ReactNode } from 'react'

import { Menu as MenuImpl } from './menu.gen'

export const Menu: ComponentType<{
  editor?: Editor
  ref?: ForwardedRef<MenuElement>
  children?: ReactNode | undefined
  className?: string
}> = MenuImpl
