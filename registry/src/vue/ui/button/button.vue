<script setup lang="ts">
import { TooltipContent, TooltipRoot, TooltipTrigger } from 'prosekit/vue/tooltip'

const props = defineProps<{
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
        :data-state="props.pressed ? 'on' : 'off'"
        :disabled="props.disabled"
        class="CSS_TOGGLE_BUTTON"
        @click="props.onClick"
        @mousedown.prevent
      >
        <slot />
        <span v-if="props.tooltip" class="sr-only">{{ props.tooltip }}</span>
      </button>
    </TooltipTrigger>
    <TooltipContent v-if="props.tooltip" class="CSS_TOOLTIP_CONTENT">
      {{ props.tooltip }}
    </TooltipContent>
  </TooltipRoot>
</template>
