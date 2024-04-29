import {
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  union,
  toggleMark,
  canUseRegexLookbehind,
} from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

export function defineStrikeSpec() {
  return defineMarkSpec({
    name: 'strike',
    parseDOM: [
      { tag: 's' },
      { tag: 'strike' },
      { tag: 'del' },
      { style: 'text-decoration=line-through' },
      { style: 'text-decoration-line=line-through' },
    ],
    toDOM() {
      return ['s', 0]
    },
  })
}

export function defineStrikeCommands() {
  return defineCommands({
    toggleStrike: () => toggleMark({ type: 'strike' }),
  })
}

export function defineStrikeKeymap() {
  return defineKeymap({
    'Mod-shift-s': toggleMark({ type: 'strike' }),
    'Mod-shift-x': toggleMark({ type: 'strike' }),
  })
}

export function defineStrikeInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)~~([^\s~]|[^\s~][^~]*[^\s~])~~$/
      : /~~([^\s~]|[^\s~][^~]*[^\s~])~~$/,
    type: 'strike',
  })
}

/**
 * @public
 */
export function defineStrike() {
  return union([
    defineStrikeSpec(),
    defineStrikeCommands(),
    defineStrikeKeymap(),
    defineStrikeInputRule(),
  ])
}
