<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  jsonFromNode,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})

const submitions = ref<string[]>([])

function pushSubmition(hotkey: string) {
  const doc = editor.view.state.doc
  const docString = JSON.stringify(jsonFromNode(doc))
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.value = [...submitions.value, submition]
}
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <Toolbar @submit="pushSubmition" />
      <div class="CSS_EDITOR_SCROLLING">
        <div ref="editorRef" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
    <fieldset class="CSS_KEYMAP_FIELDSET">
      <legend>Submit Records</legend>
      <ol>
        <li v-for="(submition, index) in submitions" :key="index">
          <pre>{{ submition }}</pre>
        </li>
      </ol>
      <div v-if="submitions.length === 0">No submitions yet</div>
    </fieldset>
  </ProseKit>
</template>
