<script setup lang="ts">
import { jsonFromNode, type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/vue'
import { computed, ref } from 'vue'

const submitHotkey = ref('Shift-Enter')

let keymap = computed((): Keymap => {
  return {
    [submitHotkey.value]: (state) => {
      const doc = JSON.stringify(jsonFromNode(state.doc), null, 2)
      window.alert(`${submitHotkey.value} pressed! You document is: ${doc}`)
      // Returning true means that the keypress has been handled and should
      // not be propagated further.
      return true
    },
  } satisfies Keymap
})

useKeymap(keymap)
</script>

<template>
  <fieldset class="border">
    <legend>Submit Document</legend>

    <div>
      <input
        type="radio"
        id="hotkey1"
        value="Shift-Enter"
        v-model="submitHotkey"
      />
      <label for="hotkey1">
        <kbd>Shift</kbd>
        +
        <kbd>Enter</kbd>
      </label>
    </div>

    <div>
      <input
        type="radio"
        id="hotkey2"
        value="Ctrl-Enter"
        v-model="submitHotkey"
      />
      <label for="hotkey2">
        <kbd>Ctrl</kbd>
        +
        <kbd>Enter</kbd>
      </label>
    </div>
  </fieldset>
</template>
