import { isNotNullish, mapGroupBy } from '@ocavue/utils'
import type { AttributeSpec, NodeSpec, SchemaSpec } from '@prosekit/pm/model'
import OrderedMap from 'orderedmap'

import { defineFacetPayload } from '../facets/facet-extension.ts'
import { defineFacet } from '../facets/facet.ts'
import { schemaSpecFacet } from '../facets/schema-spec.ts'
import type { AnyAttrs, AttrSpec } from '../types/attrs.ts'
import type { Extension, PlainExtension } from '../types/extension.ts'
import { assert } from '../utils/assert.ts'
import { mergeSpecs } from '../utils/merge-specs.ts'
import { wrapOutputSpecAttrs, wrapTagParseRuleAttrs } from '../utils/output-spec.ts'

/**
 * @public
 */
export interface NodeSpecOptions<
  NodeName extends string = string,
  Attrs extends AnyAttrs = AnyAttrs,
> extends NodeSpec {
  /**
   * The name of the node type.
   */
  name: NodeName

  /**
   * Whether this is the top-level node type. Only one node type can be the
   * top-level node type in a schema.
   */
  topNode?: boolean

  /**
   * The attributes that nodes of this type get.
   */
  attrs?: {
    [key in keyof Attrs]: AttrSpec<Attrs[key]>
  }
}

/**
 * @public
 */
export interface NodeAttrOptions<
  NodeName extends string = string,
  AttrName extends string = string,
  AttrType = any,
> extends AttrSpec<AttrType> {
  /**
   * The name of the node type.
   */
  type: NodeName

  /**
   * The name of the attribute.
   */
  attr: AttrName

  /**
   * Whether the attribute should be kept when the node is split. Set it to
   * `true` if you want to inherit the attribute from the previous node when
   * splitting the node by pressing `Enter`.
   *
   * @default undefined
   */
  splittable?: boolean

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
export interface NodeSpecPatchOptions<NodeName extends string = string> {
  /**
   * The name of the node type to patch.
   */
  type: NodeName

  /**
   * Receives the merged node spec and returns a patched node spec.
   */
  patch: (spec: NodeSpec) => NodeSpec
}

/**
 * Defines a node type into the editor schema.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const extension = defineNodeSpec({
 *   name: 'fancyParagraph',
 *   content: 'inline*',
 *   group: 'block',
 *   parseDOM: [{ tag: 'p.fancy' }],
 *   toDOM() {
 *     return ['p', { 'class': 'fancy' }, 0]
 *   },
 * })
 * ```
 */
export function defineNodeSpec<
  Node extends string,
  Attrs extends AnyAttrs = AnyAttrs,
>(
  options: NodeSpecOptions<Node, Attrs>,
): Extension<{
  Nodes: { [K in Node]: Attrs }
}> {
  const payload: NodeSpecPayload = [options, undefined, undefined]
  return defineFacetPayload(nodeSpecFacet, [payload]) as Extension<{
    Nodes: any
  }>
}

/**
 * Defines an attribute for a node type.
 *
 * @public
 */
export function defineNodeAttr<
  NodeType extends string = string,
  AttrName extends string = string,
  AttrType = any,
>(
  options: NodeAttrOptions<NodeType, AttrName, AttrType>,
): Extension<{
  Nodes: { [K in NodeType]: { [K in AttrName]: AttrType } }
}> {
  const payload: NodeSpecPayload = [undefined, options, undefined]
  return defineFacetPayload(nodeSpecFacet, [payload]) as Extension<{
    Nodes: any
  }>
}

/**
 * Patches a node type after all node specs and node attrs are merged.
 *
 * @public
 */
export function defineNodeSpecPatch<
  NodeType extends string = string,
>(
  options: NodeSpecPatchOptions<NodeType>,
): PlainExtension {
  const payload: NodeSpecPayload = [undefined, undefined, options]
  return defineFacetPayload(nodeSpecFacet, [payload]) as PlainExtension
}

type NodeSpecPayload = [
  NodeSpecOptions | undefined,
  NodeAttrOptions | undefined,
  NodeSpecPatchOptions | undefined,
]

const nodeSpecFacet = defineFacet<NodeSpecPayload, SchemaSpec>({
  reducer: (payloads: NodeSpecPayload[]): SchemaSpec => {
    let specs = OrderedMap.from<NodeSpec>({})
    let topNodeName: string | undefined = undefined

    const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish)
    const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish)
    const patchPayloads = payloads.map((input) => input[2]).filter(isNotNullish)

    for (const { name, topNode, ...spec } of specPayloads) {
      if (topNode) {
        topNodeName = name
      }

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
      assert(oldSpec, `Node type ${type} must be defined`)

      const newSpec = { ...oldSpec, attrs: { ...oldSpec.attrs } } satisfies NodeSpec

      for (const attr of attrs) {
        newSpec.attrs[attr.attr] = {
          default: attr.default as unknown,
          validate: attr.validate,
          splittable: attr.splittable,
        } satisfies AttributeSpec
      }

      if (oldSpec.toDOM) {
        newSpec.toDOM = wrapOutputSpecAttrs(oldSpec.toDOM, attrs)
      }

      if (oldSpec.parseDOM) {
        newSpec.parseDOM = oldSpec.parseDOM.map((rule) => wrapTagParseRuleAttrs(rule, attrs))
      }

      specs = specs.update(type, newSpec)
    }

    const groupedPatches = mapGroupBy(patchPayloads, (payload) => payload.type)

    for (const [type, patches] of groupedPatches.entries()) {
      if (!patches) continue

      const oldSpec = specs.get(type)
      assert(oldSpec, `Node type ${type} must be defined`)

      let newSpec = { ...oldSpec, attrs: oldSpec.attrs ? { ...oldSpec.attrs } : undefined } satisfies NodeSpec

      for (const { patch } of patches) {
        newSpec = patch(newSpec)
      }

      specs = specs.update(type, newSpec)
    }

    return { nodes: specs, topNode: topNodeName }
  },
  parent: schemaSpecFacet,
  singleton: true,
})
