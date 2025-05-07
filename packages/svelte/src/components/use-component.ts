import type { AnyFunction } from '@prosekit/core'
import type { EventHandler } from 'svelte/elements'

import { useEditorContext } from '../contexts/editor-context'

// For unknown reason, Svelte v4 cannot set properties on a web component
// when I directly use `{...$$props}`. It seems that Svelte v4 recognizes
// the properties as attributes. Here is a workaround to set the properties
// on the element manually and only let Svelte set the attributes.
export function useComponent(
  propNames: string[],
  eventNames: string[],
): (element: HTMLElement | undefined, $$props: Record<string, unknown>) => [Record<string, unknown>, Record<string, EventHandler>] {
  const hasEditor = propNames.includes('editor')
  const lowerCaseEventNameMap = Object.fromEntries(
    eventNames.map((name) => [name.toLowerCase(), name]),
  )

  const editorContext = useEditorContext()

  function handleChange(
    element: HTMLElement | undefined,
    $$props: Record<string, unknown>,
  ): [Record<string, unknown>, Record<string, EventHandler>] {
    const properties: Record<string, unknown> = {}
    const attributes: Record<string, unknown> = {}
    const eventHandlers: Record<string, EventHandler> = {}

    for (const [name, value] of Object.entries($$props)) {
      if (value === undefined || name.startsWith('$')) {
        continue
      }

      if (propNames.includes(name)) {
        properties[name] = value
        continue
      }

      if (name.startsWith('on')) {
        const lowerCaseEventName = name.slice(2).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        if (eventName) {
          const extractDetail = eventName.endsWith('Change')
          eventHandlers[eventName] = (event: Event) => {
            const handler = value as AnyFunction
            handler(extractDetail ? (event as CustomEvent).detail : event)
          }
          continue
        }
      }

      attributes[name] = value
    }

    if (hasEditor && !properties.editor && editorContext) {
      properties.editor = editorContext
    }

    if (element) {
      for (const [key, value] of Object.entries(properties)) {
        ;(element as Record<string, any>)[key] = value
      }
    }

    return [attributes, eventHandlers]
  }

  return handleChange
}
