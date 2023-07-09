import type { Menu } from '../elements/menu'

export function isMenu(element: Element | null): element is Menu {
  return (
    element?.tagName?.toLowerCase() === 'prosekit-menu' ||
    ['menu'].includes(element?.getAttribute('role') ?? '')
  )
}
