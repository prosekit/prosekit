import {
  addMark,
  defineCommands,
  defineMarkSpec,
  removeMark,
  union,
} from 'prosekit/core'
import type { Command } from 'prosekit/pm/state'

export interface TextColorAttrs {
  color: string | null
}

export function defineTextColorSpec() {
  return defineMarkSpec<'textColor', TextColorAttrs>({
    name: 'textColor',
    attrs: {
      color: { default: null },
    },
    parseDOM: [
      {
        style: 'color',
        getAttrs: (value) => {
          return { color: value }
        },
      },
    ],
    toDOM: (mark) => {
      return ['span', { style: `color: ${mark.attrs.color};` }, 0]
    },
  })
}

function setTextColor(attrs: TextColorAttrs): Command {
  return addMark({ type: 'textColor', attrs })
}

function removeTextColor(): Command {
  return removeMark({ type: 'textColor' })
}

export function defineTextColorCommands() {
  return defineCommands({
    setTextColor,
    removeTextColor,
  })
}

export function defineTextColor() {
  return union(defineTextColorSpec(), defineTextColorCommands())
}
