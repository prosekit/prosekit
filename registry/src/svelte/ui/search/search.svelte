<script lang="ts">
import { defineSearchQuery, type SearchCommandsExtension } from 'prosekit/extensions/search'
import { useEditor, useExtension } from 'prosekit/svelte'
import { derived, writable } from 'svelte/store'

import { Button } from '../button'

interface Props {
  onClose?: () => void
}

const props: Props = $props()

let showReplace = $state(false)
let searchText = $state('')
let replaceText = $state('')

const editor = useEditor<SearchCommandsExtension>()

// Create stores from the reactive values
const searchTextStore = writable('')
const replaceTextStore = writable('')

// Update stores when reactive values change
$effect(() => {
  searchTextStore.set(searchText)
})

$effect(() => {
  replaceTextStore.set(replaceText)
})

// Create extension derived from the stores
const extension = derived(
  [searchTextStore, replaceTextStore],
  ([$searchText, $replaceText]) => {
    if (!$searchText) {
      return null
    }
    return defineSearchQuery({
      search: $searchText,
      replace: $replaceText,
    })
  },
)

useExtension(extension)

function toggleReplace() {
  showReplace = !showReplace
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
    $editor.commands.findNext()
  } else if (isShiftEnter(event)) {
    event.preventDefault()
    $editor.commands.findPrev()
  }
}

function handleReplaceKeyDown(event: KeyboardEvent) {
  if (isPlainEnter(event)) {
    event.preventDefault()
    $editor.commands.replaceNext()
  } else if (isShiftEnter(event)) {
    event.preventDefault()
    $editor.commands.replaceAll()
  }
}
</script>

<div class="CSS_SEARCH">
  <Button tooltip="Toggle Replace" onClick={toggleReplace}>
    <span
      data-rotate={showReplace ? '' : undefined}
      class="CSS_ICON_CHEVRON_RIGHT CSS_TOGGLE_ROTATE"
    ></span>
  </Button>
  <input
    bind:value={searchText}
    placeholder="Search"
    type="text"
    class="CSS_SEARCH_INPUT"
    onkeydown={handleSearchKeyDown}
  />
  <div class="CSS_SEARCH_CONTROLLER">
    <Button
      tooltip="Previous (Shift Enter)"
      onClick={$editor.commands.findPrev}
    >
      <span class="CSS_ICON_ARROW_LEFT"></span>
    </Button>
    <Button
      tooltip="Next (Enter)"
      onClick={$editor.commands.findNext}
    >
      <span class="CSS_ICON_ARROW_RIGHT"></span>
    </Button>
    <Button tooltip="Close" onClick={props.onClose}>
      <span class="CSS_ICON_CLOSE"></span>
    </Button>
  </div>
  {#if showReplace}
    <input
      bind:value={replaceText}
      placeholder="Replace"
      type="text"
      class="CSS_SEARCH_INPUT"
      onkeydown={handleReplaceKeyDown}
    />
    <div class="CSS_SEARCH_CONTROLLER">
      <Button
        tooltip="Replace (Enter)"
        onClick={$editor.commands.replaceNext}
      >
        Replace
      </Button>
      <Button
        tooltip="Replace All (Shift Enter)"
        onClick={$editor.commands.replaceAll}
      >
        All
      </Button>
    </div>
  {/if}
</div>
