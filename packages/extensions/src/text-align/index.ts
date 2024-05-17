import {
  defineCommands,
  defineKeymap,
  defineNodeAttr,
  setNodeAttrs,
  union,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

export interface TextAlignOptions {
  /**
   * The names of node to add the attribute to.
   *
   * @example
   * `["paragraph", "heading"]`.
   */
  types: string[]

  /**
   * The default value for the attribute.
   *
   * @default "left"
   */
  default?: string
}

function defineTextAlignAttr(type: string, defaultValue: string): Extension {
  return defineNodeAttr({
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

function defineTextAlignAttrs(
  types: string[],
  defaultValue: string,
): Extension {
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
export function defineTextAlignCommands(types: string[]) {
  return defineCommands({
    setTextAlign: (value: string | null) => setTextAlign({ types, value }),
  })
}

/**
 * @internal
 */
function defineTextAlignKeymap(types: string[]) {
  return defineKeymap({
    'Mod-Shift-l': setTextAlign({ types, value: 'left' }),
    'Mod-Shift-e': setTextAlign({ types, value: 'center' }),
    'Mod-Shift-r': setTextAlign({ types, value: 'right' }),
    'Mod-Shift-j': setTextAlign({ types, value: 'justify' }),
  })
}

/**
 * Adds a `textAlign` attribute to the specified nodes. This will be rendered as a CSS `text-align` style.
 *
 * @public
 */
export function defineTextAlign(options: TextAlignOptions) {
  return union([
    defineTextAlignAttrs(options.types, options.default || 'left'),
    defineTextAlignKeymap(options.types),
    defineTextAlignCommands(options.types),
  ])
}
