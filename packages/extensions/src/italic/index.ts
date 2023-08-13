import {
  addCommands,
  addKeymap,
  addMarkSpec,
  defineExtension,
  toggleMark,
} from '@prosekit/core'

export function addItalicSpec() {
  return addMarkSpec({
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

export function addItalicCommands() {
  return addCommands({
    toggleItalic: () => toggleMark({ type: 'italic' }),
  })
}

export function addItalicKeymap() {
  return addKeymap({
    'Mod-i': toggleMark({ type: 'italic' }),
  })
}

/** @public */
export function addItalic() {
  return defineExtension([
    addItalicSpec(),
    addItalicCommands(),
    addItalicKeymap(),
  ])
}
