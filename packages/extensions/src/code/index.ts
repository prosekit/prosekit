import {
  canUseRegexLookbehind,
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  toggleMark,
  union,
} from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

/**
 * @public
 */
export function defineCodeSpec() {
  return defineMarkSpec({
    name: 'code',
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return ['code', 0]
    },
  })
}

export function defineCodeCommands() {
  return defineCommands({
    toggleCode: () => toggleMark({ type: 'code' }),
  })
}

export function defineCodeKeymap() {
  return defineKeymap({
    'Mod-e': toggleMark({ type: 'code' }),
  })
}

export function defineCodeInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)`([^\s`]|[^\s`][^`]*[^\s`])`$/
      : /`([^\s`]|[^\s`][^`]*[^\s`])`$/,
    type: 'code',
  })
}

/**
 * @public
 */
export function defineCode() {
  return union([
    defineCodeSpec(),
    defineCodeCommands(),
    defineCodeKeymap(),
    defineCodeInputRule(),
  ])
}
