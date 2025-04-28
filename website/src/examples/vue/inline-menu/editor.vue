<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'

const defaultContent = '<p><b>Try to select some text</b></p>'
  + '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nec ullamcorper sit amet risus. Nam aliquam sem et tortor consequat id porta. Interdum posuere lorem ipsum dolor sit amet. Lectus sit amet est placerat in egestas erat. Egestas sed tempus urna et pharetra pharetra. Sit amet cursus sit amet dictum sit amet. Porttitor leo a diam sollicitudin. Tellus orci ac auctor augue. Tellus in hac habitasse platea dictumst vestibulum. At elementum eu facilisis sed odio morbi. Dolor magna eget est lorem ipsum. Et malesuada fames ac turpis egestas. Arcu risus quis varius quam quisque id diam. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae.</p>'
    .repeat(
      10,
    )

const editor = createEditor({ extension: defineExtension(), defaultContent })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div
          ref="editorRef"
          spellcheck="false"
          class="CSS_EDITOR_CONTENT"
        />
        <InlineMenu />
      </div>
    </div>
  </ProseKit>
</template>
