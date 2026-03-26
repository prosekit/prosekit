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
} from '@aria-ui-v2/core'
import {
  OpenChangeEvent,
  OverlayPositionerPropsDeclaration,
  updatePlacement,
  type OverlayPositionerProps,
} from '@aria-ui-v2/elements/overlay'
import { useAttribute, usePresence } from '@aria-ui-v2/utils'
import type { ReferenceElement } from '@floating-ui/dom'
import { once } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import type { Selection } from '@prosekit/pm/state'

import { useEditorFocusChangeEvent } from '../../../hooks/use-editor-focus-event-v2.ts'
import { useEditorUpdateEvent } from '../../../hooks/use-editor-update-event-v2.ts'
import { useKeymap } from '../../../hooks/use-keymap-v2.ts'

import { getVirtualSelectionElement } from './virtual-selection-element.ts'

/**
 * @public
 */
export interface InlinePopoverProps extends OverlayPositionerProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * Whether the popover is open by default when some inline content is
   * selected.
   *
   * When `defaultOpen` is true, the popover will open or close based on the
   * inline selection. When `defaultOpen` is false, the popover will never be
   * opened unless the `open` prop is true.
   *
   * @default true
   */
  defaultOpen: boolean

  /**
   * Whether the popover is open.
   *
   * Notice that the popover will be always hidden if the inline selection is
   * empty.
   *
   * @default false
   */
  open: boolean

  /**
   * Whether the inline popover should be dismissed when the editor receives an
   * Escape key press.
   *
   * @default true
   */
  dismissOnEscape: boolean

  /**
   * @default "top"
   */
  placement: OverlayPositionerProps['placement']

  /**
   * @default 12
   */
  offset: OverlayPositionerProps['offset']

  /**
   * @default true
   */
  hide: OverlayPositionerProps['hide']

  /**
   * @default true
   */
  overlap: OverlayPositionerProps['overlap']

  /**
   * @default true
   */
  inline: OverlayPositionerProps['inline']

  /**
   * @default 8
   */
  overflowPadding: OverlayPositionerProps['overflowPadding']
}

/** @internal */
export const InlinePopoverPropsDeclaration: PropsDeclaration<InlinePopoverProps> = /* @__PURE__ */ defineProps<InlinePopoverProps>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  defaultOpen: { default: true, attribute: 'default-open', type: 'boolean' },
  open: { default: false, attribute: 'open', type: 'boolean' },
  dismissOnEscape: { default: true, attribute: 'dismiss-on-escape', type: 'boolean' },

  placement: { default: 'top', attribute: 'placement', type: 'string' },
  offset: { default: 12, attribute: false, type: 'json' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
  overlap: { default: true, attribute: 'overlap', type: 'boolean' },
  inline: { default: true, attribute: 'inline', type: 'boolean' },
  overflowPadding: { default: 8, attribute: 'overflow-padding', type: 'number' },
})

/**
 * @public
 */
export interface InlinePopoverEvents {
  /**
   * Fired when the open state changes.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupInlinePopover(
  host: HostElement,
  props: Store<InlinePopoverProps>,
): void {
  const reference = createSignal<ReferenceElement | null>(null)
  const getHasReference = computed(() => !!reference.get())

  // Track editor focus state
  let editorFocused = false
  useEditorFocusChangeEvent(host, props.editor.get, (focus) => {
    editorFocused = focus
  })

  // Track selection changes and update virtual reference
  let prevSelection: Selection | undefined
  useEditorUpdateEvent(host, props.editor.get, (view) => {
    const isPopoverFocused = !editorFocused && host.contains(host.ownerDocument.activeElement)

    if (isPopoverFocused) {
      return
    }

    const { selection } = view.state
    const selectionUnchanged = prevSelection?.eq(selection)
    prevSelection = selection

    // Skip reference update if only the document content has changed, not the
    // selection itself.
    //
    // Example: If the user selects text and then applies mark bold using the
    // popover, the selection may widen, but we don't want to reposition the
    // popover.
    if (selectionUnchanged) {
      return
    }

    reference.set(getVirtualSelectionElement(view) || null)
  })

  // Auto-manage open state based on reference and defaultOpen
  useEffect(host, () => {
    const hasRef = getHasReference()
    const defaultOpenValue = props.defaultOpen.get()

    if (hasRef && defaultOpenValue) {
      props.open.set(true)
      host.dispatchEvent(new OpenChangeEvent(true))
    } else if (!hasRef) {
      props.open.set(false)
      host.dispatchEvent(new OpenChangeEvent(false))
    }
  })

  // Escape key handling
  useKeymap(host, props.editor.get, {
    Escape: () => {
      if (!props.dismissOnEscape.get() || !props.open.get()) {
        return false
      }
      props.open.set(false)
      host.dispatchEvent(new OpenChangeEvent(false))
      return true
    },
  })

  // Overlay positioning
  useEffect(host, () => {
    const openValue = props.open.get()
    const ref = reference.get()
    if (!openValue || !ref) return

    return updatePlacement(host, ref, {
      strategy: props.strategy.get(),
      placement: props.placement.get(),
      autoUpdate: props.autoUpdate.get(),
      hoist: props.hoist.get(),
      offset: props.offset.get(),
      flip: props.flip.get(),
      shift: props.shift.get(),
      overlap: props.overlap.get(),
      fitViewport: props.fitViewport.get(),
      sameWidth: props.sameWidth.get(),
      sameHeight: props.sameHeight.get(),
      inline: props.inline.get(),
      hide: props.hide.get(),
      boundary: props.boundary.get(),
      rootBoundary: props.rootBoundary.get(),
      overflowPadding: props.overflowPadding.get(),
      elementContext: props.elementContext.get(),
      altBoundary: props.altBoundary.get(),
    })
  })

  // Data-state attribute and presence
  useAttribute(host, 'data-state', () => (props.open.get() ? 'open' : 'closed'))
  usePresence(host, props.open.get)
}

const InlinePopoverElementBase: HostElementConstructor<InlinePopoverProps> = defineCustomElement(
  setupInlinePopover,
  InlinePopoverPropsDeclaration,
)

/**
 * @public
 */
export class InlinePopoverElement extends InlinePopoverElementBase {}

/**
 * @internal
 */
export const registerInlinePopoverElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-inline-popover', InlinePopoverElement)
})
