<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { defineVueNodeView, ProseKit, useExtension, type VueNodeViewComponent } from 'prosekit/vue'
import { computed, ref } from 'vue'

import { sampleContent } from '../../sample/sample-doc-tweet'

import { defineExtension } from './extension'
import MethodSelect from './method-select.vue'
import TweetView from './tweet-view.vue'

const props = defineProps<{
  initialContent?: NodeJSON
}>()

const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({ extension: defineExtension(), defaultContent })

const method = ref<'iframe' | 'vue'>('iframe')

const vueTweetView = computed(() => {
  if (method.value === 'iframe') {
    return null
  }
  return defineVueNodeView({
    name: 'tweet',
    component: TweetView as VueNodeViewComponent,
  })
})

useExtension(vueTweetView, { editor })
</script>

<template>
  <ProseKit :editor="editor">
    <MethodSelect :value="method" @change="method = $event" />
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
