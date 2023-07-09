import { Command } from '@prosekit/pm/state'

export type CommandDispatcher<Args extends any[] = any[]> = (
  ...arg: Args
) => boolean

export type CommandCreator<Args extends any[] = any[]> = (
  ...arg: Args
) => Command

/** @internal */
export interface CommandArgs {
  [name: string]: any[]
}

export interface CommandCreators {
  [name: string]: CommandCreator
}

export type ToCommandArgs<T extends CommandCreators> = {
  [K in keyof T]: Parameters<T[K]>
}

export type ToCommandCreators<T extends CommandArgs> = {
  [K in keyof T]: CommandCreator<T[K]>
}

export type ToCommandDispatcher<T extends CommandArgs> = {
  [K in keyof T]: CommandDispatcher<T[K]>
}
