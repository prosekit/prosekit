import {
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  toggleMark,
  union,
  type Extension,
  type PlainExtension,
  type Union,
} from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type UnderlineSpecExtension = Extension<{
  Marks: {
    underline: Attrs
  }
}>

/**
 * @internal
 */
export function defineUnderlineSpec(): UnderlineSpecExtension {
  return defineMarkSpec({
    name: 'underline',
    parseDOM: [
      { tag: 'u' },
      { tag: 'underline' },
      { style: 'text-decoration=underline' },
      { style: 'text-decoration-line=underline' },
    ],
    toDOM() {
      return ['u', 0]
    },
  })
}

/**
 * @internal
 */
export type UnderlineCommandsExtension = Extension<{
  Commands: {
    toggleUnderline: []
  }
}>

/**
 * @internal
 */
export function defineUnderlineCommands(): UnderlineCommandsExtension {
  return defineCommands({
    toggleUnderline: () => toggleMark({ type: 'underline' }),
  })
}

/**
 * @internal
 */
export function defineUnderlineKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-u': toggleMark({ type: 'underline' }),
  })
}

/**
 * @internal
 */
export type UnderlineExtension = Union<
  [UnderlineSpecExtension, UnderlineCommandsExtension]
>

/**
 * @public
 */
export function defineUnderline(): UnderlineExtension {
  return union(
    defineUnderlineSpec(),
    defineUnderlineCommands(),
    defineUnderlineKeymap(),
  )
}
