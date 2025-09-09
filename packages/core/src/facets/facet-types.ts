/**
 * @internal
 */
export type Tuple5<T> = [T, T, T, T, T]

/**
 * @internal
 */
export type FacetReducer<Input, Output> = (input: Input[]) => Output
