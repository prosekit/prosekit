<script lang="ts">
import Toggle from './toggle.svelte'

import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<div class="TOOLBAR">
  <Toggle pressed={$readonly} onClick={() => ($readonly = true)}>
    Readonly
  </Toggle>

  <Toggle pressed={!$readonly} onClick={() => ($readonly = false)}>
    Editable
  </Toggle>
</div>
