import {
  computed,
  createSignal,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { defineDOMEventHandler, type Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { useEditorTyping } from '../../hooks/use-editor-typing.ts'
import { useScrolling } from '../../hooks/use-scrolling.ts'
import { useSelecting } from '../../hooks/use-selecting.ts'

import { createTableHandleStore, tableHandleStoreContext } from './store.ts'
import { useDrop } from './use-drop.ts'
import { getHoveringCell, isHoveringCellInfoEqual, type HoveringCellInfo } from './utils.ts'

export interface TableHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

/** @internal */
export const TableHandleRootPropsDeclaration: PropsDeclaration<TableHandleRootProps> = defineProps<TableHandleRootProps>({
  editor: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupTableHandleRoot(
  host: HostElement,
  props: State<TableHandleRootProps>,
): void {
  const getEditor = props.editor.get

  const getHoveringCellInfo = useHoveringCell(host, getEditor)
  const getTyping = useEditorTyping(host, getEditor)
  const getIsInTable = computed(() => !!getHoveringCellInfo())
  const getSelecting = useSelecting(host, getEditor, getIsInTable)
  const getScrolling = useScrolling(host)
  const getCanShow = computed(() => !getTyping() && !getSelecting() && !getScrolling())

  const store = createTableHandleStore(getHoveringCellInfo, getCanShow)
  tableHandleStoreContext.provide(host, store)

  useDrop(host, getEditor, store)
}

function useHoveringCell(
  host: HostElement,
  getEditor: () => Editor | null,
): () => HoveringCellInfo | undefined {
  const hoveringCell = createSignal<HoveringCellInfo | undefined>(undefined)

  const extension = defineCellHoverHandler((curr: HoveringCellInfo | undefined) => {
    const prev = hoveringCell.get()
    if (isHoveringCellInfoEqual(prev, curr)) return
    hoveringCell.set(curr)
  })

  useEditorExtension(host, getEditor, extension)

  return hoveringCell.get
}

function defineCellHoverHandler(
  handler: (hoveringCell: HoveringCellInfo | undefined) => void,
) {
  const pointerHandler = (view: EditorView, event: PointerEvent) => {
    const hoveringCell = getHoveringCell(view, event)
    return handler(hoveringCell)
  }
  return defineDOMEventHandler('pointerover', pointerHandler)
}

const TableHandleRootElementBase: HostElementConstructor<TableHandleRootProps> = defineCustomElement(
  setupTableHandleRoot,
  TableHandleRootPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleRootElement extends TableHandleRootElementBase {}

/**
 * @internal
 */
export function registerTableHandleRootElement(): void {
  registerCustomElement('prosekit-table-handle-root', TableHandleRootElement)
}
