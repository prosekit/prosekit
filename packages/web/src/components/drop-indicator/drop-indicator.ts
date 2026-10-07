import {
  computed,
  createSignal,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { usePresence } from '@aria-ui/utils'
import { computePosition, offset, type VirtualElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'
import { defineDropIndicator, type ShowHandlerOptions } from '@prosekit/extensions/drop-indicator'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { useScrolling } from '../../hooks/use-scrolling.ts'
import { assignStyles } from '../../utils/assign-styles.ts'

export interface DropIndicatorProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The line width in pixels.
   *
   * @default 2
   */
  width: number
}

/** @internal */
export const DropIndicatorPropsDeclaration: PropsDeclaration<DropIndicatorProps> = /* @__PURE__ */ defineProps<DropIndicatorProps>({
  editor: {
    default: null,
    attribute: false,
    type: 'json',
  },
  width: {
    default: 2,
    attribute: 'width',
    type: 'number',
  },
})

/**
 * @internal
 */
export function setupDropIndicator(
  host: HostElement,
  props: State<DropIndicatorProps>,
): void {
  type DropIndicatorContext = ShowHandlerOptions | null
  const context = createSignal<DropIndicatorContext>(null)

  const extension = defineDropIndicator({
    onShow: (options) => context.set(options),
    onHide: () => context.set(null),
  })

  useEditorExtension(host, props.editor.get, extension)

  const getScrolling = useScrolling(host)
  const getPresence = computed(() => !!context.get() && !getScrolling())
  usePresence(host, getPresence)

  useEffect(host, () => {
    const ctx = context.get()
    if (!ctx) return

    const { view, line } = ctx
    const lineWidth = props.width.get()
    const { p1, p2 } = line
    const horizontal = p1.y === p2.y

    // Use a Floating UI virtual element for the line so it's positioned relative
    // to the offset parent, not the (possibly transformed) viewport.
    const reference: VirtualElement = {
      getBoundingClientRect: () => ({
        x: p1.x,
        y: p1.y,
        left: p1.x,
        top: p1.y,
        right: p2.x,
        bottom: p2.y,
        width: p2.x - p1.x,
        height: p2.y - p1.y,
      }),
      contextElement: view.dom,
    }

    let cancelled = false
    void computePosition(reference, host, {
      // Anchor the host's leading edge to the line, then pull it back by half
      // the thickness so the line is centered on the drop point.
      placement: horizontal ? 'bottom-start' : 'right-start',
      middleware: [offset(-lineWidth / 2)],
    }).then(({ x, y }) => {
      if (cancelled) return
      assignStyles(host, {
        position: 'absolute',
        pointerEvents: 'none',
        width: `${horizontal ? p2.x - p1.x : lineWidth}px`,
        height: `${horizontal ? lineWidth : p2.y - p1.y}px`,
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      })
    })

    return () => {
      cancelled = true
    }
  })
}

const DropIndicatorElementBase: HostElementConstructor<DropIndicatorProps> = defineCustomElement(
  setupDropIndicator,
  DropIndicatorPropsDeclaration,
)

/**
 * `<prosekit-drop-indicator>` custom element.
 *
 * Properties: {@link DropIndicatorProps}
 */
export class DropIndicatorElement extends DropIndicatorElementBase {}

/**
 * @internal
 */
export function registerDropIndicatorElement(): void {
  registerCustomElement('prosekit-drop-indicator', DropIndicatorElement)
}
