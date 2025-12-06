<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref } from 'vue'

import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const extension = defineExtension()
const editor = createEditor({ extension })

const submissions = ref<string[]>([])

function pushSubmission(hotkey: string) {
  const docString = JSON.stringify(editor.getDocJSON())
  const submission = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submissions.value = [...submissions.value, submission]
}
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <Toolbar @submit="pushSubmission" />
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
    <fieldset class="CSS_KEYMAP_FIELDSET">
      <legend>Submit Records</legend>
      <ol>
        <li v-for="(submission, index) in submissions" :key="index">
          <pre>{{ submission }}</pre>
        </li>
      </ol>
      <div v-if="submissions.length === 0">No submissions yet</div>
    </fieldset>
  </ProseKit>
</template>
