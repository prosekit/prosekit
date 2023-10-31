<script setup lang="ts">
defineProps<{
  active?: Boolean
  available: Boolean
  onChange: VoidFunction
}>()
</script>

<template>
  <button
    :data-state="active ? 'on' : 'off'"
    :disabled="!available"
    @mousedown.prevent
    @click="onChange"
    class="TOGGLE_BUTTON"
  >
    <slot></slot>
  </button>
</template>
