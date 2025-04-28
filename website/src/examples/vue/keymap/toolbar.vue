<script setup lang="ts">
import { ref } from 'vue'

import Button from './button.vue'
import { useSubmitKeymap } from './use-submit-keymap'

const emit = defineEmits<{
  submit: [hotkey: string]
}>()

const hotkey = ref<'Shift-Enter' | 'Enter'>('Shift-Enter')
useSubmitKeymap(hotkey, (hotkey) => emit('submit', hotkey))
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="hotkey === 'Shift-Enter'"
      @click="() => (hotkey = 'Shift-Enter')"
    >
      <span class="mr-1">Submit with</span>
      <kbd>Shift + Enter</kbd>
    </Button>

    <Button :pressed="hotkey === 'Enter'" @click="() => (hotkey = 'Enter')">
      <span class="mr-1">Submit with</span>
      <kbd>Enter</kbd>
    </Button>
  </div>
</template>
