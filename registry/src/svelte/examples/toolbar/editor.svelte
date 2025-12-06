<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleUploader } from '../../sample/sample-uploader'
import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

const extension = defineExtension()
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar uploader={sampleUploader} />
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>
