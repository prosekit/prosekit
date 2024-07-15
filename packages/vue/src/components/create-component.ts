import type { Editor } from '@prosekit/core'
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

  const setupProps = (
    props: Record<string, unknown>,
    editor: Editor | undefined,
  ): Record<string, unknown> => {
    const properties: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined) {
        properties[propertyNames.includes(key) ? '.' + key : key] = value
      }
    }

    if (hasEditor && editor && !properties['editor']) {
      properties.editor = editor
    }

    return properties
  }

  const usePropsRef = (props: Record<string, unknown>) => {
    const editor = useEditorContext()
    const propsRef = ref<Record<string, unknown>>(setupProps(props, editor))

    // Update the props when the component is mounted, to force the component to
    // update even if it has been rendered during server-side rendering.
    onMounted(() => {
      propsRef.value = setupProps(props, editor)
    })

    return propsRef
  }

  const Component = defineComponent(
    (props: Record<string, unknown>, { slots }) => {
      const propsRef = usePropsRef(props)

      return () => {
        return h(tagName, propsRef.value, slots.default?.())
      }
    },
    {
      props: propertyNames,
      name: displayName,
    },
  )

  return Component
}
