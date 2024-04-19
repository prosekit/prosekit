import { createContext } from '@aria-ui/core'

/**
 * @internal
 */
export const onResizeContext = createContext<OnResize>(
  'prosekit/resizable/onResize',
  null,
)

/**
 * @internal
 */
export const onResizeStartContext = createContext<OnResizeStart>(
  'prosekit/resizable/onResizeStart',
  null,
)

/**
 * @internal
 */
export const onResizeEndContext = createContext<OnResizeEnd>(
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
