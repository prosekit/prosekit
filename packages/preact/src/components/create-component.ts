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

type EventHandler = (...args: any[]) => any

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
  const lowerCaseEventNames = eventNames.map((name) => name.toLowerCase())

  const Component = forwardRef<any, any>((props: Props, ref) => {
    const [el, setEl] = useState<HTMLElement | null>(null)

    const properties: Record<string, unknown> = {}
    const attributes: Record<string, unknown> = {}
    const eventHandlers: Record<string, EventHandler> = {}

    for (const [name, value] of Object.entries(props)) {
      if (propNames.includes(name)) {
        properties[name] = value
      } else if (
        name.startsWith('on') &&
        lowerCaseEventNames.includes(name.slice(2))
      ) {
        eventHandlers[name.slice(2).toLowerCase()] = value as EventHandler
      } else if (name === 'className') {
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
        if (!el) return
        const handler = eventHandlers[eventName.toLowerCase()]
        if (!handler) return

        const eventHandler = (event: Event) => {
          if (eventName.startsWith('update:')) {
            handler((event as CustomEvent).detail)
          } else {
            handler(event)
          }
        }

        el.addEventListener(eventName, eventHandler)
        return () => {
          el.removeEventListener(eventName, eventHandler)
        }
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
