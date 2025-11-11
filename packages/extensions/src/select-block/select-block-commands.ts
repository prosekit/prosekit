import type { Command } from '@prosekit/pm/state'
import {
  defineCommands,
  type Extension,
} from '@prosekit/core'
import { selectCurrentBlock } from './select-block-utils'

/**
 * @internal
 */
export type SelectBlockCommandsExtension = Extension<{
  Commands: {
    selectBlock: []
  }
}>

export function defineSelectBlockCommands(): SelectBlockCommandsExtension {
  return defineCommands({
    selectBlock: (): Command => {
      return (state, dispatch) => {
        return selectCurrentBlock(state, dispatch)
      }
    },
  })
}

