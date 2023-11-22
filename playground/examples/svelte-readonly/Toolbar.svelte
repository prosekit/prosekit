<script lang="ts">
import ToggleButton from './ToggleButton.svelte'

import { useReadonly } from './use-readonly'

const { readonly, toggleReadonly } = useReadonly()
</script>

<div class="TOOLBAR">
  <ToggleButton available={true} active={$readonly} onChange={toggleReadonly}>
    Readonly
  </ToggleButton>

  <ToggleButton available={true} active={!$readonly} onChange={toggleReadonly}>
    Editable
  </ToggleButton>
</div>
