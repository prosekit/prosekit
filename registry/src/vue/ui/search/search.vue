<script setup lang="ts">
import { defineSearchQuery, type SearchCommandsExtension } from 'prosekit/extensions/search'
import { useEditor, useExtension } from 'prosekit/vue'
import { computed, ref } from 'vue'

import { Button } from '../button'

const props = defineProps<{ onClose?: () => void }>()

const showReplace = ref(false)
const searchText = ref('')
const replaceText = ref('')
const caseSensitive = ref(false)
const wholeWord = ref(false)
const regexp = ref(false)
const literal = ref(false)

const editor = useEditor<SearchCommandsExtension>()

const extension = computed(() => {
  if (!searchText.value) {
    return null
  }
  return defineSearchQuery({
    search: searchText.value,
    replace: replaceText.value,
    caseSensitive: caseSensitive.value,
    wholeWord: wholeWord.value,
    regexp: regexp.value,
    literal: literal.value,
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
    <Button tooltip="Toggle Replace" @click="toggleReplace">
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
        @click="editor.commands.findPrev"
      >
        <span class="CSS_ICON_ARROW_LEFT" />
      </Button>
      <Button
        tooltip="Next (Enter)"
        @click="editor.commands.findNext"
      >
        <span class="CSS_ICON_ARROW_RIGHT" />
      </Button>
      <Button tooltip="Close" @click="props.onClose">
        <span class="CSS_ICON_CLOSE" />
      </Button>
      <Button
        :pressed="caseSensitive"
        tooltip="Case Sensitive"
        @click="caseSensitive = !caseSensitive"
      >
        <span class="i-lucide-case-sensitive size-5 block" />
      </Button>
      <Button
        :pressed="wholeWord"
        tooltip="Whole Word"
        @click="wholeWord = !wholeWord"
      >
        <span class="i-lucide-whole-word size-5 block" />
      </Button>
      <Button
        :pressed="regexp"
        tooltip="Regular Expression"
        @click="regexp = !regexp"
      >
        <span class="i-lucide-braces size-5 block" />
      </Button>
      <Button
        :pressed="literal"
        tooltip="Literal Escape Sequences"
        @click="literal = !literal"
      >
        <span class="i-lucide-quote size-5 block" />
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
          @click="editor.commands.replaceNext"
        >
          Replace
        </Button>
        <Button
          tooltip="Replace All (Shift Enter)"
          @click="editor.commands.replaceAll"
        >
          All
        </Button>
      </div>
    </template>
  </div>
</template>
