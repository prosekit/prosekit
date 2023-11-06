import {
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  toggleMark,
  union,
} from '@prosekit/core'

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

export function defineItalicKeymap() {
  return defineKeymap({
    'Mod-e': toggleMark({ type: 'code' }),
  })
}

/**
 * @public
 */
export function defineCode() {
  return union([defineCodeSpec(), defineCodeCommands(), defineItalicKeymap()])
}
