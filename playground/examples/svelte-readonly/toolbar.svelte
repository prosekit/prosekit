<script lang="ts">
import Toggle from './toggle.svelte'

import { useReadonly } from './use-readonly'

const { readonly, toggleReadonly } = useReadonly()
</script>

<div class="TOOLBAR">
  <Toggle available={true} active={$readonly} onChange={toggleReadonly}>
    Readonly
  </Toggle>

  <Toggle available={true} active={!$readonly} onChange={toggleReadonly}>
    Editable
  </Toggle>
</div>
