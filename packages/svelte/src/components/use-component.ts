import { useEditorContext } from '../contexts/editor-context'

type EventHandler = (...args: any[]) => any

// For unknown reason, Svelte v4 cannot set properties on a web component
// when I directly use `{...$$props}`. It seems that Svelte v4 recognizes
// the properties as attributes. Here is a workaround to set the properties
// on the element manually and only let Svelte set the attributes.
export function useComponent(propNames: string[], eventNames: string[]) {
  const hasEditor = propNames.includes('editor')
  const lowerCaseEventNameMap = Object.fromEntries(
    eventNames.map((name) => [name.toLowerCase(), name]),
  )

  const editorContext = useEditorContext()

  function handleChange(
    element: HTMLElement | undefined,
    $$props: Record<string, unknown>,
  ) {
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

      if (name.startsWith('on') && name.endsWith('Change')) {
        const lowerCaseEventName =
          'update:' + name.slice(2).slice(0, -6).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        if (eventName) {
          eventHandlers[eventName] = value as EventHandler
          continue
        }
      }

      if (name.startsWith('on')) {
        const lowerCaseEventName = name.slice(2).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        if (eventName) {
          eventHandlers[lowerCaseEventName] = value as EventHandler
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

    return [attributes, eventHandlers] as const
  }

  return handleChange
}
