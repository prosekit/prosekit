import { Fragment, Slice } from 'prosekit/pm/model'
import { NodeSelection } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/solid'
import { BlockHandleAdd, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot } from 'prosekit/solid/block-handle'
import type { BlockHandleState, BlockHandleStateChangeEvent } from 'prosekit/web/block-handle'
import { createSignal } from 'solid-js'
import type { JSX } from 'solid-js'

export default function BlockSideMenu(): JSX.Element {
  const editor = useEditor()
  const [blockState, setBlockState] = createSignal<BlockHandleState>(null)
  const [menuOpen, setMenuOpen] = createSignal(false)
  const stateLabel = () => {
    const state = blockState()
    return state ? `${state.node.type.name}:${state.pos}` : 'none'
  }
  const isMenuOpen = () => menuOpen() && !!blockState()

  const handleStateChange = (event: BlockHandleStateChangeEvent) => {
    setBlockState(event.detail)
    if (!event.detail) {
      setMenuOpen(false)
    }
  }

  const selectBlock = () => {
    const state = blockState()
    const editorInstance = editor()
    if (!state || !editorInstance.view) {
      return
    }

    const { view } = editorInstance
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, state.pos)))
    requestAnimationFrame(() => view.focus())
  }

  const handleDragStart = (event: DragEvent) => {
    const state = blockState()
    const editorInstance = editor()
    if (!state || !editorInstance.view || !event.dataTransfer) {
      return
    }

    const { view } = editorInstance
    const element = view.nodeDOM(state.pos)
    if (!(element instanceof HTMLElement)) {
      return
    }

    view.dom.classList.add('prosekit-dragging')
    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', element.outerHTML)
    event.dataTransfer.effectAllowed = 'copyMove'
    view.dragging = {
      slice: new Slice(Fragment.from(state.node), 0, 0),
      move: true,
    }
  }

  const handleDragEnd = () => {
    editor().view?.dom.classList.remove('prosekit-dragging')
  }

  return (
    <BlockHandleRoot onStateChange={handleStateChange} attr:data-block-side-menu-state={stateLabel()}>
      <BlockHandlePositioner class="CSS_BLOCK_HANDLE_POSITIONER">
        <BlockHandlePopup class="CSS_BLOCK_HANDLE_POPUP">
          <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
            <div class="CSS_ICON_PLUS" />
          </BlockHandleAdd>
          <div
            attr:data-testid="block-side-menu-drag"
            class="CSS_BLOCK_HANDLE_DRAG"
            draggable
            onPointerDown={selectBlock}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={() => setMenuOpen(open => !open)}
          >
            <div class="CSS_ICON_DRAG_HANDLE" />
          </div>
          <div
            attr:data-testid="block-side-menu"
            class="CSS_BLOCK_SIDE_MENU"
            attr:data-state={isMenuOpen() ? 'open' : 'closed'}
            role="menu"
            hidden={!isMenuOpen()}
          >
            <button class="CSS_BLOCK_SIDE_MENU_ITEM" type="button" role="menuitem" onClick={() => setMenuOpen(false)}>
              {blockState() ? `Block ${blockState()!.node.type.name}` : 'Block'}
            </button>
          </div>
        </BlockHandlePopup>
      </BlockHandlePositioner>
    </BlockHandleRoot>
  )
}
