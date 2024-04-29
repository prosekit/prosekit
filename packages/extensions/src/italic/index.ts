import {
  canUseRegexLookbehind,
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  toggleMark,
  union,
} from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

export function defineItalicSpec() {
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

export function defineItalicCommands() {
  return defineCommands({
    toggleItalic: () => toggleMark({ type: 'italic' }),
  })
}

export function defineItalicKeymap() {
  return defineKeymap({
    'Mod-i': toggleMark({ type: 'italic' }),
  })
}

export function defineItalicInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)\*([^\s*]|[^\s*][^*]*[^\s*])\*$/
      : /\*([^\s*]|[^\s*][^*]*[^\s*])\*$/,
    type: 'italic',
  })
}

/**
 * @public
 */
export function defineItalic() {
  return union([
    defineItalicSpec(),
    defineItalicCommands(),
    defineItalicKeymap(),
    defineItalicInputRule(),
  ])
}
