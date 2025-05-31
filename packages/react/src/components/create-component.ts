import type { AnyFunction } from '@prosekit/core'
import {
  createElement,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
} from 'react'

import { useEditorContext } from '../contexts/editor-context'

import { mergeRefs } from './merge-refs'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

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
  const lowerCaseEventNameMap = new Map(
    eventNames.map((name) => [name.toLowerCase(), name]),
  )

  const Component = forwardRef<any, any>((props: Props, ref) => {
    const [el, setEl] = useState<HTMLElement | null>(null)

    const properties: Record<string, unknown> = {}
    const attributes: Record<string, unknown> = {}
    const eventHandlersRef = useRef<Record<string, AnyFunction>>({})
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
        const eventName = lowerCaseEventNameMap.get(lowerCaseEventName)
        if (eventName) {
          const extractDetail = eventName.endsWith('Change')
          eventHandlers[eventName] = (event: Event) => {
            const handler = value as AnyFunction | null
            if (typeof handler === 'function') {
              handler(extractDetail ? (event as CustomEvent).detail : event)
            }
          }
          continue
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react-compiler/react-compiler
          el[name] = value as unknown as any
        }
      }
    }, [el, ...propNames.map((name) => properties[name])])

    // Put all event listeners extracted from `props` into `eventHandlersRef`.
    useIsomorphicLayoutEffect(() => {
      eventHandlersRef.current = eventHandlers
    })

    // Register the event listeners to the element.
    useIsomorphicLayoutEffect(() => {
      if (!el) {
        return
      }

      const fixedEventHandlers: Record<string, AnyFunction> = {}

      for (const eventName of eventNames) {
        fixedEventHandlers[eventName] = (event: Event) => {
          eventHandlersRef.current[eventName]?.(event)
        }
      }

      for (const [name, handler] of Object.entries(fixedEventHandlers)) {
        el.addEventListener(name, handler)
      }

      return () => {
        for (const [name, handler] of Object.entries(fixedEventHandlers)) {
          el.removeEventListener(name, handler)
        }
      }
    }, [el])

    const mergedRef = useMemo(() => mergeRefs([ref, setEl]), [ref])

    return createElement(tagName, { ...attributes, ref: mergedRef })
  })

  Component.displayName = displayName

  return Component
}
