import type { Component, JSX } from 'solid-js'
import h from 'solid-js/h'

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  defaultProps: Props,
): Component<Partial<Props> & JSX.HTMLAttributes<CustomElement>> {
  const propertyNames = Object.keys(defaultProps)

  const Component = (props: Record<string, unknown>) => {
    const p: Record<string, () => unknown> = {}

    for (const key of Object.keys(props)) {
      p[propertyNames.includes(key) ? 'prop:' + key : key] = (): unknown =>
        props[key] as unknown
    }

    return h(tagName, p)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Component as any
}
