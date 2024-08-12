import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'
import { defineComponent, h, onMounted, ref } from 'vue'

import { useEditorContext } from '../injection/editor-context'

export function createComponent<Props extends object>(
  tagName: string,
  displayName: string,
  defaultProps: Props,
): DefineSetupFnComponent<Partial<Props> & HTMLAttributes> {
  const propertyNames = Object.keys(defaultProps)

  const hasEditor = Object.hasOwn(defaultProps, 'editor')

  const Component = defineComponent(
    (props: Record<string, unknown>, { slots }) => {
      const editor = useEditorContext()

      const mounted = ref(false)

      onMounted(() => {
        mounted.value = true
      })

      return () => {
        const properties: Record<string, unknown> = {}

        for (const [key, value] of Object.entries(props)) {
          if (value !== undefined && !key.startsWith('.')) {
            properties[propertyNames.includes(key) ? '.' + key : key] = value
          }
        }

        // Try to add the editor prop if it's missing.
        if (hasEditor && editor && !properties['editor']) {
          properties.editor = editor
        }

        // Ensure web components work after SSR hydration.
        properties.key = mounted.value ? 1 : 0

        return h(tagName, properties, slots.default?.())
      }
    },
    {
      name: displayName,
      props: propertyNames,
    },
  )

  return Component
}
