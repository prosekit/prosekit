<script setup lang="ts">
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/vue/tooltip'

defineProps<{
  pressed?: boolean
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
}>()
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger class="CSS_TOOLTIP_TRIGGER">
      <button
        :data-state="pressed ? 'on' : 'off'"
        :disabled="disabled"
        class="CSS_TOGGLE_BUTTON"
        @click="onClick"
        @mousedown.prevent
      >
        <slot />
        <span v-if="tooltip" class="sr-only">{{ tooltip }}</span>
      </button>
    </TooltipTrigger>
    <TooltipContent v-if="tooltip" class="CSS_TOOLTIP_CONTENT">
      {{ tooltip }}
    </TooltipContent>
  </TooltipRoot>
</template>
