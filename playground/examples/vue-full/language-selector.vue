<script setup lang="ts">
import { shikiBundledLanguages } from 'prosekit/extensions/code-block'

const props = defineProps<{
  language?: string
  setLanguage: (language: string) => void
}>()

const handleChange = (event: Event) => {
  props.setLanguage((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div className="LANGUAGE_WRAPPER" contenteditable="false">
    <select
      className="LANGUAGE_SELECT"
      @change="handleChange"
      :value="props.language || ''"
    >
      <option value="">Plain Text</option>
      <option
        v-for="info of shikiBundledLanguages"
        :key="info.id"
        :value="info.id"
      >
        {{ info.name }}
      </option>
    </select>
  </div>
</template>
