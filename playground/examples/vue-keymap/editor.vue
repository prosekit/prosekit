<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { onMounted, ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))

const submitions = ref<string[]>([])

const pushSubmition = (hotkey: string) => {
  const doc = editor.view.state.doc
  const docString = JSON.stringify(jsonFromNode(doc))
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.value = [...submitions.value, submition]
}
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <Toolbar @submit="pushSubmition" />
      <div ref="editorRef" class="EDITOR_CONTENT"></div>
    </div>
    <fieldset class="mt-4 border">
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
