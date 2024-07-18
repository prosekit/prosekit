import type {
  Attrs,
  DOMOutputSpec,
  MarkSpec,
  SchemaSpec,
} from '@prosekit/pm/model'

import { ProseKitError } from '../error'
import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import { schemaSpecFacet } from '../facets/schema-spec'
import type { AttrSpec, AttrsSpec } from '../types/attrs-spec'
import type { Extension } from '../types/extension'
import { isElement } from '../utils/is-element'
import { isNotNull } from '../utils/is-not-null'

/**
 * @public
 */
export interface MarkSpecOptions<
  MarkName extends string = string,
  AttrsType extends Attrs = Attrs,
> extends MarkSpec {
  /**
   * The name of the mark type.
   */
  name: MarkName

  /**
   * The attributes that marks of this type get.
   */
  attrs?: { [K in keyof AttrsType]: AttrSpec<AttrsType[K]> }
}

/**
 * @public
 */
export interface MarkAttrOptions<
  MarkName extends string = string,
  AttrName extends string = string,
  AttrType = any,
> extends AttrSpec<AttrType> {
  /**
   * The name of the mark type.
   */
  type: MarkName

  /**
   * The name of the attribute.
   */
  attr: AttrName

  /**
   * Returns the attribute key and value to be set on the DOM node.
   */
  toDOM?: (value: any) => [key: string, value: string] | null | void

  /**
   * Parses the attribute value from the DOM.
   */
  parseDOM?: (node: HTMLElement) => any
}

/**
 * @public
 */
export function defineMarkSpec<
  Mark extends string,
  AttrsType extends Attrs = Attrs,
>(
  options: MarkSpecOptions<Mark, AttrsType>,
): Extension<{
  Marks: { [K in Mark]: AttrsSpec<AttrsType> }
  Nodes: never
  Commands: never
}> {
  const payload: MarkSpecPayload = [options, undefined]
  return defineFacetPayload(markSpecFacet, [payload]) as Extension<{
    Marks: any
    Nodes: never
    Commands: never
  }>
}

/**
 * @public
 */
export function defineMarkAttr<
  MarkType extends string = string,
  AttrName extends string = string,
  AttrType = any,
>(
  options: MarkAttrOptions<MarkType, AttrName, AttrType>,
): Extension<{
  Nodes: never
  Marks: { [K in MarkType]: AttrType }
  Commands: never
}> {
  const payload: MarkSpecPayload = [undefined, options]
  return defineFacetPayload(markSpecFacet, [payload]) as Extension<{
    Nodes: never
    Marks: any
    Commands: never
  }>
}

type MarkSpecPayload = [
  MarkSpecOptions | undefined,
  MarkAttrOptions | undefined,
]

const markSpecFacet = defineFacet<MarkSpecPayload, SchemaSpec>({
  reducer: (payloads: MarkSpecPayload[]): SchemaSpec => {
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
      toDOM,
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
      spec.attrs[attr] = { default: defaultValue as unknown }

      if (toDOM && spec.toDOM) {
        const existingToDom = spec.toDOM
        spec.toDOM = (mark, inline): DOMOutputSpec => {
          const dom = existingToDom(mark, inline)

          if (!dom) {
            return dom
          }

          const attrDOM = toDOM(mark.attrs[attr])
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

          rule.getAttrs = (dom: HTMLElement | string) => {
            // @ts-expect-error: the type here is too strict
            const attrs = existingGetAttrs?.(dom) ?? existingAttrs

            if (attrs === false || !dom || !isElement(dom)) {
              return attrs ?? null
            }

            const value = parseDOM(dom) as unknown
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
  parent: schemaSpecFacet,
  singleton: true,
})
