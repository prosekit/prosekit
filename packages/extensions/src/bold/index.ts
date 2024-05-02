import {
  canUseRegexLookbehind,
  defineCommands,
  defineKeymap,
  defineMarkSpec,
  toggleMark,
  union,
} from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

export function defineBoldSpec() {
  return defineMarkSpec({
    name: 'bold',
    parseDOM: [
      { tag: 'strong' },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      {
        tag: 'b',
        getAttrs: (node: string | HTMLElement): null | false => {
          return (
            typeof node !== 'string' &&
            node.style.fontWeight !== 'normal' &&
            null
          )
        },
      },
      { style: 'font-weight=400', clearMark: (m) => m.type.name == 'strong' },
      {
        style: 'font-weight',
        getAttrs: (value: string | HTMLElement): null | false => {
          return (
            typeof value === 'string' &&
            /^(bold(er)?|[5-9]\d{2,})$/.test(value) &&
            null
          )
        },
      },
    ],
    toDOM() {
      return ['strong', 0]
    },
  })
}

export function defineBoldCommands() {
  return defineCommands({
    toggleBold: () => toggleMark({ type: 'bold' }),
  })
}

export function defineBoldKeymap() {
  return defineKeymap({
    'Mod-b': toggleMark({ type: 'bold' }),
  })
}

export function defineBoldInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/
      : /\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/,
    type: 'bold',
  })
}

/**
 * @public
 */
export function defineBold() {
  return union([
    defineBoldSpec(),
    defineBoldCommands(),
    defineBoldKeymap(),
    defineBoldInputRule(),
  ])
}
