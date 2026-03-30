import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEventListener,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui/core'
import { once } from '@ocavue/utils'
import { insertDefaultBlock, type Editor } from '@prosekit/core'

import { blockHandleStoreContext } from './context.ts'

export interface BlockHandleAddProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

/** @internal */
export const BlockHandleAddPropsDeclaration: PropsDeclaration<BlockHandleAddProps> = /* @__PURE__ */ defineProps<BlockHandleAddProps>({
  editor: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupBlockHandleAdd(
  host: HostElement,
  props: Store<BlockHandleAddProps>,
): void {
  const getStore = blockHandleStoreContext.consume(host)

  useEventListener(host, 'pointerdown', (event) => {
    event.preventDefault()

    const store = getStore()
    const editor = props.editor.get()
    const hoverState = store?.hoverState.get()
    if (!editor || !hoverState) {
      return
    }

    const { node, pos } = hoverState
    editor.exec(insertDefaultBlock({ pos: pos + node.nodeSize }))
    editor.focus()

    // Hide the drag handle
    store?.hoverState.set(null)
  })
}

const BlockHandleAddElementBase: HostElementConstructor<BlockHandleAddProps> = defineCustomElement(
  setupBlockHandleAdd,
  BlockHandleAddPropsDeclaration,
)

/**
 * @public
 */
export class BlockHandleAddElement extends BlockHandleAddElementBase {}

/** @internal */
export const registerBlockHandleAddElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-block-handle-add', BlockHandleAddElement)
})
