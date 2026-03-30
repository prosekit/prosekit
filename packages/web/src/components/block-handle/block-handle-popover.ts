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
  type Store,
} from '@aria-ui/core'
import {
  createOverlayStore,
  OverlayPositionerPropsDeclaration,
  setupOverlayPositioner,
  type OverlayPositionerProps,
} from '@aria-ui/elements/overlay'
import { useAttribute, usePresence } from '@aria-ui/utils'
import type { Placement, VirtualElement } from '@floating-ui/dom'
import { once } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { useScrolling } from '../../hooks/use-scrolling.ts'

import { BlockHandleStore, blockHandleStoreContext, type HoverState } from './context.ts'
import { defineElementHoverHandler, type ElementHoverHandler } from './pointer-move.ts'

export interface BlockHandlePopoverProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the hovered block.
   *
   * @default "left"
   */
  placement: Placement

  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean

  /**
   * @default false
   * @hidden
   */
  flip: boolean

  /**
   * @default false
   * @hidden
   */
  shift: boolean

  /**
   * @default true
   * @hidden
   */
  hide: boolean
}

/** @internal */
export const BlockHandlePopoverPropsDeclaration: PropsDeclaration<BlockHandlePopoverProps> = /* @__PURE__ */ defineProps<
  BlockHandlePopoverProps
>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  placement: { default: 'left', attribute: 'placement', type: 'string' },
  // Enabling `hoist` will cause the popover to have a small delay when
  // scrolling the page.
  hoist: { default: false, attribute: 'hoist', type: 'boolean' },
  flip: { default: false, attribute: false, type: 'json' },
  shift: { default: false, attribute: 'shift', type: 'boolean' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
})

/**
 * @public
 */
export class BlockHandlePopoverStateChangeEvent extends Event {
  state: { node: ProseMirrorNode; pos: number } | null
  constructor(state: { node: ProseMirrorNode; pos: number } | null) {
    super('stateChange', { bubbles: true })
    this.state = state
  }
}

/**
 * @public
 */
export interface BlockHandlePopoverEvents {
  /**
   * Fired when the hovered block changes.
   */
  stateChange: BlockHandlePopoverStateChangeEvent
}

/**
 * @internal
 */
export function setupBlockHandlePopover(
  host: HostElement,
  props: Store<BlockHandlePopoverProps>,
): void {
  const getEditor = props.editor.get

  const store = new BlockHandleStore()
  blockHandleStoreContext.provide(host, store)

  const reference = createSignal<VirtualElement | undefined>(undefined)
  const getScrolling = useScrolling(host)

  const getOpen = computed(() => !!store.hoverState.get() && !getScrolling())

  // Create overlay store for positioning
  const overlayStore = createOverlayStore(
    getOpen,
    () => {},
    () => true,
    () => false,
    (event) => host.dispatchEvent(event),
  )

  // Sync anchor element from reference
  useEffect(host, () => {
    overlayStore.setAnchorElement(reference.get())
  })

  // Setup overlay positioning
  setupOverlayPositioner(host, props as unknown as Store<OverlayPositionerProps>, () => overlayStore)

  // Hover extension
  useHoverExtension(host, getEditor, (ref, hoverState) => {
    reference.set(ref ?? undefined)
    store.hoverState.set(hoverState)
    const state = hoverState ? { node: hoverState.node, pos: hoverState.pos } : null
    host.dispatchEvent(new BlockHandlePopoverStateChangeEvent(state))
  })

  useAttribute(host, 'data-state', () => (getOpen() ? 'open' : 'closed'))
  usePresence(host, getOpen)
}

function useHoverExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  handler: ElementHoverHandler,
) {
  let prevHoverState: HoverState | null = null

  const extension = defineElementHoverHandler((reference, hoverState) => {
    if (isHoverStateEqual(prevHoverState, hoverState)) {
      return
    }

    prevHoverState = hoverState
    handler(reference, hoverState)
  })

  useEditorExtension(host, getEditor, extension)
}

function isHoverStateEqual(a: HoverState | null, b: HoverState | null) {
  return (!a && !b) || (a && b && a.pos === b.pos && a.node.eq(b.node))
}

const BlockHandlePopoverElementBase: HostElementConstructor<BlockHandlePopoverProps> = defineCustomElement(
  setupBlockHandlePopover,
  BlockHandlePopoverPropsDeclaration,
)

/**
 * @public
 */
export class BlockHandlePopoverElement extends BlockHandlePopoverElementBase {}

/** @internal */
export const registerBlockHandlePopoverElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-block-handle-popover', BlockHandlePopoverElement)
})
