import { addMark, defineCommands, removeMark, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

import type { BackgroundColorAttrs } from './background-color-spec'

/**
 * @internal
 */
export function addBackgroundColor(attrs: BackgroundColorAttrs): Command {
  return addMark({ type: 'backgroundColor', attrs })
}

/**
 * @internal
 */
export function removeBackgroundColor(): Command {
  return removeMark({ type: 'backgroundColor' })
}

/**
 * @internal
 */
export type BackgroundColorCommandsExtension = Extension<{
  Commands: {
    addBackgroundColor: [attrs: BackgroundColorAttrs]
    removeBackgroundColor: []
  }
}>

/**
 * @internal
 */
export function defineBackgroundColorCommands(): BackgroundColorCommandsExtension {
  return defineCommands({ addBackgroundColor, removeBackgroundColor })
}
