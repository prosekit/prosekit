<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'
import { computed, defineProps, ref } from 'vue'
import LanguageSelector from './language-selector.vue'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'

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
  <pre :ref="contentRef" :data-language="props.node.value.attrs.language"></pre>
</template>
