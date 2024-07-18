import type { Command } from '@prosekit/pm/state'

/**
 * A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.
 *
 * It also has a `canApply` method to check if the command can be applied.
 *
 * @public
 */
export interface CommandAction<Args extends any[] = any[]> {
  (...args: Args): boolean
  canApply(...args: Args): boolean
}

export type CommandCreator<Args extends any[] = any[]> = (
  ...arg: Args
) => Command

/**
 * @internal
 */
export interface CommandTyping {
  [name: string]: any[]
}

export interface CommandCreators {
  [name: string]: CommandCreator
}

export type ToCommandCreators<T extends CommandTyping> = {
  [K in keyof T]: CommandCreator<T[K]>
}

export type ToCommandAction<T extends CommandTyping> = {
  [K in keyof T]: CommandAction<T[K]>
}
