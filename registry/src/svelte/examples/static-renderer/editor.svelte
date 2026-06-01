<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit, useEditorDerivedValue } from 'prosekit/svelte'
import { untrack } from 'svelte'
import { createHTMLRenderer, createMarkdownRenderer } from 'prosekit/static-renderer'

import { defineExtension } from './extension.ts'
import { sampleContent } from './sample-content.ts'

type OutputType = 'html' | 'markdown'

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent: sampleContent })

let activeTab = $state<OutputType>('html')

const docJSON = useEditorDerivedValue((editor) => {
  return editor.getDocJSON()
})

const htmlOutput = $derived(() => {
  const json = docJSON()
  if (!json) return ''
  const render = createHTMLRenderer({ extension })
  return render(json)
})

const markdownOutput = $derived(() => {
  const json = docJSON()
  if (!json) return ''
  const render = createMarkdownRenderer({ extension })
  return render(json)
})
</script>

<div class="flex flex-col gap-4 max-h-[80vh] overflow-y-auto p-4">
  <!-- Editor -->
  <div class="border border-solid border-gray-300 rounded flex flex-col" style="min-height: 200px">
    <div class="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
      Editor
    </div>
    <ProseKit {editor}>
      <div class="overflow-y-auto flex-1" style="max-height: 300px">
        <div {@attach editor.mount} class="ProseMirror box-border min-h-full px-4 py-4 outline-hidden"></div>
      </div>

      <!-- Output Panels -->
      <div class="flex flex-col gap-4 p-4">
        <!-- Tab Buttons -->
        <div class="flex gap-2">
          <button
            class="px-3 py-1 text-xs font-medium rounded border border-solid {activeTab === 'html' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}"
            onclick={() => activeTab = 'html'}
          >
            renderToHTMLString
          </button>
          <button
            class="px-3 py-1 text-xs font-medium rounded border border-solid {activeTab === 'markdown' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}"
            onclick={() => activeTab = 'markdown'}
          >
            renderToMarkdown
          </button>
        </div>

        <!-- Output Content -->
        <div class="border border-solid border-gray-300 rounded flex flex-col" style="min-height: 150px; max-height: 300px">
          <div class="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
            {activeTab === 'html' ? 'renderToHTMLString Output' : 'renderToMarkdown Output'}
          </div>
          <pre class="p-3 text-xs overflow-auto whitespace-pre-wrap flex-1 m-0">{activeTab === 'html' ? htmlOutput() : markdownOutput()}</pre>
        </div>
      </div>
    </ProseKit>
  </div>
</div>
