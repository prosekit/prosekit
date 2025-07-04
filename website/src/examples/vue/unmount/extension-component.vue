<script setup lang="ts">
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { useExtension } from 'prosekit/vue'
import { computed } from 'vue'

const props = defineProps<{ placeholder: string }>()

const extension = computed(() => definePlaceholder({ placeholder: props.placeholder }))

useExtension(extension)
</script>

<!-- eslint-disable-next-line vue/valid-template-root -->
<template>
  <!-- Empty template to avoid Vue warning "Component is missing template or render function" -->
</template>
