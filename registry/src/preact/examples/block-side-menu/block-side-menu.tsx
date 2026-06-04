import { useState } from 'preact/hooks'
import { Fragment, Slice } from 'prosekit/pm/model'
import { NodeSelection } from 'prosekit/pm/state'
import type { EditorView } from 'prosekit/pm/view'
import { useEditor } from 'prosekit/preact'
import { BlockHandleAdd, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot } from 'prosekit/preact/block-handle'
import type { BlockHandleState, BlockHandleStateChangeEvent } from 'prosekit/web/block-handle'

import type { EditorExtension } from '../block-handle/extension.ts'

type ActiveBlockHandleState = Exclude<BlockHandleState, null>

function setViewDragging(view: EditorView, state: ActiveBlockHandleState) {
  view.dragging = {
    slice: new Slice(Fragment.from(state.node), 0, 0),
    move: true,
  }
}

function isSameBlockState(a: BlockHandleState, b: BlockHandleState) {
  if (!a || !b) {
    return a === b
  }

  return a.pos === b.pos && a.node.eq(b.node)
}

export default function BlockSideMenu() {
  const editor = useEditor<EditorExtension>()
  const [blockState, setBlockState] = useState<BlockHandleState>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const stateLabel = blockState ? `${blockState.node.type.name}:${blockState.pos}` : 'none'
  const isMenuOpen = menuOpen && !!blockState

  const handleStateChange = (event: BlockHandleStateChangeEvent) => {
    if (!isSameBlockState(blockState, event.detail)) {
      setMenuOpen(false)
    }
    setBlockState(event.detail)
  }

  const selectBlock = (): boolean => {
    if (!blockState || !editor.view) {
      return false
    }

    const { view } = editor
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, blockState.pos)))
    requestAnimationFrame(() => view.focus())
    return true
  }

  const setText = () => {
    if (!selectBlock()) {
      return
    }

    editor.commands.setParagraph()
    setMenuOpen(false)
  }

  const setHeading1 = () => {
    if (!selectBlock()) {
      return
    }

    editor.commands.setHeading({ level: 1 })
    setMenuOpen(false)
  }

  const deleteBlock = () => {
    if (!selectBlock() || !editor.view) {
      return
    }

    const { view } = editor
    view.dispatch(view.state.tr.deleteSelection())
    setMenuOpen(false)
  }

  const handleDragStart = (event: DragEvent) => {
    if (!blockState || !editor.view || !event.dataTransfer) {
      return
    }

    const { view } = editor
    const element = view.nodeDOM(blockState.pos)
    if (!(element instanceof HTMLElement)) {
      return
    }

    view.dom.classList.add('prosekit-dragging')
    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', element.outerHTML)
    event.dataTransfer.effectAllowed = 'copyMove'
    setViewDragging(view, blockState)
  }

  const handleDragEnd = () => {
    editor.view?.dom.classList.remove('prosekit-dragging')
  }

  return (
    <BlockHandleRoot onStateChange={handleStateChange} data-block-side-menu-state={stateLabel}>
      <BlockHandlePositioner className="CSS_BLOCK_HANDLE_POSITIONER">
        <BlockHandlePopup className="CSS_BLOCK_HANDLE_POPUP">
          <BlockHandleAdd className="CSS_BLOCK_HANDLE_ADD">
            <div className="CSS_ICON_PLUS" />
          </BlockHandleAdd>
          <div
            data-testid="block-side-menu-drag"
            className="CSS_BLOCK_HANDLE_DRAG"
            draggable
            onPointerDown={selectBlock}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={() => setMenuOpen(open => !open)}
          >
            <div className="CSS_ICON_DRAG_HANDLE" />
          </div>
          <div
            data-testid="block-side-menu"
            className="CSS_BLOCK_SIDE_MENU"
            data-state={isMenuOpen ? 'open' : 'closed'}
            role="menu"
            hidden={!isMenuOpen}
          >
            <button className="CSS_BLOCK_SIDE_MENU_ITEM" type="button" role="menuitem" onClick={setText}>
              Text
            </button>
            <button
              data-testid="block-side-menu-heading-1"
              className="CSS_BLOCK_SIDE_MENU_ITEM"
              type="button"
              role="menuitem"
              onClick={setHeading1}
            >
              Heading 1
            </button>
            <button className="CSS_BLOCK_SIDE_MENU_ITEM" type="button" role="menuitem" onClick={deleteBlock}>
              Delete
            </button>
          </div>
        </BlockHandlePopup>
      </BlockHandlePositioner>
    </BlockHandleRoot>
  )
}
