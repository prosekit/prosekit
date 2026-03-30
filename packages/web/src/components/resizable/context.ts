import { createContext, type Context } from '@aria-ui/core'

/**
 * @internal
 */
export const onResizeContext: Context<OnResize> = createContext<OnResize>(
  'prosekit/resizable/onResize',
)

/**
 * @internal
 */
export const onResizeStartContext: Context<OnResizeStart> = createContext<OnResizeStart>(
  'prosekit/resizable/onResizeStart',
)

/**
 * @internal
 */
export const onResizeEndContext: Context<OnResizeEnd> = createContext<OnResizeEnd>(
  'prosekit/resizable/onResizeEnd',
)

/**
 * @internal
 */
export type OnResize = ((width: number, height: number) => void) | null

/**
 * @internal
 */
export type OnResizeStart =
  | (() => readonly [width: number, height: number, aspectRatio: number])
  | null

/**
 * @internal
 */
export type OnResizeEnd = (() => void) | null
