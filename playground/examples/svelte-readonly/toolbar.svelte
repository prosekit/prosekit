<script lang="ts">
import Toggle from './toggle.svelte'

import { useReadonly } from './use-readonly'

const { readonly, toggleReadonly } = useReadonly()
</script>

<div class="TOOLBAR">
  <Toggle pressed={$readonly} onClick={toggleReadonly}>Readonly</Toggle>

  <Toggle pressed={!$readonly} onClick={toggleReadonly}>Editable</Toggle>
</div>
