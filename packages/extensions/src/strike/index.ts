import {
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  union,
  toggleMark,
} from '@prosekit/core'

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
    'Mod-s': toggleMark({ type: 'strike' }),
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
  ])
}
