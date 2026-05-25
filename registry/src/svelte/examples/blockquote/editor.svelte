<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { Toolbar } from '../../ui/toolbar/index.ts'

import { defineExtension } from './extension.ts'

const extension = defineExtension()
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar />
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>
