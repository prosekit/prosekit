import {
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  union,
  toggleMark,
  canUseRegexLookbehind,
  type Extension,
  type Union,
} from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

import { defineMarkInputRule } from '../input-rule'


/**
 * @internal
 */
export type StrikeSpecExtension = Extension<{
  Marks: {
    strike: Attrs
  }
}>

/**
 * @internal
 */
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

/**
 * @internal
 */
export type StrikeCommandsExtension = Extension<{
  Commands: {
    toggleStrike: []
  }
}>

/**
 * @internal
 */
export function defineStrikeCommands(): StrikeCommandsExtension {
  return defineCommands({
    toggleStrike: () => toggleMark({ type: 'strike' }),
  })
}

/**
 * @internal
 */
export function defineStrikeKeymap() {
  return defineKeymap({
    'Mod-shift-s': toggleMark({ type: 'strike' }),
    'Mod-shift-x': toggleMark({ type: 'strike' }),
  })
}

/**
 * @internal
 */
export function defineStrikeInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)~~([^\s~]|[^\s~][^~]*[^\s~])~~$/
      : /~~([^\s~]|[^\s~][^~]*[^\s~])~~$/,
    type: 'strike',
  })
}

/**
 * @internal
 */
export type StrikeExtension = Union<[StrikeSpecExtension, StrikeCommandsExtension]>

/**
 * @public
 */
export function defineStrike(): StrikeExtension {
  return union([
    defineStrikeSpec(),
    defineStrikeCommands(),
    defineStrikeKeymap(),
    defineStrikeInputRule(),
  ])
}
