<script lang="ts">
import { Themes } from '@prosekit/themes'
import Button from './button.svelte'

import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<div class={Themes.TOOLBAR}>
  <Toggle pressed={$readonly} onClick={() => ($readonly = true)}>
    Readonly
  </Toggle>

  <Toggle pressed={!$readonly} onClick={() => ($readonly = false)}>
    Editable
  </Toggle>
</div>
