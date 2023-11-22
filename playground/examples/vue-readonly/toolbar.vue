<script setup lang="ts">
import Toggle from './toggle.vue'
import { useReadonly } from './use-readonly'

const { readonly, toggleReadonly } = useReadonly()
</script>

<template>
  <div class="TOOLBAR">
    <Toggle :available="true" :active="readonly" :onChange="toggleReadonly">
      Readonly
    </Toggle>

    <Toggle :available="true" :active="!readonly" :onChange="toggleReadonly">
      Editable
    </Toggle>
  </div>
</template>
