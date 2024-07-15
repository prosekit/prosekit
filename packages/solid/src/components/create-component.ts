import type { Component, JSX } from 'solid-js'
import h from 'solid-js/h'

import { useEditorContext } from '../contexts/editor-context'

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  defaultProps: Props,
): Component<Partial<Props> & JSX.HTMLAttributes<CustomElement>> {
  const propertyNames = Object.keys(defaultProps)

  const hasEditor = Object.hasOwn(defaultProps, 'editor')

  const Component = (props: Record<string, unknown>) => {
    const properties: Record<string, () => unknown> = {}

    for (const key of Object.keys(props)) {
      properties[propertyNames.includes(key) ? 'prop:' + key : key] =
        (): unknown => props[key] as unknown
    }

    const editor = useEditorContext()

    if (hasEditor && editor) {
      properties['prop:editor'] = () => props['editor'] || editor
    }

    return h(tagName, properties)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Component as any
}
