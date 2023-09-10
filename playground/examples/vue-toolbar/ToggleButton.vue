<script setup lang="ts">
defineProps<{
  active: Boolean
  onChange: VoidFunction
}>()
</script>

<template>
  <div
    :data-state="active ? 'on' : 'off'"
    @mousedown.prevent
    @click="onChange"
    class="TOGGLE_BUTTON"
  >
    <slot></slot>
  </div>
</template>
