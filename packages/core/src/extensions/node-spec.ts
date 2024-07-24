import type {
  AttributeSpec,
  DOMOutputSpec,
  NodeSpec,
  SchemaSpec,
} from '@prosekit/pm/model'
import OrderedMap from 'orderedmap'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import { schemaSpecFacet } from '../facets/schema-spec'
import type { AnyAttrs, AttrSpec } from '../types/attrs'
import type { Extension } from '../types/extension'
import { assert } from '../utils/assert'
import { isElement } from '../utils/is-element'
import { isNotNull } from '../utils/is-not-null'

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
   * Returns the attribute key and value to be set on the DOM node.
   *
   * If the `key` is `"style"`, the value is a string of CSS properties and will
   * be prepended to the existing `style` attribute on the DOM node.
   */
  toDOM?: (value: any) => [key: string, value: string] | null | void

  /**
   * Parses the attribute value from the DOM.
   */
  parseDOM?: (node: HTMLElement) => any
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
    Marks: never
    Commands: never
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
  Marks: never
  Commands: never
}> {
  const payload: NodeSpecPayload = [undefined, options]
  return defineFacetPayload(nodeSpecFacet, [payload]) as Extension<{
    Nodes: any
    Marks: never
    Commands: never
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

    const specPayloads = payloads.map((input) => input[0]).filter(isNotNull)
    const attrPayloads = payloads.map((input) => input[1]).filter(isNotNull)

    for (const { name, topNode, ...spec } of specPayloads) {
      assert(!specs.get(name), `Node type ${name} can only be defined once`)

      if (topNode) {
        topNodeName = name
      }

      // The latest spec has the highest priority, so we put it at the start of
      // the map.
      specs = specs.addToStart(name, spec)
    }

    for (const {
      type,
      attr,
      default: defaultValue,
      splittable,
      toDOM,
      parseDOM,
    } of attrPayloads) {
      const spec = specs.get(type)
      assert(spec, `Node type ${type} must be defined`)

      if (!spec.attrs) {
        spec.attrs = {}
      }
      spec.attrs[attr] = {
        default: defaultValue as unknown,
        splittable,
      } as AttributeSpec

      if (toDOM && spec.toDOM) {
        const existingToDom = spec.toDOM
        spec.toDOM = (node): DOMOutputSpec => {
          const dom = existingToDom(node)

          if (!dom) {
            return dom
          }

          const attrDOM = toDOM(node.attrs[attr])
          if (!attrDOM) {
            return dom
          }

          const [key, value] = attrDOM

          if (!key) {
            return dom
          }

          if (Array.isArray(dom)) {
            if (typeof dom[1] === 'object') {
              return [
                dom[0],
                setObjectAttribute(
                  dom[1] as Record<string, unknown>,
                  key,
                  value,
                ),
                ...dom.slice(2),
              ]
            } else {
              return [dom[0], { [key]: value }, ...dom.slice(1)]
            }
          } else if (isElement(dom)) {
            setElementAttribute(dom, key, value)
          } else if (
            typeof dom === 'object' &&
            'dom' in dom &&
            isElement(dom.dom)
          ) {
            setElementAttribute(dom.dom, key, value)
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

            const value = parseDOM(dom) as unknown
            return {
              ...attrs,
              [attr]: value,
            }
          }
        }
      }
    }

    return { nodes: specs, topNode: topNodeName }
  },
  parent: schemaSpecFacet,
  singleton: true,
})

function setObjectAttribute(
  obj: Record<string, unknown>,
  key: string,
  value: string,
) {
  if (key === 'style') {
    value = `${value}${obj.style || ''}`
  }
  return { ...obj, [key]: value }
}

function setElementAttribute(element: Element, key: string, value: string) {
  if (key === 'style') {
    value = `${value}${element.getAttribute('style') || ''}`
  }
  element.setAttribute(key, value)
}
