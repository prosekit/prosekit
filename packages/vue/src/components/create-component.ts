import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

export function createComponent<Props extends object>(
  tagName: string,
  displayName: string,
  defaultProps: Props,
): DefineSetupFnComponent<Partial<Props> & { class?: string }> {
  const propertyNames = Object.keys(defaultProps)

  const Component = defineComponent(
    (props: any, { slots }) => {
      return () => {
        return h(
          tagName,
          Object.fromEntries(
            Object.entries(props as Props)
              .filter((entry) => entry[1] !== undefined)
              .map(([key, value]) => [
                propertyNames.includes(key) ? '.' + key : key,
                value,
              ]),
          ),
          slots.default?.(),
        )
      }
    },
    {
      props: ['class', ...propertyNames],
      name: displayName,
    },
  )

  return Component
}
