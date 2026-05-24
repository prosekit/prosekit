<script setup lang="ts">
import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import { hasCodeBlockPreviewHiddenDecoration, shikiBundledLanguagesInfo, type CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { VueNodeViewProps } from 'prosekit/vue'
import { computed } from 'vue'

const props = defineProps<VueNodeViewProps>()

const attrs = computed(() => props.node.value.attrs as CodeBlockAttrs)
const language = computed(() => attrs.value.language || '')
const forceShowSource = computed(() => hasCodeBlockPreviewHiddenDecoration(props.decorations.value))
const showMermaidPreview = computed(() => !forceShowSource.value && language.value === 'mermaid')

const mermaidPreview = computed<{ svg: string | null; error: Error | null }>(() => {
  if (language.value !== 'mermaid') return { svg: null, error: null }
  try {
    return { svg: renderMermaidSVG(props.node.value.textContent, THEMES['tokyo-night']), error: null }
  } catch (err) {
    return { svg: null, error: err instanceof Error ? err : new Error(String(err)) }
  }
})

function setLanguage(lang: string) {
  const newAttrs: CodeBlockAttrs = { language: lang }
  props.setAttrs(newAttrs)
}

function focusSource(event: MouseEvent) {
  event.preventDefault()
  const pos = props.getPos()
  if (typeof pos !== 'number') return
  const { state, dispatch } = props.view
  const selection = TextSelection.near(state.doc.resolve(pos + 1), 1)
  dispatch(state.tr.setSelection(selection as never))
  props.view.focus()
}
</script>

<template>
  <div v-if="!showMermaidPreview" class="CSS_LANGUAGE_WRAPPER" contentEditable="false">
    <select
      aria-label="Code block language"
      class="CSS_LANGUAGE_SELECT"
      :value="language"
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
  <pre
    :ref="contentRef"
    class="CSS_CODE_BLOCK_PREVIEW_SOURCE"
    :data-preview="showMermaidPreview ? '' : undefined"
    :data-language="language"
  ></pre>
  <div
    v-if="showMermaidPreview"
    class="CSS_CODE_BLOCK_PREVIEW_DISPLAY"
    contentEditable="false"
    :tabindex="0"
    @mousedown="focusSource"
  >
    <pre v-if="mermaidPreview.error">{{ mermaidPreview.error.message }}</pre>
    <div v-if="mermaidPreview.svg" v-html="mermaidPreview.svg"></div>
  </div>
</template>
