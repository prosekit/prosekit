import type { MenuItem } from '../elements/menu-item'

export function isMenuItem(element: Element | null): element is MenuItem {
  return (
    element?.tagName?.toLowerCase() === 'prosekit-menu-item' ||
    ['menuitem', 'menuitemcheckbox', 'menuitemradio'].includes(
      element?.getAttribute('role') ?? '',
    )
  )
}
