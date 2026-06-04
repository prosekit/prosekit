<script setup lang="ts">
import { Fragment, Slice } from 'prosekit/pm/model'
import { NodeSelection } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/vue'
import { BlockHandleAdd, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot } from 'prosekit/vue/block-handle'
import type { BlockHandleState, BlockHandleStateChangeEvent } from 'prosekit/web/block-handle'
import { computed, ref } from 'vue'

const editor = useEditor()
const blockState = ref<BlockHandleState>(null)
const menuOpen = ref(false)
const stateLabel = computed(() => blockState.value ? `${blockState.value.node.type.name}:${blockState.value.pos}` : 'none')
const isMenuOpen = computed(() => menuOpen.value && !!blockState.value)

function handleStateChange(event: BlockHandleStateChangeEvent) {
  blockState.value = event.detail
  if (!event.detail) {
    menuOpen.value = false
  }
}

function selectBlock() {
  const state = blockState.value
  if (!state || !editor.view) {
    return
  }

  const { view } = editor
  view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, state.pos)))
  requestAnimationFrame(() => view.focus())
}

function handleDragStart(event: DragEvent) {
  const state = blockState.value
  if (!state || !editor.view || !event.dataTransfer) {
    return
  }

  const { view } = editor
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

function handleDragEnd() {
  editor.view?.dom.classList.remove('prosekit-dragging')
}
</script>

<template>
  <BlockHandleRoot :on-state-change="handleStateChange" :data-block-side-menu-state="stateLabel">
    <BlockHandlePositioner class="CSS_BLOCK_HANDLE_POSITIONER">
      <BlockHandlePopup class="CSS_BLOCK_HANDLE_POPUP">
        <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
          <div class="CSS_ICON_PLUS" />
        </BlockHandleAdd>
        <div
          data-testid="block-side-menu-drag"
          class="CSS_BLOCK_HANDLE_DRAG"
          draggable="true"
          @pointerdown="selectBlock"
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
          @click="menuOpen = !menuOpen"
        >
          <div class="CSS_ICON_DRAG_HANDLE" />
        </div>
        <div
          data-testid="block-side-menu"
          class="CSS_BLOCK_SIDE_MENU"
          :data-state="isMenuOpen ? 'open' : 'closed'"
          role="menu"
          :hidden="!isMenuOpen"
        >
          <button class="CSS_BLOCK_SIDE_MENU_ITEM" type="button" role="menuitem" @click="menuOpen = false">
            {{ blockState ? `Block ${blockState.node.type.name}` : 'Block' }}
          </button>
        </div>
      </BlockHandlePopup>
    </BlockHandlePositioner>
  </BlockHandleRoot>
</template>
