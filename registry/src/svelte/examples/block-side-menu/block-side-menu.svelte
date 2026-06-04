<script lang="ts">
import { Fragment, Slice } from 'prosekit/pm/model'
import { NodeSelection } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/svelte'
import { BlockHandleAdd, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot } from 'prosekit/svelte/block-handle'
import type { BlockHandleState, BlockHandleStateChangeEvent } from 'prosekit/web/block-handle'

const editor = useEditor()
let blockState = $state<BlockHandleState>(null)
let menuOpen = $state(false)
const stateLabel = $derived(blockState ? `${blockState.node.type.name}:${blockState.pos}` : 'none')
const isMenuOpen = $derived(menuOpen && !!blockState)

function handleStateChange(event: BlockHandleStateChangeEvent) {
  blockState = event.detail
  if (!event.detail) {
    menuOpen = false
  }
}

function selectBlock() {
  if (!blockState || !$editor.view) {
    return
  }

  const { view } = $editor
  view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, blockState.pos)))
  requestAnimationFrame(() => view.focus())
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
        <button class="CSS_BLOCK_SIDE_MENU_ITEM" type="button" role="menuitem" onclick={() => (menuOpen = false)}>
          {blockState ? `Block ${blockState.node.type.name}` : 'Block'}
        </button>
      </div>
    </BlockHandlePopup>
  </BlockHandlePositioner>
</BlockHandleRoot>
