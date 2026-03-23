<script lang="ts">
import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

import { Button } from '../../ui/button'

let readonly = $state(true)

const extension = $derived(readonly ? defineReadonly() : null)

useExtension(toStore(() => extension))

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
