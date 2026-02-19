import { defineComponent, h, onMounted, ref, watchEffect, type DefineSetupFnComponent, type EmitsOptions, type HTMLAttributes } from 'vue'

import { useEditorContext } from '../injection/editor-context.ts'

export function createComponent<
  Props extends { [PropName in keyof Props]: unknown },
  Emits extends EmitsOptions,
>(
  tagName: string,
  displayName: string,
  propNames: string[],
  eventNames: string[],
): DefineSetupFnComponent<Partial<Props> & HTMLAttributes, Emits> {
  const hasEditor = propNames.includes('editor')

  const Component = defineComponent<any, any>(
    (props: Record<string, unknown>, { slots, emit }) => {
      const editor = useEditorContext()

      const mounted = ref(false)

      onMounted(() => {
        mounted.value = true
      })

      const elementRef = ref<HTMLElement | null>(null)

      watchEffect((onCleanup) => {
        const element = elementRef.value
        if (!element) return

        const eventHandlers: Record<string, (event: Event) => void> = {}
        for (const eventName of eventNames) {
          const extractDetail = eventName.endsWith('Change')
          eventHandlers[eventName] = (event: Event) => {
            emit(
              eventName,
              extractDetail ? (event as CustomEvent).detail : event,
            )
          }
        }

        for (const [eventName, handler] of Object.entries(eventHandlers)) {
          element.addEventListener(eventName, handler)
        }

        onCleanup(() => {
          for (const [eventName, handler] of Object.entries(eventHandlers)) {
            element.removeEventListener(eventName, handler)
          }
        })
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

        // Ensure web components work after SSR hydration.
        properties.key = mounted.value ? 1 : 0

        properties.ref = elementRef

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
