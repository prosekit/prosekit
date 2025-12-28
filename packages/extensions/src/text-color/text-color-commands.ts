import {
  addMark,
  defineCommands,
  removeMark,
  toggleMark,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

import type { TextColorAttrs } from './text-color-spec'

/**
 * @internal
 */
export function addTextColor(attrs: TextColorAttrs): Command {
  return addMark({ type: 'textColor', attrs })
}

/**
 * @internal
 */
export function removeTextColor(): Command {
  return removeMark({ type: 'textColor' })
}

/**
 * @internal
 */
export type TextColorCommandsExtension = Extension<{
  Commands: {
    addTextColor: [attrs: TextColorAttrs]
    removeTextColor: []
  }
}>

/**
 * @internal
 */
export function defineTextColorCommands(): TextColorCommandsExtension {
  return defineCommands({ addTextColor, removeTextColor })
}
