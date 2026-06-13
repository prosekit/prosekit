import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import type { OpenChangeEvent } from '@aria-ui/elements/overlay'
import { OverlayRootPropsDeclaration, useOverlayStore, type OverlayRootProps } from '@aria-ui/elements/overlay'
import type { Editor } from '@prosekit/core'
import type { Selection } from '@prosekit/pm/state'

import { useEditorFocusChangeEvent } from '../../hooks/use-editor-focus-event.ts'
import { useEditorUpdateEvent } from '../../hooks/use-editor-update-event.ts'
import { useKeymap } from '../../hooks/use-keymap.ts'
import { resolveAnchor, type AnchorReference } from '../../utils/resolve-anchor.ts'

import { InlinePopoverStoreContext } from './store.ts'
import { getVirtualSelectionElement } from './virtual-selection-element.ts'

export interface InlinePopoverRootProps extends OverlayRootProps {
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
   * @default true
   */
  defaultOpen: boolean

  /**
   * Whether the inline popover should be dismissed when the editor receives an
   * Escape key press.
   *
   * @default true
   */
  dismissOnEscape: boolean

  /**
   * The reference to position the popover against. This can be a DOM element, a
   * Floating UI virtual element, or a function that returns either of them.
   *
   * When set, the popover is anchored to this reference instead of the current
   * text selection, and the text selection no longer drives the open state, so
   * control it with the `open` property.
   *
   * @default null
   */
  anchor: AnchorReference
}

/** @internal */
export const InlinePopoverRootPropsDeclaration: PropsDeclaration<InlinePopoverRootProps> = /* @__PURE__ */ defineProps<
  InlinePopoverRootProps
>({
  ...OverlayRootPropsDeclaration,
  editor: { default: null, attribute: false },
  defaultOpen: { default: true, attribute: 'default-open', type: 'boolean' },
  dismissOnEscape: { default: true, attribute: 'dismiss-on-escape', type: 'boolean' },
  anchor: { default: null, attribute: false },
})

export interface InlinePopoverRootEvents {
  /**
   * Emitted when the open state of the popover changes.
   */
  openChange: OpenChangeEvent
}

/** @internal */
export function setupInlinePopoverRoot(
  host: HostElement,
  props: State<InlinePopoverRootProps>,
): void {
  const store = useOverlayStore(host, props)
  InlinePopoverStoreContext.provide(host, store)

  // Custom-anchor mode: the consumer supplies the reference element and controls
  // the open state. Re-runs whenever the `anchor` property changes.
  useEffect(host, () => {
    const anchor = resolveAnchor(props.anchor.get())
    if (!anchor) return
    store.setAnchorElement(anchor)
  })

  let editorFocused = false
  useEditorFocusChangeEvent(host, props.editor.get, (focus) => {
    editorFocused = focus
  })

  // Selection mode (default): only active while no custom anchor is set.
  let prevSelection: Selection | undefined
  useEditorUpdateEvent(host, props.editor.get, (view) => {
    if (props.anchor.get()) return

    const isPopoverFocused = !editorFocused && host.contains(host.ownerDocument.activeElement)
    if (isPopoverFocused) return

    const { selection } = view.state
    if (prevSelection?.eq(selection)) return
    prevSelection = selection

    const reference = getVirtualSelectionElement(view)
    store.setAnchorElement(reference)

    if (reference && props.defaultOpen.get()) {
      store.requestOpenChange(true)
    } else if (!reference) {
      store.requestOpenChange(false)
    }
  })

  useKeymap(host, props.editor.get, {
    Escape: () => {
      if (!props.dismissOnEscape.get() || !store.getIsOpen()) return false
      store.requestOpenChange(false)
      return true
    },
  })
}

const InlinePopoverRootElementBase: HostElementConstructor<InlinePopoverRootProps> = defineCustomElement(
  setupInlinePopoverRoot,
  InlinePopoverRootPropsDeclaration,
)

/**
 * `<prosekit-inline-popover-root>` custom element.
 *
 * Properties: {@link InlinePopoverRootProps}
 *
 * Events: {@link InlinePopoverRootEvents}
 */
export class InlinePopoverRootElement extends InlinePopoverRootElementBase {}

/** @internal */
export function registerInlinePopoverRootElement(): void {
  registerCustomElement('prosekit-inline-popover-root', InlinePopoverRootElement)
}
