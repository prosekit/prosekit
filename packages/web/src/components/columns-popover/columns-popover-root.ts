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
import { isHTMLElement } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import { findParentColumn } from '@prosekit/extensions/columns'
import type { Selection } from '@prosekit/pm/state'

import { useEditorFocusChangeEvent } from '../../hooks/use-editor-focus-event.ts'
import { useEditorUpdateEvent } from '../../hooks/use-editor-update-event.ts'

import { columnsPopoverStoreContext } from './store.ts'

export interface ColumnsPopoverRootProps extends OverlayRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * Whether the popover is open by default when the cursor is inside a column.
   *
   * @default true
   */
  defaultOpen: boolean

  /**
   * Whether the columns popover should be dismissed when the editor receives
   * an Escape key press.
   *
   * @default true
   */
  dismissOnEscape: boolean
}

/** @internal */
export const ColumnsPopoverRootPropsDeclaration: PropsDeclaration<ColumnsPopoverRootProps> = /* @__PURE__ */ defineProps<
  ColumnsPopoverRootProps
>({
  ...OverlayRootPropsDeclaration,
  editor: { default: null, attribute: false },
  defaultOpen: { default: true, attribute: 'default-open', type: 'boolean' },
  dismissOnEscape: { default: true, attribute: 'dismiss-on-escape', type: 'boolean' },
})

export interface ColumnsPopoverRootEvents {
  /**
   * Emitted when the open state of the popover changes.
   */
  openChange: OpenChangeEvent
}

/** @internal */
export function setupColumnsPopoverRoot(
  host: HostElement,
  props: State<ColumnsPopoverRootProps>,
): void {
  const store = useOverlayStore(host, props)
  columnsPopoverStoreContext.provide(host, store)

  useEditorFocusChangeEvent(host, props.editor.get, (focus) => {
    if (!focus) {
      store.setAnchorElement(undefined)
      store.requestOpenChange(false)
    }
  })

  let prevSelection: Selection | undefined
  useEditorUpdateEvent(host, props.editor.get, (view) => {
    if (view.isDestroyed) return

    const { selection } = view.state
    if (prevSelection?.eq(selection)) return
    prevSelection = selection

    const found = findParentColumn(selection.$anchor)
    if (!found) {
      store.setAnchorElement(undefined)
      store.requestOpenChange(false)
      return
    }

    const dom = view.nodeDOM(found.pos)
    if (dom && isHTMLElement(dom)) {
      store.setAnchorElement(dom)
      if (props.defaultOpen.get()) {
        store.requestOpenChange(true)
      }
    } else {
      store.setAnchorElement(undefined)
      store.requestOpenChange(false)
    }
  })
}

const ColumnsPopoverRootElementBase: HostElementConstructor<ColumnsPopoverRootProps> = defineCustomElement(
  setupColumnsPopoverRoot,
  ColumnsPopoverRootPropsDeclaration,
)

/**
 * `<prosekit-columns-popover-root>` custom element.
 *
 * Properties: {@link ColumnsPopoverRootProps}
 *
 * Events: {@link ColumnsPopoverRootEvents}
 */
export class ColumnsPopoverRootElement extends ColumnsPopoverRootElementBase {}

/** @internal */
export function registerColumnsPopoverRootElement(): void {
  registerCustomElement('prosekit-columns-popover-root', ColumnsPopoverRootElement)
}
