import {
  canUseRegexLookbehind,
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  toggleMark,
  union,
  type Extension,
  type Union,
} from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

import { defineMarkInputRule } from '../input-rule'

/**
 * @internal
 */
export type ItalicSpecExtension = Extension<{
  Marks: {
    italic: Attrs
  }
}>

/**
 * @internal
 */
export function defineItalicSpec(): ItalicSpecExtension {
  return defineMarkSpec({
    name: 'italic',
    parseDOM: [
      { tag: 'i' },
      { tag: 'em' },
      { style: 'font-style=italic' },
      {
        style: 'font-style=normal',
        clearMark: (m) => m.type.name === 'italic',
      },
    ],
    toDOM() {
      return ['em', 0]
    },
  })
}

/**
 * @internal
 */
export type ItalicCommandsExtension = Extension<{
  Commands: {
    toggleItalic: []
  }
}>

/**
 * @internal
 */
export function defineItalicCommands(): ItalicCommandsExtension {
  return defineCommands({
    toggleItalic: () => toggleMark({ type: 'italic' }),
  })
}

/**
 * @internal
 */
export function defineItalicKeymap() {
  return defineKeymap({
    'Mod-i': toggleMark({ type: 'italic' }),
  })
}

/**
 * @internal
 */
export function defineItalicInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)\*([^\s*]|[^\s*][^*]*[^\s*])\*$/
      : /\*([^\s*]|[^\s*][^*]*[^\s*])\*$/,
    type: 'italic',
  })
}

/**
 * @internal
 */
export type ItalicExtension = Union<
  [ItalicSpecExtension, ItalicCommandsExtension]
>

/**
 * @public
 */
export function defineItalic(): ItalicExtension {
  return union(
    defineItalicSpec(),
    defineItalicCommands(),
    defineItalicKeymap(),
    defineItalicInputRule(),
  )
}
