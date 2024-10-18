<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

const language = defineModel<string>()
</script>

<template>
  <div :class="Themes.LANGUAGE_WRAPPER" contenteditable="false">
    <select v-model="language" :class="Themes.LANGUAGE_SELECT">
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
