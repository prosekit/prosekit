<script setup lang="ts">
import { defineDocChangeHandler } from 'prosekit/core'
import { useExtension } from 'prosekit/vue'
import { computed } from 'vue'

const props = defineProps<{
  onDocChange: VoidFunction
}>()

const extension = computed(() => {
  return defineDocChangeHandler(props.onDocChange)
})

useExtension(extension)
</script>

<template></template>
