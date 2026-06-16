import type { Schema } from '@prosekit/pm/model'

import type { CommandTyping, ToCommandAction, ToCommandCreators } from './extension-command.ts'
import type { MarkTyping, ToMarkAction } from './extension-mark.ts'
import type { NodeTyping, ToNodeAction, ToNodeBuilder } from './extension-node.ts'
import type { PickStringLiteral } from './pick-string-literal.ts'
import type { PickSubType } from './pick-sub-type.ts'
import type { Priority } from './priority.ts'
import type { SimplifyDeeper } from './simplify-deeper.ts'
import type { SimplifyUnion } from './simplify-union.ts'

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

export interface Extension<
  T extends ExtensionTyping<any, any, any> = ExtensionTyping<any, any, any>,
> {
  extension: Extension | Extension[]
  priority?: Priority

  /**
   * The schema that this extension represents.
   */
  schema: Schema | null

  /** @internal */
  _type?: T
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

export type ExtractNodes<E extends Extension> = SimplifyDeeper<
  SimplifyUnion<ExtractTyping<E>['Nodes']>
>

export type ExtractNodeNames<E extends Extension> = PickStringLiteral<
  keyof ExtractNodes<E>
>

export type ExtractMarks<E extends Extension> = SimplifyDeeper<
  SimplifyUnion<ExtractTyping<E>['Marks']>
>

export type ExtractMarkNames<E extends Extension> = PickStringLiteral<
  keyof ExtractMarks<E>
>

/**
 * @internal
 */
export type ExtractCommands<E extends Extension> = SimplifyUnion<
  ExtractTyping<E>['Commands']
>

export type ExtractCommandCreators<E extends Extension> = ToCommandCreators<
  ExtractCommands<E>
>

/**
 * Extracts the {@link CommandAction}s from an extension type.
 */
export type ExtractCommandActions<E extends Extension> = ToCommandAction<
  ExtractCommands<E>
>

/**
 * Extracts the {@link NodeBuilder}s from an extension type.
 */
export type ExtractNodeBuilders<E extends Extension> = ToNodeBuilder<
  ExtractNodes<E>
>

/**
 * Extracts the {@link NodeAction}s from an extension type.
 */
export type ExtractNodeActions<E extends Extension> = ToNodeAction<
  ExtractNodes<E>
>

/**
 * Extracts the {@link MarkAction}s from an extension type.
 */
export type ExtractMarkActions<E extends Extension> = ToMarkAction<
  ExtractMarks<E>
>

/**
 * @internal
 */
export type Union<E extends readonly Extension[]> = Extension<{
  Nodes: ExtractNodes<E[number]>
  Marks: ExtractMarks<E[number]>
  Commands: ExtractCommands<E[number]>
}>
