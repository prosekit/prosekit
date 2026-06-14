<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { defineExtension } from './extension.ts'
import { sampleContent } from './sample-content.ts'
import RenderJson from './RenderJson.svelte'

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent: sampleContent })
</script>

<ProseKit {editor}>
  <div class="flex flex-col gap-4 max-h-[80vh] overflow-y-auto p-4">
    <!-- Editor -->
    <div class="border border-solid border-gray-300 rounded flex flex-col" style="min-height: 200px">
      <div class="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
        Editor
      </div>
      <div class="overflow-y-auto flex-1" style="max-height: 300px">
        <div {@attach editor.mount} class="ProseMirror box-border min-h-full px-4 py-4 outline-hidden"></div>
      </div>
    </div>

    <!-- HTML Output -->
    <RenderJson type="html" {extension} />

    <!-- Markdown Output -->
    <RenderJson type="markdown" {extension} />

    <!-- Svelte Output -->
    <RenderJson type="svelte" {extension} />
  </div>
</ProseKit>
