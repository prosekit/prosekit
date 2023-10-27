import {
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  union,
  toggleMark,
} from '@prosekit/core'

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

/**
 * @public
 */
export function defineItalic() {
  return union([
    defineItalicSpec(),
    defineItalicCommands(),
    defineItalicKeymap(),
  ])
}
