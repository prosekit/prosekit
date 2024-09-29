import type { AnyFunction } from '@prosekit/core'
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
  const lowerCaseEventNameMap = Object.fromEntries(
    eventNames.map((name) => [name.toLowerCase(), name]),
  )

  const Component = (props: Record<string, unknown>) => {
    const properties: Record<string, () => unknown> = {}
    const eventHandlers: Record<string, AnyFunction> = {}

    for (const name of Object.keys(props)) {
      if (propNames.includes(name)) {
        properties['prop:' + name] = () => props[name]
        continue
      }

      if (name.startsWith('on') && name.endsWith('Change')) {
        const lowerCaseEventName =
          'update:' + name.slice(2).slice(0, -6).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        if (eventName) {
          eventHandlers['on:' + eventName] = (event: Event) => {
            const handler = props[name] as AnyFunction
            const detail = (event as CustomEvent).detail as unknown
            handler(detail)
          }
          continue
        }
      }

      if (name.startsWith('on')) {
        const lowerCaseEventName = name.slice(2).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        if (eventName) {
          eventHandlers['on:' + eventName] = (event: Event) => {
            const handler = props[name] as AnyFunction
            const detail = (event as CustomEvent).detail as unknown
            handler?.(detail)
          }
          continue
        }
      }

      properties[name] = () => props[name]
    }

    const editor = useEditorContext()

    if (hasEditor && editor) {
      properties['prop:editor'] = () => props['editor'] || editor
    }

    return h(tagName, { ...properties, ...eventHandlers })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Component as any
}
