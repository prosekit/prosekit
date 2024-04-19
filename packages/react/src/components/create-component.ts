import { propNames } from '@prosekit/lit/autocomplete-empty'
import {
  createElement,
  forwardRef,
  useLayoutEffect,
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type HTMLAttributes,
} from 'react'
import { mergeRefs } from 'react-merge-refs'

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  displayName: string,
  defaultProps: Props,
): ForwardRefExoticComponent<
  Props & RefAttributes<CustomElement> & HTMLAttributes<CustomElement>
> {
  const propertyNames = Object.keys(defaultProps)

  const Component = forwardRef<any, any>((props: Props, ref) => {
    const [el, setEl] = useState<HTMLElement | null>(null)

    const properties: Record<string, unknown> = {}
    const attributes: Record<string, unknown> = {}

    for (const [name, value] of Object.entries(props)) {
      if (propertyNames.includes(name)) {
        properties[name] = value
      } else {
        attributes[name] = value
      }
    }

    useLayoutEffect(() => {
      if (el) {
        for (const [name, value] of Object.entries(properties)) {
          if (value !== undefined) {
            // @ts-expect-error: we know that name is a valid property name
            el[name] = value
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [el, ...propNames.map((name) => properties[name])])

    return createElement(tagName, {
      ...attributes,
      ref: mergeRefs([ref, setEl]),
    })
  })

  Component.displayName = displayName

  return Component
}
