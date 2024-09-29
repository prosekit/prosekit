import type { AnyFunction } from '@prosekit/core'
import { createElement } from 'preact'
import {
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
  forwardRef,
} from 'preact/compat'
import { useEffect, useLayoutEffect, useState } from 'preact/hooks'
import { mergeRefs } from 'react-merge-refs'

import { useEditorContext } from '../contexts/editor-context'

const _useIsomorphicLayoutEffect =
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
    const eventHandlers: Record<string, AnyFunction> = {}

    for (const [name, value] of Object.entries(props)) {
      if (value === undefined) {
        continue
      }

      if (propNames.includes(name)) {
        properties[name] = value
        continue
      }

      if (name.startsWith('on') && name.endsWith('Change')) {
        const lowerCaseEventName =
          'update:' + name.slice(2).slice(0, -6).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        const handler = value as AnyFunction | null
        if (eventName && handler) {
          eventHandlers[eventName] = (event: Event) => {
            const detail = (event as CustomEvent).detail as unknown
            handler(detail)
          }
          continue
        }
      }

      if (name.startsWith('on')) {
        const lowerCaseEventName = name.slice(2).toLowerCase()
        const eventName = lowerCaseEventNameMap[lowerCaseEventName]
        const handler = value as AnyFunction | null
        if (eventName && handler) {
          eventHandlers[eventName] = handler
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

    _useIsomorphicLayoutEffect(() => {
      if (!el) return
      for (const [name, value] of Object.entries(properties)) {
        if (value !== undefined) {
          // @ts-expect-error: we know that name is a valid property name
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          el[name] = value as unknown as any
        }
      }
    }, [el, ...propNames.map((name) => properties[name])])

    for (const eventName of eventNames) {
      _useIsomorphicLayoutEffect(() => {
        const handler = eventHandlers[eventName]
        if (!el || !handler) return
        el.addEventListener(eventName, handler)
        return () => el.removeEventListener(eventName, handler)
      }, [el, eventHandlers[eventName]])
    }

    return createElement(tagName, {
      ...attributes,
      ref: mergeRefs([ref, setEl]),
    })
  })

  Component.displayName = displayName

  return Component
}
