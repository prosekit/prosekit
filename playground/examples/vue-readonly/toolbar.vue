<script setup lang="ts">
import Toggle from './toggle.vue'
import { useReadonly } from './use-readonly'

const { readonly, toggleReadonly } = useReadonly()
</script>

<template>
  <div class="TOOLBAR">
    <Toggle :pressed="readonly" :onClick="toggleReadonly">Readonly</Toggle>
    <Toggle :pressed="!readonly" :onClick="toggleReadonly">Editable</Toggle>
  </div>
</template>
