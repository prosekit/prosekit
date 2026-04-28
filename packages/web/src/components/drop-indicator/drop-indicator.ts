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

  const getLine = computed(() => context.get()?.line)
  const getScrolling = useScrolling(host)
  const getPresence = computed(() => !!context.get() && !getScrolling())
  usePresence(host, getPresence)

  useEffect(host, () => {
    const lineValue = getLine()
    const lineWidth = props.width.get()

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
