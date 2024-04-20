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

        for (const key of Object.keys(props)) {
          p[propertyNames.includes(key) ? '.' + key : key] = props[key]
        }

        return h(tagName, p, slots.default?.())
      }
    },
    {
      props: ['class', ...propertyNames],
      name: displayName,
    },
  )

  return Component
}
