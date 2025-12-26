import {
  defineCommands,
  defineKeymap,
  defineNodeAttr,
  setNodeAttrsBetween,
  union,
  type Extension,
  type PlainExtension,
  type Union,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

/**
 * @public
 */
export interface TextAlignOptions<NodeName extends string = string> {
  /**
   * The names of node to add the attribute to.
   *
   * @example
   *
   * ["paragraph", "heading"]
   */
  types: NodeName[]

  /**
   * The default value for the attribute.
   *
   * @default "left"
   */
  default?: string
}

function defineTextAlignAttr<NodeName extends string>(
  type: NodeName,
  defaultValue: string | null,
) {
  return defineNodeAttr<NodeName, 'textAlign', string | null>({
    type,
    attr: 'textAlign',
    default: defaultValue,
    splittable: true,
    toDOM: (value: any) => (value ? ['style', `text-align:${value};`] : null),
    parseDOM: (node: HTMLElement) => {
      return node.style.getPropertyValue('text-align') || null
    },
  })
}

/**
 * @internal
 */
export type TextAlignAttrsExtension<NodeName extends string> = Extension<{
  Nodes: { [K in NodeName]: { textAlign: string | null } }
}>

/**
 * @internal
 */
function defineTextAlignAttrs<NodeName extends string>(
  types: NodeName[],
  defaultValue: string | null,
): TextAlignAttrsExtension<NodeName> {
  return union(types.map((type) => defineTextAlignAttr(type, defaultValue)))
}

/**
 * @internal
 */
export function setTextAlign({
  types,
  value,
}: {
  types: string[]
  value: string | null
}): Command {
  return setNodeAttrsBetween({ type: types, attrs: { textAlign: value } })
}

/**
 * @internal
 */
export type TextAlignCommandsExtension = Extension<{
  Commands: {
    setTextAlign: [value: string | null]
  }
}>

/**
 * @internal
 */
export function defineTextAlignCommands(
  types: string[],
): TextAlignCommandsExtension {
  return defineCommands({
    setTextAlign: (value: string | null) => setTextAlign({ types, value }),
  })
}

/**
 * @internal
 */
export function defineTextAlignKeymap(types: string[]): PlainExtension {
  return defineKeymap({
    'Mod-L': setTextAlign({ types, value: 'left' }),
    'Mod-E': setTextAlign({ types, value: 'center' }),
    'Mod-R': setTextAlign({ types, value: 'right' }),
    'Mod-J': setTextAlign({ types, value: 'justify' }),
  })
}

/**
 * @internal
 */
export type TextAlignExtension<NodeName extends string> = Union<
  [TextAlignAttrsExtension<NodeName>, TextAlignCommandsExtension]
>

/**
 * Adds a `textAlign` attribute to the specified nodes. This will be rendered as
 * a CSS `text-align` style.
 *
 * @public
 */
export function defineTextAlign<NodeName extends string = string>(
  options: TextAlignOptions<NodeName>,
): TextAlignExtension<NodeName> {
  return union(
    defineTextAlignAttrs<NodeName>(options.types, options.default || 'left'),
    defineTextAlignKeymap(options.types),
    defineTextAlignCommands(options.types),
  )
}
