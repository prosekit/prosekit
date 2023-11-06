import {
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  union,
  toggleMark,
} from '@prosekit/core'

export function defineUnderlineSpec() {
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

export function defineUnderlineCommands() {
  return defineCommands({
    toggleUnderline: () => toggleMark({ type: 'underline' }),
  })
}

export function defineUnderlineKeymap() {
  return defineKeymap({
    'Mod-u': toggleMark({ type: 'underline' }),
  })
}

/**
 * @public
 */
export function defineUnderline() {
  return union([
    defineUnderlineSpec(),
    defineUnderlineCommands(),
    defineUnderlineKeymap(),
  ])
}
