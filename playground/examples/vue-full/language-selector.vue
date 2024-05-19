<script setup lang="ts">
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

const props = defineProps<{
  language?: string
  setLanguage: (language: string) => void
}>()

const handleChange = (event: Event) => {
  props.setLanguage((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div :class="Themes.LANGUAGE_WRAPPER" contenteditable="false">
    <select
      :class="Themes.LANGUAGE_SELECT"
      @change="handleChange"
      :value="props.language || ''"
    >
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
</template>
