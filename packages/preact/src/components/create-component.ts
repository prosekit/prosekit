import { createElement } from 'preact'
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
} from 'preact/compat'
import { useLayoutEffect, useState } from 'preact/hooks'
import { mergeRefs } from 'react-merge-refs'

export function createComponent<
  Props extends object,
  CustomElement extends HTMLElement,
>(
  tagName: string,
  displayName: string,
  defaultProps: Props,
): ForwardRefExoticComponent<
  Partial<Props> & RefAttributes<CustomElement> & HTMLAttributes<CustomElement>
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
        attributes[name === 'className' ? 'class' : name] = value
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
    }, [el, ...propertyNames.map((name) => properties[name])])

    return createElement(tagName, {
      ...attributes,
      ref: mergeRefs([ref, setEl]),
    })
  })

  Component.displayName = displayName

  return Component
}
