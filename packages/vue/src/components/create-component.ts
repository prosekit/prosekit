import {
  defineComponent,
  h,
  onMounted,
  ref,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from 'vue'

import { useEditorContext } from '../injection/editor-context'

import type { CreateEmits } from './create-emits'

export function createComponent<
  Props extends { [PropName in keyof Props]: unknown },
  Events extends { [EventType in keyof Events]: CustomEvent },
>(
  tagName: string,
  displayName: string,
  propNames: string[],
  eventNames: string[],
): DefineSetupFnComponent<
  Partial<Props> & HTMLAttributes,
  CreateEmits<Events>
> {
  const hasEditor = propNames.includes('editor')

  const Component = defineComponent<any, any>(
    (props: Record<string, unknown>, { slots, emit }) => {
      const editor = useEditorContext()

      const mounted = ref(false)

      onMounted(() => {
        mounted.value = true
      })

      return () => {
        const properties: Record<string, unknown> = {}

        for (const [key, value] of Object.entries(props)) {
          if (value !== undefined && !key.startsWith('.')) {
            properties[propNames.includes(key) ? '.' + key : key] = value
          }
        }

        // Try to add the editor prop if it's missing.
        if (hasEditor && editor && !properties['editor']) {
          properties.editor = editor
        }

        for (const eventName of eventNames) {
          const extractDetail = eventName.endsWith('Change')
          properties['on' + eventName[0].toUpperCase() + eventName.slice(1)] = (
            event: Event,
          ) => {
            emit(
              eventName,
              extractDetail ? (event as CustomEvent).detail : event,
            )
          }
        }

        // Ensure web components work after SSR hydration.
        properties.key = mounted.value ? 1 : 0

        return h(tagName, properties, slots.default?.())
      }
    },
    {
      name: displayName,
      props: propNames,
      emits: eventNames,
    },
  )

  return Component
}
