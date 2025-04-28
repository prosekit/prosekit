<script setup lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { VueNodeViewProps } from 'prosekit/vue'
import { computed } from 'vue'

const props = defineProps<VueNodeViewProps>()

const language = computed({
  get() {
    const attrs = props.node.value.attrs as CodeBlockAttrs
    return attrs.language || ''
  },
  set(language: string) {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  },
})
</script>

<template>
  <div class="CSS_LANGUAGE_WRAPPER" contenteditable="false">
    <select v-model="language" class="CSS_LANGUAGE_SELECT">
      <option value="">Plain Text</option>
      <option
        v-for="info of shikiBundledLanguagesInfo"
        :key="info.id"
        :value="info.id"
      >
        {{ info.name }}
      </option>
    </select>
  </div>
  <pre :ref="props.contentRef" :data-language="language" />
</template>
