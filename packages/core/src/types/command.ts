import type { Command } from '@prosekit/pm/state'

import type { MarkAction, NodeAction } from '../editor/action'

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

/**
 * @internal
 */
export interface AttrsTyping {
  [name: string]: Record<string, any>
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

export type ToNodeAction<T extends AttrsTyping> = {
  [K in keyof T]: NodeAction<T[K]>
}

export type ToMarkAction<T extends AttrsTyping> = {
  [K in keyof T]: MarkAction<T[K]>
}
