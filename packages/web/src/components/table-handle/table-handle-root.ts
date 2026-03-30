import {
  computed,
  createSignal,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui/core'
import { once } from '@ocavue/utils'
import { defineDOMEventHandler, type Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { useEditorTyping } from '../../hooks/use-editor-typing.ts'
import { useScrolling } from '../../hooks/use-scrolling.ts'
import { useSelecting } from '../../hooks/use-selecting.ts'

import { TableHandleStore, tableHandleStoreContext } from './store.ts'
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
  props: Store<TableHandleRootProps>,
): void {
  const getEditor = props.editor.get

  const getHoveringCellInfo = useHoveringCell(host, getEditor)
  const getTyping = useEditorTyping(host, getEditor)
  const getIsInTable = computed(() => !!getHoveringCellInfo())
  const getSelecting = useSelecting(host, getEditor, getIsInTable)
  const getScrolling = useScrolling(host)

  const getCanShow = computed(() => !getTyping() && !getSelecting() && !getScrolling())
  const getVisibleCell = computed(() => getCanShow() ? getHoveringCellInfo() : null)

  const store = new TableHandleStore(getVisibleCell)
  tableHandleStoreContext.provide(host, store)

  useDrop(host, getEditor, store)
}

function useHoveringCell(
  host: HostElement,
  getEditor: () => Editor | null,
): () => HoveringCellInfo | null {
  const hoveringCell = createSignal<HoveringCellInfo | null>(null)

  const extension = defineCellHoverHandler((curr: HoveringCellInfo | null) => {
    const prev = hoveringCell.get()
    if (!isHoveringCellInfoEqual(prev, curr)) {
      hoveringCell.set(curr)
    }
  })

  useEditorExtension(host, getEditor, extension)

  return hoveringCell.get
}

function defineCellHoverHandler(
  handler: (hoveringCell: HoveringCellInfo | null) => void,
) {
  const pointerHandler = (view: EditorView, event: PointerEvent) => {
    const hoveringCell = getHoveringCell(view, event)
    return handler(hoveringCell ?? null)
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
export const registerTableHandleRootElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-root', TableHandleRootElement)
})
