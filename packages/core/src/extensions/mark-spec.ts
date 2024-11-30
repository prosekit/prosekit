import type {
  MarkSpec,
  ParseRule,
  SchemaSpec,
} from '@prosekit/pm/model'
import clone from 'just-clone'
import OrderedMap from 'orderedmap'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import { schemaSpecFacet } from '../facets/schema-spec'
import type {
  AnyAttrs,
  AttrSpec,
} from '../types/attrs'
import type { Extension } from '../types/extension'
import { groupBy } from '../utils/array-grouping'
import { assert } from '../utils/assert'
import { mergeSpecs } from '../utils/merge-specs'
import {
  wrapOutputSpecAttrs,
  wrapTagParseRuleAttrs,
} from '../utils/output-spec'
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
 * @public
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

    const groupedAttrs = groupBy(attrPayloads, (payload) => payload.type)

    for (const [type, attrs] of Object.entries(groupedAttrs)) {
      if (!attrs) continue

      const maybeSpec = specs.get(type)
      assert(maybeSpec, `Mark type ${type} must be defined`)
      const spec = clone(maybeSpec)

      if (!spec.attrs) {
        spec.attrs = {}
      }

      for (const attr of attrs) {
        spec.attrs[attr.attr] = {
          default: attr.default as unknown,
          validate: attr.validate,
        }
      }

      if (spec.toDOM) {
        spec.toDOM = wrapOutputSpecAttrs(spec.toDOM, attrs)
      }

      if (spec.parseDOM) {
        spec.parseDOM = spec.parseDOM.map((rule) => wrapParseRuleAttrs(rule, attrs))
      }

      specs = specs.update(type, spec)
    }

    return { marks: specs, nodes: {} }
  },
  parent: schemaSpecFacet,
  singleton: true,
})

function wrapParseRuleAttrs(
  rule: ParseRule,
  attrs: MarkAttrOptions[],
): ParseRule {
  if (rule.tag) {
    return wrapTagParseRuleAttrs(rule, attrs)
  }
  return rule
}
