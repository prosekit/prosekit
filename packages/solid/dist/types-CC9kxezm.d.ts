import { Accessor, JSX, JSXElement } from "solid-js";

//#region src/types.d.ts
/**
* @internal
*/
/**
* @internal
*/
type PropsWithClass<P = unknown> = P & {
  class?: string | undefined;
};
/**
* @internal
*/
type PropsWithChildren<P = unknown> = P & {
  children?: JSXElement | undefined;
};
/**
* @internal
*/
type PropsWithElement<Props extends object, CustomElement extends HTMLElement> = Props & JSX.HTMLAttributes<CustomElement>;
/**
* T or a reactive/non-reactive function returning T
*/
type MaybeAccessor<T> = T | Accessor<T>;

//#endregion
/**
* Accessed value of a MaybeAccessor
*
* @example
*
* ```ts
* MaybeAccessorValue<MaybeAccessor<string>>
* // => string
* MaybeAccessorValue<MaybeAccessor<() => string>>
* // => string | (() => string)
* MaybeAccessorValue<MaybeAccessor<string> | Function>
* // => string | void
* ```
*/
export { MaybeAccessor, PropsWithChildren, PropsWithClass, PropsWithElement };