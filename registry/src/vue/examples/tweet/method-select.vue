<script setup lang="ts">
import { useId } from 'vue'

const props = defineProps<{
  value: 'iframe' | 'vue'
}>()

const emit = defineEmits<{
  change: [value: 'iframe' | 'vue']
}>()

const id = useId()
const iframeId = `${id}-iframe`
const vueId = `${id}-vue`
</script>

<template>
  <fieldset class="not-content">
    <legend>Select a render method:</legend>

    <div>
      <input
        :id="iframeId"
        type="radio"
        :name="id"
        value="iframe"
        :checked="props.value === 'iframe'"
        @change="emit('change', 'iframe')"
      />
      <label :for="iframeId">iframe</label>
    </div>

    <div>
      <input
        :id="vueId"
        type="radio"
        :name="id"
        value="vue"
        :checked="props.value === 'vue'"
        @change="emit('change', 'vue')"
      />
      <label :for="vueId">vue-tweet</label>
    </div>
  </fieldset>
</template>
