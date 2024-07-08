import { useEditorContext } from '../contexts/editor-context'

// For unknown reason, Svelte v4 cannot set properties on a web component
// when I directly use `{...$$props}`. It seems that Svelte v4 recognizes
// the properties as attributes. Here is a workaround to set the properties
// on the element manually and only let Svelte set the attributes.
export function useWebComponent(
  defaultProps: Readonly<Record<string, unknown>>,
) {
  const propertyNames = Object.keys(defaultProps)

  const hasEditor = propertyNames.includes('editor')
  const editorContext = useEditorContext()

  function handleChange(
    element: HTMLElement | undefined,
    $$props: Record<string, unknown>,
  ) {
    const properties: Record<string, unknown> = {}
    const attributes: Record<string, unknown> = {}

    for (const [key, value] of Object.entries($$props)) {
      if (value === undefined || key.startsWith('$')) {
        continue
      } else if (propertyNames.includes(key)) {
        properties[key] = value
      } else {
        attributes[key] = value
      }
    }

    if (hasEditor && !properties.editor && editorContext) {
      properties.editor = editorContext
    }

    if (element) {
      for (const [key, value] of Object.entries(properties)) {
        ;(element as Record<string, any>)[key] = value
      }
    }

    return attributes
  }

  return handleChange
}
