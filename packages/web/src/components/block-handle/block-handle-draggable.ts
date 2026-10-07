import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { useAttribute, useEventListener } from '@aria-ui/utils'
import { isHTMLElement } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import type { ViewDragging } from '@prosekit/extensions/drop-indicator'
import { Fragment, Slice } from '@prosekit/pm/model'
import { NodeSelection } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { DRAGGING_CLASS_NAME } from '../../constants.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { blockHandleStoreContext } from './context.ts'
import type { HoverState } from './hover-state.ts'
import { setDragPreview } from './set-drag-preview.ts'

export interface BlockHandleDraggableProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

/** @internal */
export const BlockHandleDraggablePropsDeclaration: PropsDeclaration<BlockHandleDraggableProps> = /* @__PURE__ */ defineProps<
  BlockHandleDraggableProps
>({
  editor: { default: null, attribute: false },
})

/**
 * @internal
 */
export function setupBlockHandleDraggable(
  host: HostElement,
  props: State<BlockHandleDraggableProps>,
): void {
  const getStore = blockHandleStoreContext.consume(host)

  onMount(host, () => {
    host.draggable = true
  })

  usePointerDownHandler(host, () => getStore()?.hoverState.get() ?? null, props.editor.get)

  useEventListener(host, 'dragstart', (event) => {
    const store = getStore()
    store?.dragging.set(true)

    const view = getSafeEditorView(props.editor.get())
    const hoverState = store?.hoverState.get()

    if (view && hoverState) {
      view.dom.classList.add(DRAGGING_CLASS_NAME)
      startViewDragging(view, hoverState, event)
    }
  })

  useEventListener(host, 'dragend', () => {
    const store = getStore()
    store?.dragging.set(false)

    const view = getSafeEditorView(props.editor.get())
    if (view) {
      view.dom.classList.remove(DRAGGING_CLASS_NAME)
      clearViewDragging(view)
    }
  })

  useAttribute(host, 'data-dragging', () => (getStore()?.dragging.get() ? '' : undefined))
}

function usePointerDownHandler(
  host: HostElement,
  getHoverState: () => HoverState | null,
  getEditor: () => Editor | null,
) {
  useEventListener(host, 'pointerdown', () => {
    const hoverState = getHoverState()
    const editor = getEditor()

    if (hoverState?.pos == null) {
      return
    }

    const view = editor?.view
    if (!view || view.isDestroyed) {
      return
    }

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, hoverState.pos)),
    )

    // Clicking the handle will blur the editor, so we need to focus it again.
    // We cannot call `event.preventDefault()` here to prevent the blur
    // because it will prevent the drag event from firing.
    requestAnimationFrame(() => {
      if (view.isDestroyed) {
        return
      }
      view.focus()
    })
  })
}

function startViewDragging(view: EditorView, hoverState: HoverState, event: DragEvent): void {
  const { node, pos } = hoverState

  // Serialize through the editor's clipboard pipeline so the transfer carries
  // the `data-pm-slice` envelope and a plain-text fallback: a drop into
  // another editor parses the transfer data and never sees this view's
  // `dragging` state.
  const { dom, text, slice } = view.serializeForClipboard(new Slice(Fragment.from(node), 0, 0))

  if (event.dataTransfer) {
    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', dom.innerHTML)
    event.dataTransfer.setData('text/plain', text)
    event.dataTransfer.effectAllowed = 'copyMove'

    const element = view.nodeDOM(pos)
    if (element && isHTMLElement(element)) {
      setDragPreview(event, element)
    }
  }

  const dragging: ViewDragging = {
    slice,
    move: true,
    node: NodeSelection.create(view.state.doc, pos),
  }

  view.dragging = dragging
}

function clearViewDragging(view: EditorView): void {
  const dragging = view.dragging
  if (!dragging) {
    return
  }

  // The handle lives outside `view.dom`, so ProseMirror's own dragend handler
  // never fires for handle drags; without this, a cross-editor drop or a
  // canceled drag would leave a stale `dragging` on the source view. Delay
  // like ProseMirror does, in case a same-view drop is still being processed.
  window.setTimeout(() => {
    if (view.dragging === dragging) {
      view.dragging = null
    }
  }, 50)
}

const BlockHandleDraggableElementBase: HostElementConstructor<BlockHandleDraggableProps> = defineCustomElement(
  setupBlockHandleDraggable,
  BlockHandleDraggablePropsDeclaration,
)

/**
 * `<prosekit-block-handle-draggable>` custom element.
 *
 * Properties: {@link BlockHandleDraggableProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-dragging` | Present when the element is being dragged |
 */
export class BlockHandleDraggableElement extends BlockHandleDraggableElementBase {}

/** @internal */
export function registerBlockHandleDraggableElement(): void {
  registerCustomElement('prosekit-block-handle-draggable', BlockHandleDraggableElement)
}
