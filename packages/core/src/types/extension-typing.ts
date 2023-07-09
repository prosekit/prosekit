import { CommandArgs } from './command'
import { ExtractKey } from './extract-key'

/**
 * @internal
 */
export interface ExtensionTyping<
  Node extends string = string,
  Mark extends string = string,
  Commands extends CommandArgs = CommandArgs,
> {
  NODES?: Node
  MARKS?: Mark
  COMMAND_ARGS?: Commands
}

export type ExtractNodesFromTyping<T extends ExtensionTyping> = ExtractKey<
  T,
  'NODES'
>
export type ExtractMarksFromTyping<T extends ExtensionTyping> = ExtractKey<
  T,
  'MARKS'
>
export type ExtractCommandArgsFromTyping<T extends ExtensionTyping> =
  ExtractKey<T, 'COMMAND_ARGS'>
