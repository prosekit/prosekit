import {
  createElement,
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  type ForwardRefExoticComponent,
  type Ref,
  type RefAttributes,
} from 'react'

/**
 * @internal
 */
export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  /** The custom element tag name. */
  tagName: string,
  /** The React display name of the component. */
  displayName: string,
  /** The property names that are passed to the custom element. */
  propNames: Array<string>,
  /** A map of event handler names to event names. */
  eventNameMap: Record<string, string>,
  /** A function to register the custom element. */
  register: VoidFunction,
): ForwardRefExoticComponent<Props & RefAttributes<CustomElement>> {
  type EventHandler = (event: Event) => void

  let isRegistered = false

  const Component = forwardRef<CustomElement, any>(
    (props: Record<string, unknown>, forwardRef: Ref<CustomElement>) => {
      if (!isRegistered) {
        register()
        isRegistered = true
      }

      const elementRef = useRef<CustomElement>(null)

      const reactProps: Record<string, unknown> = {}
      const elementProps: Record<string, unknown> = {}
      const eventHandlers: Record<string, EventHandler> = {}
      const eventHandlersRef = useRef<Record<string, EventHandler>>({})

      for (const [name, value] of Object.entries(props)) {
        if (propNames.includes(name)) {
          elementProps[name] = value
          continue
        }

        const eventName = eventNameMap[name]
        if (eventName) {
          eventHandlers[eventName] = value as EventHandler
        }

        reactProps[name] = value
      }

      // Set all properties.
      useLayoutEffect(() => {
        const element = elementRef.current
        if (!element) return

        for (const [name, value] of Object.entries(elementProps)) {
          ;(element as Record<string, unknown>)[name] = value
        }
      })

      // Set all event listeners.
      useLayoutEffect(() => {
        eventHandlersRef.current = eventHandlers
      })

      // Register all event listeners
      useLayoutEffect(() => {
        const element = elementRef.current
        if (!element) return

        const eventNames: string[] = Object.values(eventNameMap)
        const eventHandlers: Array<[string, EventHandler]> = []

        for (const eventName of eventNames) {
          const handler = (event: Event) => {
            eventHandlersRef.current[eventName]?.(event)
          }
          eventHandlers.push([eventName, handler])
        }

        for (const [eventName, handler] of eventHandlers) {
          element.addEventListener(eventName, handler)
        }

        return () => {
          for (const [eventName, handler] of eventHandlers) {
            element.removeEventListener(eventName, handler)
          }
        }
      }, [])

      // Suppress hydration warnings for web components as the attributes are set after the component is mounted.
      reactProps['suppressHydrationWarning'] = true

      const mergedRef = useMemo(
        () => mergeRefs([elementRef, forwardRef]),
        [forwardRef],
      )
      reactProps['ref'] = mergedRef

      return createElement(tagName, reactProps)
    },
  )

  Component.displayName = displayName

  return Component
}

/**
 * Assigns a value to a ref.
 * @returns The ref cleanup callback, if any.
 */
function assignRef<T>(
  ref: Ref<T> | undefined,
  value: T | null,
): VoidFunction | void {
  if (typeof ref === 'function') {
    return ref(value)
  } else if (ref) {
    ref.current = value
  }
}

/**
 * Merges multiple refs into a single one.
 */
function mergeRefs<T>(refs: (Ref<T> | undefined)[]): Ref<T> {
  return (value: T | null) => {
    const cleanups: VoidFunction[] = []

    for (const ref of refs) {
      const cleanup = assignRef(ref, value)
      const isCleanup = typeof cleanup === 'function'
      cleanups.push(isCleanup ? cleanup : () => assignRef(ref, null))
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup()
      }
      cleanups.length = 0
    }
  }
}
