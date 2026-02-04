import { mapGroupBy } from '@ocavue/utils'
import type { AttributeSpec, MarkSpec, SchemaSpec } from '@prosekit/pm/model'
import OrderedMap from 'orderedmap'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import { schemaSpecFacet } from '../facets/schema-spec'
import type { AnyAttrs, AttrSpec } from '../types/attrs'
import type { Extension } from '../types/extension'
import { assert } from '../utils/assert'
import { mergeSpecs } from '../utils/merge-specs'
import { wrapOutputSpecAttrs, wrapParseRuleAttrs } from '../utils/output-spec'
import { isNotNullish } from '../utils/type-assertion'

/**
 * @public
 */
export interface MarkSpecOptions<
  MarkName extends string = string,
  Attrs extends AnyAttrs = AnyAttrs,
> extends MarkSpec {
  /**
   * The name of the mark type.
   */
  name: MarkName

  /**
   * The attributes that marks of this type get.
   */
  attrs?: { [K in keyof Attrs]: AttrSpec<Attrs[K]> }
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
   * Returns the attribute key and value to be set on the HTML element.
   *
   * If the returned `key` is `"style"`, the value is a string of CSS properties and will
   * be prepended to the existing `style` attribute on the DOM node.
   *
   * @param value - The value of the attribute of current ProseMirror node.
   */
  toDOM?: (value: AttrType) => [key: string, value: string] | null | undefined

  /**
   * Parses the attribute value from the DOM.
   */
  parseDOM?: (node: HTMLElement) => AttrType
}

/**
 * Defines a mark type into the editor schema.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const extension = defineMarkSpec({
 *   name: 'bold',
 *   parseDOM: [
 *     { tag: 'strong' },
 *     { tag: 'b' },
 *   ],
 *   toDOM() {
 *     return ['strong', 0]
 *   },
 * })
 * ```
 */
export function defineMarkSpec<
  Mark extends string,
  Attrs extends AnyAttrs = AnyAttrs,
>(
  options: MarkSpecOptions<Mark, Attrs>,
): Extension<{
  Marks: { [K in Mark]: Attrs }
}> {
  const payload: MarkSpecPayload = [options, undefined]
  return defineFacetPayload(markSpecFacet, [payload]) as Extension<{
    Marks: any
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
  Marks: { [K in MarkType]: AttrType }
}> {
  const payload: MarkSpecPayload = [undefined, options]
  return defineFacetPayload(markSpecFacet, [payload]) as Extension<{
    Marks: any
  }>
}

type MarkSpecPayload = [
  MarkSpecOptions | undefined,
  MarkAttrOptions | undefined,
]

const markSpecFacet = defineFacet<MarkSpecPayload, SchemaSpec>({
  reducer: (payloads: MarkSpecPayload[]): SchemaSpec => {
    let specs = OrderedMap.from<MarkSpec>({})

    const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish)
    const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish)

    for (const { name, ...spec } of specPayloads) {
      const prevSpec = specs.get(name)
      if (prevSpec) {
        specs = specs.update(name, mergeSpecs(prevSpec, spec))
      } else {
        // The latest spec has the highest priority, so we put it at the start
        // of the map.
        specs = specs.addToStart(name, spec)
      }
    }

    const groupedAttrs = mapGroupBy(attrPayloads, (payload) => payload.type)

    for (const [type, attrs] of groupedAttrs.entries()) {
      if (!attrs) continue

      const oldSpec = specs.get(type)
      assert(oldSpec, `Mark type ${type} must be defined`)

      const newSpec = { ...oldSpec, attrs: { ...oldSpec.attrs } } satisfies MarkSpec

      for (const attr of attrs) {
        newSpec.attrs[attr.attr] = {
          default: attr.default as unknown,
          validate: attr.validate,
        } satisfies AttributeSpec
      }

      if (oldSpec.toDOM) {
        newSpec.toDOM = wrapOutputSpecAttrs(oldSpec.toDOM, attrs)
      }

      if (oldSpec.parseDOM) {
        newSpec.parseDOM = oldSpec.parseDOM.map((rule) => wrapParseRuleAttrs(rule, attrs))
      }

      specs = specs.update(type, newSpec)
    }

    return { marks: specs, nodes: {} }
  },
  parent: schemaSpecFacet,
  singleton: true,
})
