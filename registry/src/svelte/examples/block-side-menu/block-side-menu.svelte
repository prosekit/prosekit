<script lang="ts">
import { Fragment, Slice } from 'prosekit/pm/model'
import { NodeSelection } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/svelte'
import { BlockHandleAdd, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot } from 'prosekit/svelte/block-handle'
import type { BlockHandleState, BlockHandleStateChangeEvent } from 'prosekit/web/block-handle'

import type { EditorExtension } from '../block-handle/extension.ts'

const editor = useEditor<EditorExtension>()
let blockState = $state<BlockHandleState>(null)
let menuOpen = $state(false)
const stateLabel = $derived(blockState ? `${blockState.node.type.name}:${blockState.pos}` : 'none')
const isMenuOpen = $derived(menuOpen && !!blockState)

function isSameBlockState(a: BlockHandleState, b: BlockHandleState) {
  if (!a || !b) {
    return a === b
  }

  return a.pos === b.pos && a.node.eq(b.node)
}

function handleStateChange(event: BlockHandleStateChangeEvent) {
  if (!isSameBlockState(blockState, event.detail)) {
    menuOpen = false
  }
  blockState = event.detail
}

function selectBlock(): boolean {
  if (!blockState || !$editor.view) {
    return false
  }

  const { view } = $editor
  view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, blockState.pos)))
  requestAnimationFrame(() => view.focus())
  return true
}

function setText() {
  if (!selectBlock()) {
    return
  }

  $editor.commands.setParagraph()
  menuOpen = false
}

function setHeading1() {
  if (!selectBlock()) {
    return
  }

  $editor.commands.setHeading({ level: 1 })
  menuOpen = false
}

function deleteBlock() {
  if (!selectBlock() || !$editor.view) {
    return
  }

  const { view } = $editor
  view.dispatch(view.state.tr.deleteSelection())
  menuOpen = false
}

function handleDragStart(event: DragEvent) {
  if (!blockState || !$editor.view || !event.dataTransfer) {
    return
  }

  const { view } = $editor
  const element = view.nodeDOM(blockState.pos)
  if (!(element instanceof HTMLElement)) {
    return
  }

  view.dom.classList.add('prosekit-dragging')
  event.dataTransfer.clearData()
  event.dataTransfer.setData('text/html', element.outerHTML)
  event.dataTransfer.effectAllowed = 'copyMove'
  view.dragging = {
    slice: new Slice(Fragment.from(blockState.node), 0, 0),
    move: true,
  }
}

function handleDragEnd() {
  $editor.view?.dom.classList.remove('prosekit-dragging')
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return
  }

  event.preventDefault()
  menuOpen = !menuOpen
}
</script>

<BlockHandleRoot onStateChange={handleStateChange} data-block-side-menu-state={stateLabel}>
  <BlockHandlePositioner class="CSS_BLOCK_HANDLE_POSITIONER">
    <BlockHandlePopup class="CSS_BLOCK_HANDLE_POPUP">
      <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
        <div class="CSS_ICON_PLUS"></div>
      </BlockHandleAdd>
      <div
        data-testid="block-side-menu-drag"
        class="CSS_BLOCK_HANDLE_DRAG"
        draggable="true"
        role="button"
        tabindex="0"
        onpointerdown={selectBlock}
        ondragstart={handleDragStart}
        ondragend={handleDragEnd}
        onkeydown={handleKeyDown}
        onclick={() => (menuOpen = !menuOpen)}
      >
        <div class="CSS_ICON_DRAG_HANDLE"></div>
      </div>
      <div
        data-testid="block-side-menu"
        class="CSS_BLOCK_SIDE_MENU"
        data-state={isMenuOpen ? 'open' : 'closed'}
        role="menu"
        hidden={!isMenuOpen}
      >
        <button class="CSS_BLOCK_SIDE_MENU_ITEM" type="button" role="menuitem" onclick={setText}>
          Text
        </button>
        <button
          data-testid="block-side-menu-heading-1"
          class="CSS_BLOCK_SIDE_MENU_ITEM"
          type="button"
          role="menuitem"
          onclick={setHeading1}
        >
          Heading 1
        </button>
        <button class="CSS_BLOCK_SIDE_MENU_ITEM" type="button" role="menuitem" onclick={deleteBlock}>
          Delete
        </button>
      </div>
    </BlockHandlePopup>
  </BlockHandlePositioner>
</BlockHandleRoot>
