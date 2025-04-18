import {
  createContext,
  type Context,
} from '@aria-ui/core'

/**
 * @internal
 */
export const onResizeContext: Context<OnResize> = createContext(
  'prosekit/resizable/onResize',
  null,
)

/**
 * @internal
 */
export const onResizeStartContext: Context<OnResizeStart> = createContext(
  'prosekit/resizable/onResizeStart',
  null,
)

/**
 * @internal
 */
export const onResizeEndContext: Context<OnResizeEnd> = createContext(
  'prosekit/resizable/onResizeEnd',
  null,
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
