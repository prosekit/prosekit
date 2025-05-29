import type { AnyFunction } from '@prosekit/core'
import type { Component } from 'solid-js'
import h from 'solid-js/h'

import { useEditorContext } from '../contexts/editor-context'
import type { PropsWithElement } from '../types'

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  propNames: string[],
  eventNames: string[],
): Component<PropsWithElement<Props, CustomElement>> {
  const hasEditor = propNames.includes('editor')
  const lowerCaseEventNameMap = new Map(
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

      if (name.startsWith('on')) {
        const lowerCaseEventName = name.slice(2).toLowerCase()
        const eventName = lowerCaseEventNameMap.get(lowerCaseEventName)
        if (eventName) {
          const extractDetail = eventName.endsWith('Change')
          eventHandlers['on:' + eventName] = (event: Event) => {
            const handler = props[name] as AnyFunction | null
            if (typeof handler === 'function') {
              handler(extractDetail ? (event as CustomEvent).detail : event)
            }
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
