<script setup lang="ts">
import { defineProps, type Component } from 'vue'

const props = defineProps<{
  as?: string | Component
  pressed: Boolean
  disabled?: Boolean
  onClick?: VoidFunction
}>()
</script>

<template>
  <component
    :is="props.as || 'button'"
    :data-state="pressed ? 'on' : 'off'"
    :disabled="disabled ? true : undefined"
    @click="onClick"
    @mousedown.prevent
    class="TOGGLE_BUTTON"
  >
    <slot></slot>
  </component>
</template>
