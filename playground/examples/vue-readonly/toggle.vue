<script setup lang="ts">
defineProps<{
  pressed: Boolean
  disabled?: Boolean
  onClick: VoidFunction
}>()
</script>

<template>
  <button
    :data-state="pressed ? 'on' : 'off'"
    :disabled="disabled ? true : undefined"
    @click="onClick"
    @mousedown.prevent
    class="TOGGLE_BUTTON"
  >
    <slot></slot>
  </button>
</template>
