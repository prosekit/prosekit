<script setup lang="ts">
import { useId } from 'vue'

const props = defineProps<{
  value: 'basic' | 'advanced'
  onChange: (value: 'basic' | 'advanced') => void
}>()

const id = 'id-' + useId()
const basicId = `${id}-basic`
const advancedId = `${id}-advanced`
</script>

<template>
  <fieldset class="not-content">
    <legend>Select a render method:</legend>

    <div>
      <input
        :id="basicId"
        type="radio"
        :name="id"
        value="basic"
        :checked="props.value === 'basic'"
        @change="props.onChange('basic')"
      />
      <label :for="basicId">basic</label>
    </div>

    <div>
      <input
        :id="advancedId"
        type="radio"
        :name="id"
        value="advanced"
        :checked="props.value === 'advanced'"
        @change="props.onChange('advanced')"
      />
      <label :for="advancedId">advanced</label>
    </div>
  </fieldset>
</template>
