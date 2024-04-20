import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

export function createComponent<Props extends object>(
  tagName: string,
  displayName: string,
  defaultProps: Props,
): DefineSetupFnComponent<Partial<Props> & { class?: string }> {
  const propertyNames = Object.keys(defaultProps)

  const Component = defineComponent(
    (props: Record<string, unknown>, { slots }) => {
      return () => {
        const p: Record<string, unknown> = {}

        for (const [key, value] of Object.entries(props)) {
          if (value !== undefined) {
            p[propertyNames.includes(key) ? '.' + key : key] = value
          }
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
