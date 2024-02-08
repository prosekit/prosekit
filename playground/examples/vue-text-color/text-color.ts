import {
  addMark,
  defineCommands,
  defineMarkSpec,
  removeMark,
  union,
} from 'prosekit/core'
import type { Command, EditorState } from 'prosekit/pm/state'

export interface TextColorAttrs {
  color: string | null
}

export function defineTextColorSpec() {
  return defineMarkSpec({
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

function getCurrentColor(state: EditorState) {
  const { $from } = state.selection
  const marks = $from.marksAcross($from)
  if (!marks) {
    return null
  }
  for (const mark of marks) {
    if (mark.type.name === 'textColor') {
      return (mark.attrs as TextColorAttrs).color
    }
  }
}

function addTextColor(attrs: TextColorAttrs): Command {
  return addMark({ type: 'textColor', attrs })
}

function removeTextColor(): Command {
  return removeMark({ type: 'textColor' })
}

function toggleTextColor(attrs: TextColorAttrs): Command {
  return (state, dispatch, view) => {
    if (!attrs.color || getCurrentColor(state) === attrs.color) {
      return removeTextColor()(state, dispatch, view)
    } else {
      return addTextColor(attrs)(state, dispatch, view)
    }
  }
}

export function defineTextColorCommands() {
  return defineCommands({
    addTextColor,
    removeTextColor,
    toggleTextColor,
  })
}

export function defineTextColor() {
  return union([defineTextColorSpec(), defineTextColorCommands()])
}
