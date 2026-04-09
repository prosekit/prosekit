import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEventListener,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { useAttribute } from '@aria-ui/utils'
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
  editor: { default: null, attribute: false, type: 'json' },
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
      createDraggingPreview(view, hoverState, event)
      setViewDragging(view, hoverState)
    }
  })

  useEventListener(host, 'dragend', () => {
    const store = getStore()
    store?.dragging.set(false)

    const view = getSafeEditorView(props.editor.get())
    if (view) {
      view.dom.classList.remove(DRAGGING_CLASS_NAME)
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

    if (hoverState?.pos == null || !editor?.view) {
      return
    }

    const { view } = editor
    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, hoverState.pos)),
    )

    // Clicking the handle will blur the editor, so we need to focus it again.
    // We cannot call `event.preventDefault()` here to prevent the blur
    // because it will prevent the drag event from firing.
    requestAnimationFrame(() => {
      view.focus()
    })
  })
}

function createDraggingPreview(view: EditorView, hoverState: HoverState, event: DragEvent): void {
  if (!event.dataTransfer) {
    return
  }

  const { pos } = hoverState

  const element = view.nodeDOM(pos)
  if (!element || !isHTMLElement(element)) {
    return
  }

  event.dataTransfer.clearData()
  event.dataTransfer.setData('text/html', element.outerHTML)
  event.dataTransfer.effectAllowed = 'copyMove'
  setDragPreview(event, element)

  return
}

function setViewDragging(view: EditorView, hoverState: HoverState): void {
  const { node, pos } = hoverState

  const dragging: ViewDragging = {
    slice: new Slice(Fragment.from(node), 0, 0),
    move: true,
    node: NodeSelection.create(view.state.doc, pos),
  }

  view.dragging = dragging
}

const BlockHandleDraggableElementBase: HostElementConstructor<BlockHandleDraggableProps> = defineCustomElement(
  setupBlockHandleDraggable,
  BlockHandleDraggablePropsDeclaration,
)

/**
 * @public
 */
export class BlockHandleDraggableElement extends BlockHandleDraggableElementBase {}

/** @internal */
export function registerBlockHandleDraggableElement(): void {
  registerCustomElement('prosekit-block-handle-draggable', BlockHandleDraggableElement)
}
