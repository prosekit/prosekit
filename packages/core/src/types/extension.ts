import { SimplifyUnion } from '..'

import { ToCommandCreators, ToCommandDispatcher } from './command'
import { ExceptEmptyValue } from './except-empty-value'
import {
  ExtensionTyping,
  ExtractCommandArgsFromTyping,
  ExtractMarksFromTyping,
  ExtractNodesFromTyping,
} from './extension-typing'
import { Priority } from './priority'

/**
 * @public
 */
export interface Extension<T extends ExtensionTyping = ExtensionTyping> {
  extension: Extension | Extension[]
  priority?: Priority
  _type?: T
}

/**
 * @internal
 */
export type ExtractTyping<E extends Extension> = E extends Extension<infer T>
  ? T
  : never

/**
 * @public
 */
export type ExtractNodes<E extends Extension> = ExtractNodesFromTyping<
  ExtractTyping<E>
>

/**
 * @public
 */
export type ExtractMarks<E extends Extension> = ExtractMarksFromTyping<
  ExtractTyping<E>
>

/**
 * @internal
 */
export type ExtractCommandArgs<E extends Extension> =
  ExtractCommandArgsFromTyping<ExtractTyping<E>>

/**
 * @public
 */
export type ExtractCommandCreators<E extends Extension> = ToCommandCreators<
  ExtractCommandArgs<E>
>

/**
 * @public
 */
export type ExtractCommandDispatchers<E extends Extension> =
  ToCommandDispatcher<ExtractCommandArgs<E>>

/**
 * @internal
 */
export type SimplifyExtension<E extends Extension | Extension[]> =
  E extends Extension[]
    ? Extension<
        ExceptEmptyValue<{
          NODES: ExtractNodes<E[number]>
          MARKS: ExtractMarks<E[number]>
          COMMAND_ARGS: SimplifyUnion<ExtractCommandArgs<E[number]>>
        }>
      >
    : E
