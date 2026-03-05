import { Accessor, JSX, JSXElement } from "solid-js";

//#region src/types.d.ts
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
export { PropsWithElement as i, PropsWithChildren as n, PropsWithClass as r, MaybeAccessor as t };
//# sourceMappingURL=types-Bx9mKDTJ.d.ts.map