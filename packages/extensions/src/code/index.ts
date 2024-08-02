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
export type CodeSpecExtension = Extension<{
  Marks: {
    code: Attrs
  }
}>

/**
 * @internal
 */
export function defineCodeSpec(): CodeSpecExtension {
  return defineMarkSpec({
    name: 'code',
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return ['code', 0]
    },
  })
}

/**
 * @internal
 */
export type CodeCommandsExtension = Extension<{
  Commands: {
    toggleCode: []
  }
}>

/**
 * @internal
 */
export function defineCodeCommands(): CodeCommandsExtension {
  return defineCommands({
    toggleCode: () => toggleMark({ type: 'code' }),
  })
}

/**
 * @internal
 */
export function defineCodeKeymap() {
  return defineKeymap({
    'Mod-e': toggleMark({ type: 'code' }),
  })
}

/**
 * @internal
 */
export function defineCodeInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)`([^\s`]|[^\s`][^`]*[^\s`])`$/
      : /`([^\s`]|[^\s`][^`]*[^\s`])`$/,
    type: 'code',
  })
}

/**
 * @internal
 */
export type CodeExtension = Union<[CodeSpecExtension, CodeCommandsExtension]>

/**
 * @public
 */
export function defineCode(): CodeExtension {
  return union(
    defineCodeSpec(),
    defineCodeCommands(),
    defineCodeKeymap(),
    defineCodeInputRule(),
  )
}
