<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit, useEditorDerivedValue } from 'prosekit/vue'
import { computed, defineComponent, h, type PropType } from 'vue'
import { createHTMLRenderer, createMarkdownRenderer, createVueRenderer } from 'prosekit/static-renderer'

import { defineExtension } from './extension.ts'
import { sampleContent } from './sample-content.ts'

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent: sampleContent })

type OutputType = 'html' | 'markdown' | 'vue'

const RenderJson = defineComponent({
  props: {
    type: {
      type: String as PropType<OutputType>,
      required: true,
    },
  },
  setup(props) {
    const docJSON = useEditorDerivedValue((editor) => {
      return editor.getDocJSON()
    })

    const output = computed(() => {
      if (!docJSON.value) return ''
      if (props.type === 'html') {
        const render = createHTMLRenderer({ extension })
        return render(docJSON.value)
      } else if (props.type === 'markdown') {
        const render = createMarkdownRenderer({ extension })
        return render(docJSON.value)
      } else if (props.type === 'vue') {
        const render = createVueRenderer({ extension })
        return render(docJSON.value)
      }
      return ''
    })

    const title = computed(() => {
      if (props.type === 'html') return 'renderToHTMLString Output'
      if (props.type === 'markdown') return 'renderToMarkdown Output'
      return 'renderToVueElement Output'
    })

    return () => h('div', {
      class: 'border border-solid border-gray-300 rounded flex flex-col',
      style: { 'min-height': '150px', 'max-height': '300px' },
    }, [
      h('div', {
        class: 'bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0',
      }, title.value),
      h('pre', {
        class: 'p-3 text-xs overflow-auto whitespace-pre-wrap flex-1 m-0',
      }, output.value),
    ])
  },
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="flex flex-col gap-4 max-h-[80vh] overflow-y-auto p-4">
      <!-- Editor -->
      <div class="border border-solid border-gray-300 rounded flex flex-col" style="min-height: 200px">
        <div class="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
          Editor
        </div>
        <div class="overflow-y-auto flex-1" style="max-height: 300px">
          <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="ProseMirror box-border min-h-full px-4 py-4 outline-hidden"></div>
        </div>
      </div>

      <!-- HTML Output -->
      <RenderJson type="html" />

      <!-- Markdown Output -->
      <RenderJson type="markdown" />

      <!-- Vue Output -->
      <RenderJson type="vue" />
    </div>
  </ProseKit>
</template>
