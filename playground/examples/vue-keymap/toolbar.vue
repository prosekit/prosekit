<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { ref, type PropType } from 'vue'
import Button from './button.vue'
import { useSubmitKeymap } from './use-submit-keymap'

let props = defineProps({
  onSubmit: {
    type: Function as PropType<(hotkey: string) => void>,
    required: true,
  },
})
const hotkey = ref<'Shift-Enter' | 'Enter'>('Shift-Enter')
useSubmitKeymap(hotkey, props.onSubmit)
</script>

<template>
  <div :class="Themes.TOOLBAR">
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
