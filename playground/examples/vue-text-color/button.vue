<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/vue/tooltip'
import { ref } from 'vue'

defineProps<{
  pressed?: Boolean
  disabled?: Boolean
  tooltip?: string
  onClick?: VoidFunction
}>()

const tooltipOpen = ref(false)
</script>

<template>
  <TooltipRoot
    :open="tooltipOpen"
    @openChange="(value) => (tooltipOpen = value)"
  >
    <TooltipTrigger :class="Themes.TOOLTIP_TRIGGER">
      <button
        :data-state="pressed ? 'on' : 'off'"
        :disabled="disabled ? true : undefined"
        @click="onClick"
        @mousedown.prevent
        :class="Themes.TOGGLE_BUTTON"
      >
        <slot></slot>
        <span v-if="tooltip" class="sr-only">{{ tooltip }}</span>
      </button>
    </TooltipTrigger>
    <TooltipContent
      v-if="tooltip && !disabled && tooltipOpen"
      :class="Themes.TOOLTIP_CONTENT"
    >
      {{ tooltip }}
    </TooltipContent>
  </TooltipRoot>
</template>
