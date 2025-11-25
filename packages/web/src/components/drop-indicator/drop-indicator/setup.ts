import {
  createComputed,
  createSignal,
  useEffect,
  type ConnectableElement,
  type SetupOptions,
} from '@aria-ui/core'
import { usePresence } from '@aria-ui/presence'
import {
  defineDropIndicator,
  type ShowHandlerOptions,
} from '@prosekit/extensions/drop-indicator'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import { useScrolling } from '../../../hooks/use-scrolling'
import { assignStyles } from '../../../utils/assign-styles'

import type {
  DropIndicatorEvents,
  DropIndicatorProps,
} from './types'

/**
 * @internal
 */
export function useDropIndicator(
  host: ConnectableElement,
  { state }: SetupOptions<DropIndicatorProps, DropIndicatorEvents>,
): void {
  type DropIndicatorContext = ShowHandlerOptions | null
  const context = createSignal<DropIndicatorContext>(null)

  const extension = defineDropIndicator({
    onShow: (options) => context.set(options),
    onHide: () => context.set(null),
  })

  useEditorExtension(host, state.editor, extension)

  const line = createComputed(() => context.get()?.line)
  const scrolling = useScrolling(host)
  const presence = createComputed(() => {
    return !!context.get() && !scrolling.get()
  })
  usePresence(host, presence)

  useEffect(
    host,
    () => {
      const lineValue = line.get()
      const lineWidth = state.width.get()

      if (!lineValue) return

      const { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } } = lineValue
      const horizontal = y1 === y2

      let width: number
      let height: number
      let top: number = y1
      let left: number = x1

      if (horizontal) {
        width = x2 - x1
        height = lineWidth
        top -= lineWidth / 2
      } else {
        width = lineWidth
        height = y2 - y1
        left -= lineWidth / 2
      }

      top = Math.round(top)
      left = Math.round(left)

      assignStyles(host, {
        position: 'fixed',
        pointerEvents: 'none',
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${left}px, ${top}px)`,
        left: '0px',
        top: '0px',
      })
    },
  )
}
