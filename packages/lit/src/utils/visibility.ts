export function isVisibleElement(element: HTMLElement): boolean {
  return !element.hidden
}

export function isHiddenElement(element: HTMLElement): boolean {
  return element.hidden
}

export function createVisibilityFilter(visible: boolean | null | undefined) {
  if (visible === true) return isVisibleElement
  if (visible === false) return isHiddenElement
  return () => true
}
