<script setup lang="ts">
import { TooltipContent } from 'prosekit/vue/tooltip-content'
import { TooltipRoot } from 'prosekit/vue/tooltip-root'
import { TooltipTrigger } from 'prosekit/vue/tooltip-trigger'


defineProps<{
  pressed: Boolean
  disabled?: Boolean
  tooltip?: string
  onClick?: VoidFunction
}>()
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger className="TOOLTIP_TRIGGER">
      <button
        :data-state="pressed ? 'on' : 'off'"
        :disabled="disabled ? true : undefined"
        @click="onClick"
        @mousedown.prevent
        class="TOGGLE_BUTTON"
      >
        <slot></slot>
      </button>
    </TooltipTrigger>
    <TooltipContent
      v-if="tooltip && !disabled"
      :offset="4"
      className="TOOLTIP_CONTENT"
    >
      {{ tooltip }}
    </TooltipContent>
  </TooltipRoot>
</template>
