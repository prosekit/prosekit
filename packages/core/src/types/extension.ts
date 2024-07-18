import type { Schema } from '@prosekit/pm/model'

import type {
  AttrsTyping,
  CommandTyping,
  ToCommandAction,
  ToCommandCreators,
} from './command'
import type { Priority } from './priority'
import type { SimplifyDeeper } from './simplify-deeper'
import type { SimplifyUnion } from './simplify-union'

/**
 * @internal
 */
export interface ExtensionTyping<
  N extends AttrsTyping | never = never,
  M extends AttrsTyping | never = never,
  C extends CommandTyping | never = never,
> {
  Nodes: N
  Marks: M
  Commands: C
}

/**
 * @public
 */
export interface Extension<
  T extends ExtensionTyping<any, any, any> = ExtensionTyping<any, any, any>,
> {
  extension: Extension | Extension[]
  priority?: Priority
  _type?: T

  /**
   * @public
   *
   * The schema that this extension represents.
   */
  schema: Schema | null
}

/**
 * @internal
 */
export type ExtractTyping<E extends Extension> =
  E extends Extension<ExtensionTyping<infer N, infer M, infer C>>
    ? ExtensionTyping<
        PickKnownAttrsTyping<N>,
        PickKnownAttrsTyping<M>,
        PickKnownCommandTyping<C>
      >
    : never

/**
 * @internal
 */
export type PickStringLiteral<T extends string> = [string] extends [T]
  ? never
  : T

/**
 * @internal
 */
export type PickKnownAttrsTyping<T extends AttrsTyping> = [
  AttrsTyping,
] extends [T]
  ? never
  : T

/**
 * @internal
 */
export type PickKnownCommandTyping<T extends CommandTyping> = [
  CommandTyping,
] extends [T]
  ? never
  : T

/**
 * @public
 */
export type ExtractNodes<E extends Extension> = SimplifyDeeper<
  SimplifyUnion<ExtractTyping<E>['Nodes']>
>

/**
 * @public
 */
export type ExtractMarks<E extends Extension> = SimplifyDeeper<
  SimplifyUnion<ExtractTyping<E>['Marks']>
>

/**
 * @internal
 */
export type ExtractCommands<E extends Extension> = SimplifyUnion<
  ExtractTyping<E>['Commands']
>

/**
 * @public
 */
export type ExtractCommandCreators<E extends Extension> = ToCommandCreators<
  ExtractCommands<E>
>

/**
 * Extracts the command actions from an extension type.
 *
 * @public
 */
export type ExtractCommandActions<E extends Extension> = ToCommandAction<
  ExtractCommands<E>
>

/**
 * @deprecated Use `ExtractCommandActions` instead.
 */
export type ExtractCommandAppliers<E extends Extension> =
  ExtractCommandActions<E>

/**
 * @internal
 */
export type UnionExtension<E extends Extension | readonly Extension[]> =
  E extends readonly Extension[]
    ? Extension<{
        Nodes: ExtractNodes<E[number]>
        Marks: ExtractMarks<E[number]>
        Commands: ExtractCommands<E[number]>
      }>
    : E
