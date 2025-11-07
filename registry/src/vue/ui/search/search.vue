<script setup lang="ts">
import {
  defineSearchQuery,
  type SearchCommandsExtension,
} from 'prosekit/extensions/search'
import {
  useEditor,
  useExtension,
} from 'prosekit/vue'
import {
  computed,
  ref,
} from 'vue'

import { Button } from '../button'

const props = defineProps<{ onClose?: () => void }>()

const showReplace = ref(false)
const searchText = ref('')
const replaceText = ref('')

const editor = useEditor<SearchCommandsExtension>()

const extension = computed(() => {
  if (!searchText.value) {
    return null
  }
  return defineSearchQuery({
    search: searchText.value,
    replace: replaceText.value,
  })
})

useExtension(extension)

function toggleReplace() {
  showReplace.value = !showReplace.value
}

function isPlainEnter(event: KeyboardEvent) {
  return (
    event.key === 'Enter'
    && !event.shiftKey
    && !event.metaKey
    && !event.altKey
    && !event.ctrlKey
    && !event.isComposing
  )
}

function isShiftEnter(event: KeyboardEvent) {
  return (
    event.key === 'Enter'
    && event.shiftKey
    && !event.metaKey
    && !event.altKey
    && !event.ctrlKey
    && !event.isComposing
  )
}

function handleSearchKeyDown(event: KeyboardEvent) {
  if (isPlainEnter(event)) {
    event.preventDefault()
    editor.value.commands.findNext()
  } else if (isShiftEnter(event)) {
    event.preventDefault()
    editor.value.commands.findPrev()
  }
}

function handleReplaceKeyDown(event: KeyboardEvent) {
  if (isPlainEnter(event)) {
    event.preventDefault()
    editor.value.commands.replaceNext()
  } else if (isShiftEnter(event)) {
    event.preventDefault()
    editor.value.commands.replaceAll()
  }
}
</script>

<template>
  <div class="CSS_SEARCH">
    <Button tooltip="Toggle Replace" :on-click="toggleReplace">
      <span
        :data-rotate="showReplace ? '' : undefined"
        class="CSS_ICON_CHEVRON_RIGHT CSS_TOGGLE_ROTATE"
      />
    </Button>
    <input
      v-model="searchText"
      placeholder="Search"
      type="text"
      class="CSS_SEARCH_INPUT"
      @keydown="handleSearchKeyDown"
    >
    <div class="CSS_SEARCH_CONTROLLER">
      <Button
        tooltip="Previous (Shift Enter)"
        :on-click="editor.commands.findPrev"
      >
        <span class="CSS_ICON_ARROW_LEFT" />
      </Button>
      <Button
        tooltip="Next (Enter)"
        :on-click="editor.commands.findNext"
      >
        <span class="CSS_ICON_ARROW_RIGHT" />
      </Button>
      <Button tooltip="Close" :on-click="props.onClose">
        <span class="CSS_ICON_CLOSE" />
      </Button>
    </div>
    <template v-if="showReplace">
      <input
        v-model="replaceText"
        placeholder="Replace"
        type="text"
        class="CSS_SEARCH_INPUT"
        @keydown="handleReplaceKeyDown"
      >
      <div class="CSS_SEARCH_CONTROLLER">
        <Button
          tooltip="Replace (Enter)"
          :on-click="editor.commands.replaceNext"
        >
          Replace
        </Button>
        <Button
          tooltip="Replace All (Shift Enter)"
          :on-click="editor.commands.replaceAll"
        >
          All
        </Button>
      </div>
    </template>
  </div>
</template>
