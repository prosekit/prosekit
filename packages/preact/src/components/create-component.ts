import { createElement, type FunctionComponent, type JSX } from 'preact'

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  displayName: string,
): FunctionComponent<Partial<Props> & JSX.HTMLAttributes<CustomElement>> {
  const Component = (props: Record<string, unknown>) => {
    return createElement(tagName, props)
  }

  Component.displayName = displayName

  return Component
}
