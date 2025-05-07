import type {
  AttributeSpec,
  NodeSpec,
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
 * Defines a node type.
 *
 * @public
 */
export function defineNodeSpec<
  Node extends string,
  Attrs extends AnyAttrs = AnyAttrs,
>(
  options: NodeSpecOptions<Node, Attrs>,
): Extension<{
  Nodes: { [K in Node]: Attrs }
}> {
  const payload: NodeSpecPayload = [options, undefined]
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
  const payload: NodeSpecPayload = [undefined, options]
  return defineFacetPayload(nodeSpecFacet, [payload]) as Extension<{
    Nodes: any
  }>
}

type NodeSpecPayload = [
  NodeSpecOptions | undefined,
  NodeAttrOptions | undefined,
]

const nodeSpecFacet = defineFacet<NodeSpecPayload, SchemaSpec>({
  reducer: (payloads: NodeSpecPayload[]): SchemaSpec => {
    let specs = OrderedMap.from<NodeSpec>({})
    let topNodeName: string | undefined = undefined

    const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish)
    const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish)

    for (const { name, topNode, ...spec } of specPayloads) {
      if (topNode) {
        topNodeName = name
      }

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
      assert(maybeSpec, `Node type ${type} must be defined`)

      const spec = clone(maybeSpec)

      if (!spec.attrs) {
        spec.attrs = {}
      }

      for (const attr of attrs) {
        spec.attrs[attr.attr] = {
          default: attr.default as unknown,
          validate: attr.validate,
          splittable: attr.splittable,
        } as AttributeSpec
      }

      if (spec.toDOM) {
        spec.toDOM = wrapOutputSpecAttrs(spec.toDOM, attrs)
      }

      if (spec.parseDOM) {
        spec.parseDOM = spec.parseDOM.map((rule) => wrapTagParseRuleAttrs(rule, attrs))
      }

      specs = specs.update(type, spec)
    }

    return { nodes: specs, topNode: topNodeName }
  },
  parent: schemaSpecFacet,
  singleton: true,
})
