<script setup lang="ts">
import { type PropType } from 'vue'
import Toggle from './toggle.vue'
import { useSubmitKeymap } from './use-submit-keymap'

let props = defineProps({
  onSubmit: {
    type: Function as PropType<(hotkey: string) => void>,
    required: true,
  },
})
const { hotkey } = useSubmitKeymap(props.onSubmit)
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :pressed="hotkey === 'Shift-Enter'"
      @click="() => (hotkey = 'Shift-Enter')"
    >
      <span class="mr-1">Submit with</span>
      <kbd>Shift</kbd>
      +
      <kbd>Enter</kbd>
    </Toggle>

    <Toggle
      :pressed="hotkey === 'Ctrl-Enter'"
      @click="() => (hotkey = 'Ctrl-Enter')"
    >
      <span class="mr-1">Submit with</span>
      <kbd>Ctrl</kbd>
      +
      <kbd>Enter</kbd>
    </Toggle>
  </div>
</template>
