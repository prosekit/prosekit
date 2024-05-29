import type { Command } from '@prosekit/pm/state'

export interface CommandApplier<Args extends any[] = any[]> {
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

export type ToCommandApplier<T extends CommandTyping> = {
  [K in keyof T]: CommandApplier<T[K]>
}
