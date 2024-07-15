import {
  defineComponent,
  h,
  onMounted,
  ref,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from 'vue'

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
        console.log('[prosekit] onMounted')
        mounted.value = true
      })

      return () => {
        const p: Record<string, unknown> = {}

        for (const [key, value] of Object.entries(props)) {
          if (value !== undefined) {
            p[propertyNames.includes(key) ? '.' + key : key] = value
          }
        }

        if (hasEditor && editor && !p['editor']) {
          console.log('[prosekit] mounted', mounted.value)
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
