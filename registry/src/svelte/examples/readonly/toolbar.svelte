<script lang="ts">
import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/svelte'
import { derived, writable } from 'svelte/store'

import { Button } from '../../ui/button'

let readonly = $state(true)

// Create a store from the reactive readonly value
const readonlyStore = writable<boolean>(true)

// Update store when readonly changes
$effect(() => {
  readonlyStore.set(readonly)
})

// Create extension derived from the readonly store
const extension = derived(readonlyStore, ($readonly) => {
  return $readonly ? defineReadonly() : null
})

useExtension(extension)

function setReadonly(value: boolean) {
  readonly = value
}
</script>

<div class="CSS_TOOLBAR">
  <Button pressed={readonly} onClick={() => setReadonly(true)}>
    Readonly
  </Button>

  <Button pressed={!readonly} onClick={() => setReadonly(false)}>
    Editable
  </Button>
</div>
