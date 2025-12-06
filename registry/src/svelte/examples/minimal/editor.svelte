<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

const extension = defineBasicExtension()
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div {@attach editor.mount} class="CSS_MINIMAL_EDITOR"></div>
</ProseKit>
