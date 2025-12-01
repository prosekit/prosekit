import type { Command } from '@prosekit/pm/state'

/**
 * A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.
 *
 * It also has a `canExec` method to check if the command can be applied.
 *
 * @public
 */
export interface CommandAction<Args extends any[] = any[]> {
  /**
   * Execute the current command. Return `true` if the command was successfully
   * executed, otherwise `false`.
   */
  (...args: Args): boolean

  /**
   * Check if the current command can be executed. Return `true` if the command
   * can be executed, otherwise `false`.
   */
  canExec(...args: Args): boolean
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
