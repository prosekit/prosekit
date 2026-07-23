'use client'

import { Tooltip } from '@base-ui/react/tooltip'
import { Fragment, Slice } from 'prosekit/pm/model'
import { NodeSelection } from 'prosekit/pm/state'
import type { EditorView } from 'prosekit/pm/view'
import { useEditor } from 'prosekit/react'
import { BlockHandleAdd, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot } from 'prosekit/react/block-handle'
import type { BlockHandleState, BlockHandleStateChangeEvent } from 'prosekit/web/block-handle'
import { useState } from 'react'

import BlockHandleMenu from './block-handle-menu.tsx'

type ActiveBlockHandleState = Exclude<BlockHandleState, null>

interface Props {
  enabled: boolean
  dir?: 'ltr' | 'rtl'
}

function isSameBlockState(a: BlockHandleState, b: BlockHandleState) {
  if (!a || !b) {
    return a === b
  }

  return a.pos === b.pos && a.node.eq(b.node)
}

function setViewDragging(view: EditorView, state: ActiveBlockHandleState) {
  view.dragging = {
    slice: new Slice(Fragment.from(state.node), 0, 0),
    move: true,
  }
}

export default function BlockHandle(props: Props) {
  const editor = useEditor()
  const [blockState, setBlockState] = useState<BlockHandleState>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!props.enabled) {
    return null
  }

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

  const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
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
    <Tooltip.Provider>
      <BlockHandleRoot onStateChange={handleStateChange}>
        <BlockHandlePositioner
          placement={props.dir === 'rtl' ? 'right' : 'left'}
          className="CSS_BLOCK_HANDLE_POSITIONER"
        >
          <BlockHandlePopup className="CSS_BLOCK_HANDLE_POPUP">
            <Tooltip.Root>
              <Tooltip.Trigger className="m-0 p-0">
                <BlockHandleAdd className="CSS_BLOCK_HANDLE_ADD">
                  <div className="CSS_ICON_PLUS" />
                </BlockHandleAdd>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner sideOffset={10} side="bottom">
                  <Tooltip.Popup className="
                      flex flex-col justify-center items-center
                      px-2 py-1
                      rounded-md
                      bg-[canvas]
                      text-sm
                      z-100
                      origin-(--transform-origin)
                      shadow-lg shadow-gray-200 outline-1 outline-gray-200
                      transition-[transform,scale,opacity]
                      data-ending-style:opacity-0 data-ending-style:scale-90
                      data-instant:transition-none
                      data-starting-style:opacity-0 data-starting-style:scale-90
                      dark:shadow-none dark:outline-gray-300 dark:-outline-offset-1">
                    <span>
                      <span>Click{' '}</span>
                      <span className="opacity-50">to add below</span>
                    </span>
                    <span>
                      <span>Option-click{' '}</span>
                      <span className="opacity-50">to add above</span>
                    </span>
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <BlockHandleMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <Tooltip.Trigger
                  className="m-0 p-0"
                  render={
                    <div
                      className="CSS_BLOCK_HANDLE_DRAG"
                      data-testid="notion-block-side-menu-drag"
                      draggable
                      onPointerDown={selectBlock}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="CSS_ICON_DRAG_HANDLE" />
                    </div>
                  }
                />
              </BlockHandleMenu>
              <Tooltip.Portal>
                <Tooltip.Positioner sideOffset={10} side="bottom">
                  <Tooltip.Popup className="
                      flex flex-col justify-center items-center
                      px-2 py-1
                      rounded-md
                      bg-[canvas]
                      text-sm
                      z-100
                      origin-(--transform-origin)
                      shadow-lg shadow-gray-200 outline-1 outline-gray-200
                      transition-[transform,scale,opacity]
                      data-ending-style:opacity-0 data-ending-style:scale-90
                      data-instant:transition-none
                      data-starting-style:opacity-0 data-starting-style:scale-90
                      dark:shadow-none dark:outline-gray-300 dark:-outline-offset-1">
                    <span>
                      <span>Drag{' '}</span>
                      <span className="opacity-50">to move</span>
                    </span>
                    <span>
                      <span>Click{' '}</span>
                      <span className="opacity-50">to open menu</span>
                    </span>
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </BlockHandlePopup>
        </BlockHandlePositioner>
      </BlockHandleRoot>
    </Tooltip.Provider>
  )
}
