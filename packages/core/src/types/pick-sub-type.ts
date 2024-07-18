/**
 * @internal
 */
export type PickSubType<Type, ParentType> = Type extends ParentType
  ? [ParentType] extends [Type]
    ? never
    : Type
  : never
