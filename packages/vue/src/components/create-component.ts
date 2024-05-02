import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import { useEditorContext } from '../injection/editor-context'

export function createComponent<Props extends object>(
  tagName: string,
  displayName: string,
  defaultProps: Props,
): DefineSetupFnComponent<Partial<Props> & { class?: string }> {
  const propertyNames = Object.keys(defaultProps)

  const hasEditor = Object.hasOwn(defaultProps, 'editor')

  const Component = defineComponent(
    (props: Record<string, unknown>, { slots }) => {
      const editor = useEditorContext()

      return () => {
        const p: Record<string, unknown> = {}

        for (const [key, value] of Object.entries(props)) {
          if (value !== undefined) {
            p[propertyNames.includes(key) ? '.' + key : key] = value
          }
        }

        if (hasEditor && editor && !p['editor']) {
          p.editor = editor
        }

        return h(tagName, p, slots.default?.())
      }
    },
    {
      props: propertyNames,
      name: displayName,
    },
  )

  return Component
}
