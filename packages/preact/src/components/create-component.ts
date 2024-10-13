import type { AnyFunction } from '@prosekit/core'
import { createElement } from 'preact'
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
} from 'preact/compat'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRef as Ref,
} from 'preact/hooks'
import { mergeRefs } from 'react-merge-refs'

import { useEditorContext } from '../contexts/editor-context'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  displayName: string,
  propNames: string[],
  eventNames: string[],
): ForwardRefExoticComponent<
  Partial<Props> & RefAttributes<CustomElement> & HTMLAttributes<CustomElement>
> {
  const hasEditor = propNames.includes('editor')
  const lowerCaseEventNameMap = Object.fromEntries(
    eventNames.map((name) => [name.toLowerCase(), name]),
  )

  const Component = forwardRef<any, any>((props: Props, ref) => {
    const [el, setEl] = useState<HTMLElement | null>(null)

    const properties: Record<string, unknown> = {}
    const attributes: Record<string, unknown> = {}
    const eventHandlersRef: Ref<Record<string, AnyFunction[]>> = useRef(
      Object.fromEntries(eventNames.map((eventName) => [eventName, []])),
    )
    const eventHandlers: Record<string, AnyFunction> = {}

    for (const [name, value] of Object.entries(props)) {
      if (value === undefined) {
        continue
      }

      if (propNames.includes(name)) {
        properties[name] = value
        continue
      }

      if (name.startsWith('on')) {
        const lowerCaseEventName = name.slice(2).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        const handler = value as AnyFunction | null
        if (eventName && handler) {
          const extractDetail = eventName.endsWith('Change')
          const normalizedHandler = extractDetail
            ? (event: Event) => {
                handler((event as CustomEvent).detail)
              }
            : handler
          eventHandlers[eventName] = normalizedHandler
        }
      }

      if (name === 'className') {
        attributes['class'] = value
      } else {
        attributes[name] = value
      }
    }

    const editor = useEditorContext()

    if (hasEditor && editor && !properties['editor']) {
      properties['editor'] = editor
    }

    // Set all properties.
    useIsomorphicLayoutEffect(() => {
      if (!el) return
      for (const [name, value] of Object.entries(properties)) {
        if (value !== undefined) {
          // @ts-expect-error: we know that name is a valid property name
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          el[name] = value as unknown as any
        }
      }
    }, [el, ...propNames.map((name) => properties[name])])

    // Put all event listeners extracted from `props` into `eventHandlersRef`.
    useIsomorphicLayoutEffect(() => {
      for (const [eventName, handerArray] of Object.entries(
        eventHandlersRef.current,
      )) {
        const handler = eventHandlers[eventName]
        handerArray.length = 0
        if (handler) {
          handerArray.push(handler)
        }
      }
    })

    // Register the event listeners to the element.
    useIsomorphicLayoutEffect(() => {
      if (!el) {
        return
      }

      const handlers: Record<string, AnyFunction> = {}

      for (const eventName of eventNames) {
        handlers[eventName] = (event: Event) => {
          for (const handler of eventHandlersRef.current[eventName]) {
            handler(event)
          }
        }
      }

      for (const [name, handler] of Object.entries(handlers)) {
        el.addEventListener(name, handler)
      }

      return () => {
        for (const [name, handler] of Object.entries(handlers)) {
          el.removeEventListener(name, handler)
        }
      }
    }, [el])

    return createElement(tagName, {
      ...attributes,
      ref: mergeRefs([ref, setEl]),
    })
  })

  Component.displayName = displayName

  return Component
}
