<script lang="ts">
import Button from './button.svelte'

import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<div class="CSS_TOOLBAR">
  <Button pressed={$readonly} onClick={() => ($readonly = true)}>
    Readonly
  </Button>

  <Button pressed={!$readonly} onClick={() => ($readonly = false)}>
    Editable
  </Button>
</div>
