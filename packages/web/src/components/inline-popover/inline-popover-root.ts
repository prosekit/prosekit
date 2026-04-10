import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
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

import { InlinePopoverStoreContext } from './store.ts'
import { getVirtualSelectionElement } from './virtual-selection-element.ts'

/**
 * @public
 */
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
}

/** @internal */
export const InlinePopoverRootPropsDeclaration: PropsDeclaration<InlinePopoverRootProps> = /* @__PURE__ */ defineProps<
  InlinePopoverRootProps
>({
  ...OverlayRootPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  defaultOpen: { default: true, attribute: 'default-open', type: 'boolean' },
  dismissOnEscape: { default: true, attribute: 'dismiss-on-escape', type: 'boolean' },
})

/**
 * @public
 */
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

  let editorFocused = false
  useEditorFocusChangeEvent(host, props.editor.get, (focus) => {
    editorFocused = focus
  })

  let prevSelection: Selection | undefined
  useEditorUpdateEvent(host, props.editor.get, (view) => {
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
 * @public
 */
export class InlinePopoverRootElement extends InlinePopoverRootElementBase {}

/** @internal */
export function registerInlinePopoverRootElement(): void {
  registerCustomElement('prosekit-inline-popover-root', InlinePopoverRootElement)
}
