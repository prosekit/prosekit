import { isNotNullish, mapGroupBy } from '@ocavue/utils'
import type { AttributeSpec, MarkSpec, SchemaSpec } from '@prosekit/pm/model'
import OrderedMap from 'orderedmap'

import { defineFacetPayload } from '../facets/facet-extension.ts'
import { defineFacet } from '../facets/facet.ts'
import { schemaSpecFacet } from '../facets/schema-spec.ts'
import type { AnyAttrs, AttrSpec } from '../types/attrs.ts'
import type { Extension, PlainExtension } from '../types/extension.ts'
import { assert } from '../utils/assert.ts'
import { mergeSpecs } from '../utils/merge-specs.ts'
import { wrapOutputSpecAttrs, wrapParseRuleAttrs } from '../utils/output-spec.ts'

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
export interface MarkSpecPatchOptions<MarkName extends string = string> {
  /**
   * The name of the mark type to patch.
   */
  type: MarkName

  /**
   * Receives the merged mark spec and returns a patched mark spec.
   */
  patch: (spec: MarkSpec) => MarkSpec
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
  const payload: MarkSpecPayload = [options, undefined, undefined]
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
  const payload: MarkSpecPayload = [undefined, options, undefined]
  return defineFacetPayload(markSpecFacet, [payload]) as Extension<{
    Marks: any
  }>
}

/**
 * Patches a mark type after all mark specs and mark attrs are merged.
 *
 * @public
 */
export function defineMarkSpecPatch<
  MarkType extends string = string,
>(
  options: MarkSpecPatchOptions<MarkType>,
): PlainExtension {
  const payload: MarkSpecPayload = [undefined, undefined, options]
  return defineFacetPayload(markSpecFacet, [payload]) as PlainExtension
}

type MarkSpecPayload = [
  MarkSpecOptions | undefined,
  MarkAttrOptions | undefined,
  MarkSpecPatchOptions | undefined,
]

const markSpecFacet = defineFacet<MarkSpecPayload, SchemaSpec>({
  reducer: (payloads: MarkSpecPayload[]): SchemaSpec => {
    let specs = OrderedMap.from<MarkSpec>({})

    const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish)
    const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish)
    const patchPayloads = payloads.map((input) => input[2]).filter(isNotNullish)

    for (const { name, ...spec } of specPayloads) {
      const prevSpec = specs.get(name)
      if (prevSpec) {
        specs = specs.update(name, mergeSpecs(prevSpec, spec))
      } else {
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

    const groupedPatches = mapGroupBy(patchPayloads, (payload) => payload.type)

    for (const [type, patches] of groupedPatches.entries()) {
      if (!patches) continue

      const oldSpec = specs.get(type)
      assert(oldSpec, `Mark type ${type} must be defined`)

      let newSpec = { ...oldSpec, attrs: oldSpec.attrs ? { ...oldSpec.attrs } : undefined } satisfies MarkSpec

      for (const { patch } of patches) {
        newSpec = patch(newSpec)
      }

      specs = specs.update(type, newSpec)
    }

    return { marks: specs, nodes: {} }
  },
  parent: schemaSpecFacet,
  singleton: true,
})
