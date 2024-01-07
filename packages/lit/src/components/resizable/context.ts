import { createContext } from '@lit/context'

/**
 * @internal
 */
export interface ResizableContext {
  onResizeStart: () => readonly [
    width: number,
    height: number,
    aspectRatio: number,
  ]
  onResize: (width: number, height: number) => void
  onResizeEnd: () => void
}

/**
 * @internal
 */
export const resizableContext = createContext<ResizableContext>(
  'prosekit-resizable-context',
)
