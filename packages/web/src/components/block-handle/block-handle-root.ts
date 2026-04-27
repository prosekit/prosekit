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
import { createOverlayStore } from '@aria-ui/elements/overlay'
import type { VirtualElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

import { useScrolling } from '../../hooks/use-scrolling.ts'

import { blockHandleOverlayStoreContext, BlockHandleStore, blockHandleStoreContext } from './context.ts'
import { useHasTextSelection } from './use-has-text-selection.ts'
import { useHoverExtension } from './use-hover-extension.ts'

export interface BlockHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

/** @internal */
export const BlockHandleRootPropsDeclaration: PropsDeclaration<BlockHandleRootProps> = /* @__PURE__ */ defineProps<
  BlockHandleRootProps
>({
  editor: { default: null, attribute: false },
})

/**
 * @public
 */
export class BlockHandleStateChangeEvent extends Event {
  /**
   * The currently hovered block's node and position, or `null` if no block is hovered.
   */
  detail: { node: ProseMirrorNode; pos: number } | null
  constructor(state: { node: ProseMirrorNode; pos: number } | null) {
    super('stateChange', { bubbles: true })
    this.detail = state
  }
}

/**
 * @public
 */
export interface BlockHandleRootEvents {
  /**
   * Fired when the hovered block changes.
   */
  stateChange: BlockHandleStateChangeEvent
}

/**
 * @internal
 */
export function setupBlockHandleRoot(
  host: HostElement,
  props: State<BlockHandleRootProps>,
): void {
  const getEditor = props.editor.get

  const store = new BlockHandleStore()
  blockHandleStoreContext.provide(host, store)

  const reference = createSignal<VirtualElement | undefined>(undefined)
  const getScrolling = useScrolling(host)
  // Hide the block handle when there is a text selection to avoid the block handle overlapping with inline menu
  const getHasTextSelection = useHasTextSelection(host, getEditor)

  const getOpen = computed(() => !!store.hoverState.get() && !getScrolling() && !getHasTextSelection())

  const overlayStore = createOverlayStore(
    getOpen,
    () => {},
    () => true,
    () => false,
    (event) => host.dispatchEvent(event),
  )

  useHoverExtension(host, getEditor, (ref, hoverState) => {
    reference.set(ref ?? undefined)
    store.hoverState.set(hoverState)
    const state = hoverState ? { node: hoverState.node, pos: hoverState.pos } : null
    host.dispatchEvent(new BlockHandleStateChangeEvent(state))
  })

  useEffect(host, () => {
    overlayStore.setAnchorElement(reference.get())
  })

  blockHandleOverlayStoreContext.provide(host, overlayStore)
}

const BlockHandleRootElementBase: HostElementConstructor<BlockHandleRootProps> = defineCustomElement(
  setupBlockHandleRoot,
  BlockHandleRootPropsDeclaration,
)

/**
 * `<prosekit-block-handle-root>` custom element.
 *
 * Properties: {@link BlockHandleRootProps}
 *
 * Events: {@link BlockHandleRootEvents}
 */
export class BlockHandleRootElement extends BlockHandleRootElementBase {}

/** @internal */
export function registerBlockHandleRootElement(): void {
  registerCustomElement('prosekit-block-handle-root', BlockHandleRootElement)
}
