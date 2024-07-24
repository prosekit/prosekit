import {
  defineCommands,
  defineKeymap,
  defineNodeAttr,
  setNodeAttrs,
  union,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

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

function defineTextAlignAttrs<NodeName extends string>(
  types: NodeName[],
  defaultValue: string | null,
): Extension<{
  Nodes: { [K in NodeName]: { textAlign: string | null } }
}> {
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
  return setNodeAttrs({ type: types, attrs: { textAlign: value } })
}

/**
 * @internal
 */
export type TextAlignCommandTyping = {
  setTextAlign: [value: string | null]
}

/**
 * @internal
 */
export function defineTextAlignCommands(types: string[]): Extension<{
  Commands: TextAlignCommandTyping
}> {
  return defineCommands({
    setTextAlign: (value: string | null) => setTextAlign({ types, value }),
  })
}

/**
 * @internal
 */
export function defineTextAlignKeymap(types: string[]) {
  return defineKeymap({
    'mod-shift-l': setTextAlign({ types, value: 'left' }),
    'mod-shift-e': setTextAlign({ types, value: 'center' }),
    'mod-shift-r': setTextAlign({ types, value: 'right' }),
    'mod-shift-j': setTextAlign({ types, value: 'justify' }),
  })
}

/**
 * Adds a `textAlign` attribute to the specified nodes. This will be rendered as
 * a CSS `text-align` style.
 *
 * @public
 */
export function defineTextAlign<NodeName extends string = string>(
  options: TextAlignOptions<NodeName>,
): Extension<{
  Nodes: { [K in NodeName]: { textAlign: string | null } }

  Commands: TextAlignCommandTyping
}> {
  return union([
    defineTextAlignAttrs<NodeName>(options.types, options.default || 'left'),
    defineTextAlignKeymap(options.types),
    defineTextAlignCommands(options.types),
  ])
}
