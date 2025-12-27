import {
  addMark,
  defineCommands,
  removeMark,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import type { ColorAttrs } from './color-spec'

/**
 * @internal
 */
export function addColor(attrs: ColorAttrs): Command {
  return addMark({ type: 'color', attrs })
}

/**
 * @internal
 */
export function removeColor(): Command {
  return removeMark({ type: 'color' })
}

/**
 * @internal
 */
export type ColorCommandsExtension = Extension<{
  Commands: {
    addColor: [attrs: ColorAttrs]
    removeColor: []
  }
}>

/**
 * @internal
 */
export function defineColorCommands(): ColorCommandsExtension {
  return defineCommands({ addColor, removeColor })
}
