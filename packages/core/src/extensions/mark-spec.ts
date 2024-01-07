import type { DOMOutputSpec, MarkSpec, SchemaSpec } from '@prosekit/pm/model'

import { ProseKitError } from '../error'
import { Facet } from '../facets/facet'
import { schemaFacet } from '../facets/schema'
import { type Extension } from '../types/extension'
import { isElement } from '../utils/is-element'
import { isNotNull } from '../utils/is-not-null'

/**
 * @public
 */
export interface MarkSpecOptions<MarkName extends string = string>
  extends MarkSpec {
  name: MarkName
}

/**
 * @public
 */
export interface MarkAttrOptions {
  /**
   * The name of the mark type.
   */
  type: string

  /**
   * The name of the attribute.
   */
  attr: string

  /**
   * The default value for this attribute, to use when no explicit value is
   * provided. Attributes th¡at have no default must be provided whenever a mark
   * of a type that has them is created.
   */
  default?: any

  /**
   * Returns the attribute key and value to be set on the DOM node.
   */
  toDom: (value: unknown) => [key: string, value: string] | null | void

  /**
   * Parses the attribute value from the DOM.
   */
  parseDOM?: (node: HTMLElement) => unknown
}

/**
 * @public
 */
export function defineMarkSpec<Mark extends string>(
  options: MarkSpecOptions<Mark>,
): Extension<{ MARKS: Mark }> {
  return markSpecFacet.extension([[options, undefined]]) as Extension<{
    MARKS: Mark
  }>
}

/**
 * @public
 */
export function defineMarkAttr(options: MarkAttrOptions): Extension {
  return markSpecFacet.extension([[undefined, options]])
}

type MarkSpecPayload = [
  MarkSpecOptions | undefined,
  MarkAttrOptions | undefined,
]

const markSpecFacet = Facet.define<MarkSpecPayload, SchemaSpec>({
  convert: (payloads: MarkSpecPayload[]): SchemaSpec => {
    const marks: Record<string, MarkSpec> = {}

    const specPayloads = payloads.map((input) => input[0]).filter(isNotNull)
    const attrPayloads = payloads.map((input) => input[1]).filter(isNotNull)

    for (const { name, ...spec } of specPayloads) {
      if (marks[name]) {
        throw new ProseKitError(`Mark type ${name} has already been defined`)
      }

      marks[name] = spec
    }

    for (const {
      type,
      attr,
      default: defaultValue,
      toDom,
      parseDOM,
    } of attrPayloads) {
      const spec = marks[type]

      if (!spec) {
        throw new ProseKitError(
          `Mark type ${type} must be defined before defining attributes`,
        )
      }

      if (!spec.attrs) {
        spec.attrs = {}
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      spec.attrs[attr] = { default: defaultValue }

      if (toDom && spec.toDOM) {
        const existingToDom = spec.toDOM
        spec.toDOM = (mark, inline): DOMOutputSpec => {
          const dom = existingToDom(mark, inline)

          if (!dom) {
            return dom
          }

          const attrDOM = toDom(mark.attrs[attr])
          if (!attrDOM) {
            return dom
          }

          const [key, value] = attrDOM

          if (!key) {
            return dom
          }

          if (Array.isArray(dom)) {
            if (typeof dom[1] === 'object') {
              return [dom[0], { ...dom[1], [key]: value }, ...dom.slice(2)]
            } else {
              return [dom[0], { [key]: value }, ...dom.slice(1)]
            }
          } else if (isElement(dom)) {
            dom.setAttribute(key, value)
          } else if (
            typeof dom === 'object' &&
            'dom' in dom &&
            isElement(dom.dom)
          ) {
            dom.dom.setAttribute(key, value)
          }

          return dom
        }
      }

      if (parseDOM && spec.parseDOM) {
        for (const rule of spec.parseDOM) {
          const existingGetAttrs = rule.getAttrs
          const existingAttrs = rule.attrs

          rule.getAttrs = (dom) => {
            const attrs = existingGetAttrs?.(dom) ?? existingAttrs

            if (attrs === false || !dom || !isElement(dom)) {
              return attrs ?? null
            }

            const value = parseDOM(dom)
            return {
              ...attrs,
              [attr]: value,
            }
          }
        }
      }
    }

    return { marks, nodes: {} }
  },
  next: schemaFacet,
  singleton: true,
})
