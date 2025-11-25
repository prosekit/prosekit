<script setup lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { VueNodeViewProps } from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()

const attrs = () => props.node.value.attrs as CodeBlockAttrs
const language = () => attrs().language

function setLanguage(lang: string) {
  const newAttrs: CodeBlockAttrs = { language: lang }
  props.setAttrs(newAttrs)
}
</script>

<template>
  <div class="CSS_LANGUAGE_WRAPPER" contentEditable="false">
    <select
      aria-label="Code block language"
      class="CSS_LANGUAGE_SELECT"
      :value="language() || ''"
      @change="(event) => setLanguage((event.target as HTMLSelectElement).value)"
    >
      <option value="">Plain Text</option>
      <option
        v-for="info in shikiBundledLanguagesInfo"
        :key="info.id"
        :value="info.id"
      >
        {{ info.name }}
      </option>
    </select>
  </div>
  <pre :ref="contentRef" :data-language="language()"></pre>
</template>
