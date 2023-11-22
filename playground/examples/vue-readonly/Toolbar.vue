<script setup lang="ts">
import ToggleButton from './ToggleButton.vue'
import { useReadonly } from './use-readonly'

const { readonly, toggleReadonly } = useReadonly()
</script>

<template>
  <div class="TOOLBAR">
    <ToggleButton
      :available="true"
      :active="readonly"
      :onChange="toggleReadonly"
    >
      Readonly
    </ToggleButton>

    <ToggleButton
      :available="true"
      :active="!readonly"
      :onChange="toggleReadonly"
    >
      Editable
    </ToggleButton>
  </div>
</template>
