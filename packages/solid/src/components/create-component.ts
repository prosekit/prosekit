import type { Component, JSX } from 'solid-js'
import h from 'solid-js/h'

import { useEditorContext } from '../contexts/editor-context'

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  propNames: string[],
  eventNames: string[],
): Component<Partial<Props> & JSX.HTMLAttributes<CustomElement>> {
  const hasEditor = propNames.includes('editor')
  const lowerCaseEventNames = eventNames.map((name) => name.toLowerCase())

  const Component = (props: Record<string, unknown>) => {
    const properties: Record<string, () => unknown> = {}
    const eventHandlers: Record<string, () => (event: unknown) => void> = {}

    for (const key of Object.keys(props)) {
      if (propNames.includes(key)) {
        properties['prop:' + key] = () => props[key]
      } else if (
        key.startsWith('on') &&
        lowerCaseEventNames.includes(key.slice(2).toLowerCase())
      ) {
        eventHandlers[key.slice(2).toLowerCase()] = () =>
          props[key] as (event: unknown) => void
      } else {
        properties[key] = () => props[key]
      }
    }

    const editor = useEditorContext()

    if (hasEditor && editor) {
      properties['prop:editor'] = () => props['editor'] || editor
    }

    for (const eventName of eventNames) {
      properties['on:' + eventName] = () => (event: Event) => {
        eventHandlers[eventName.toLowerCase()]?.()?.(event)
      }
    }

    return h(tagName, properties)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Component as any
}
