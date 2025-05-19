import type { Schema } from '@prosekit/pm/model'

import type {
  CommandTyping,
  ToCommandAction,
  ToCommandCreators,
} from './extension-command'
import type {
  MarkTyping,
  ToMarkAction,
} from './extension-mark'
import type {
  NodeTyping,
  ToNodeAction,
} from './extension-node'
import type { PickStringLiteral } from './pick-string-literal'
import type { PickSubType } from './pick-sub-type'
import type { Priority } from './priority'
import type { SimplifyDeeper } from './simplify-deeper'
import type { SimplifyUnion } from './simplify-union'

/**
 * @internal
 */
export interface ExtensionTyping<
  N extends NodeTyping = never,
  M extends MarkTyping = never,
  C extends CommandTyping = never,
> {
  Nodes?: N
  Marks?: M
  Commands?: C
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
export type ExtractTyping<E extends Extension> = E extends Extension<ExtensionTyping<infer N, infer M, infer C>> ? ExtensionTyping<
    PickSubType<N, NodeTyping>,
    PickSubType<M, MarkTyping>,
    PickSubType<C, CommandTyping>
  >
  : never

/**
 * An extension that does not define any nodes, marks, or commands.
 *
 * @internal
 */
export type PlainExtension = Extension<{
  Nodes: never
  Marks: never
  Commands: never
}>

/**
 * @public
 */
export type ExtractNodes<E extends Extension> = SimplifyDeeper<
  SimplifyUnion<ExtractTyping<E>['Nodes']>
>

/**
 * @public
 */
export type ExtractNodeNames<E extends Extension> = PickStringLiteral<
  keyof ExtractNodes<E>
>

/**
 * @public
 */
export type ExtractMarks<E extends Extension> = SimplifyDeeper<
  SimplifyUnion<ExtractTyping<E>['Marks']>
>

/**
 * @public
 */
export type ExtractMarkNames<E extends Extension> = PickStringLiteral<
  keyof ExtractMarks<E>
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
 * Extracts the {@link CommandAction}s from an extension type.
 *
 * @public
 */
export type ExtractCommandActions<E extends Extension> = ToCommandAction<
  ExtractCommands<E>
>

/**
 * Extracts the {@link NodeAction}s from an extension type.
 *
 * @public
 */
export type ExtractNodeActions<E extends Extension> = ToNodeAction<
  ExtractNodes<E>
>

/**
 * Extracts the {@link MarkAction}s from an extension type.
 *
 * @public
 */
export type ExtractMarkActions<E extends Extension> = ToMarkAction<
  ExtractMarks<E>
>

/**
 * @deprecated Use `ExtractCommandActions` instead.
 */
export type ExtractCommandAppliers<E extends Extension> = ExtractCommandActions<E>

/**
 * @internal
 */
export type Union<E extends readonly Extension[]> = Extension<{
  Nodes: ExtractNodes<E[number]>
  Marks: ExtractMarks<E[number]>
  Commands: ExtractCommands<E[number]>
}>

/**
 * @deprecated Use `Union` instead.
 * @internal
 */
export type UnionExtension<E extends Extension | readonly Extension[]> = E extends readonly Extension[] ? Extension<{
    Nodes: ExtractNodes<E[number]>
    Marks: ExtractMarks<E[number]>
    Commands: ExtractCommands<E[number]>
  }>
  : E
