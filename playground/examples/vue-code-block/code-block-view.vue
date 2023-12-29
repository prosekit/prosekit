<script setup lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import type { VueNodeViewProps } from 'prosekit/vue'
import { computed } from 'vue'
import LanguageSelector from './language-selector.vue'

const props = defineProps<VueNodeViewProps>()

const language = computed(() => {
  const attrs = props.node.value.attrs as CodeBlockAttrs
  return attrs.language
})

const setLanguage = (language: string) => {
  props.setAttrs({ language })
}
</script>

<template>
  <LanguageSelector :language="language" :setLanguage="setLanguage" />
  <pre :ref="props.contentRef" :data-language="language"></pre>
</template>
