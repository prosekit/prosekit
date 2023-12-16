<script setup lang="ts">
import { ComboBox } from 'prosekit/vue/combo-box'
import { ComboBoxInput } from 'prosekit/vue/combo-box-input'
import { ComboBoxItem } from 'prosekit/vue/combo-box-item'
import { ComboBoxList } from 'prosekit/vue/combo-box-list'
import { defineProps, ref } from 'vue'
import { languages } from './shikiji'

const props = defineProps<{
  language?: string
  setLanguage: (language: string) => void
}>()

const showComboBox = ref(false)
const buttonRef = ref<HTMLButtonElement>()

const closeComboBox = () => {
  showComboBox.value = false
}
const toggleComboBox = () => {
  showComboBox.value = !showComboBox.value
}
</script>

<template>
  <div className="LANGUAGE_WRAPPER">
    <button
      className="LANGUAGE_BUTTON"
      @click="toggleComboBox"
      ref="buttonRef"
      contentEditable="false"
    >
      {{ props.language || 'Plain Text' }}
    </button>

    <ComboBox
      className="LANGUAGE_COMBO_BOX"
      :active="showComboBox"
      :reference="buttonRef"
      @dismiss="closeComboBox"
    >
      <ComboBoxInput
        placeholder="Search for a langauge..."
        className="LANGUAGE_COMBO_BOX_INPUT"
      ></ComboBoxInput>
      <ComboBoxList className="LANGUAGE_COMBO_BOX_LIST">
        <ComboBoxItem
          v-for="language in languages"
          :key="language"
          className="LANGUAGE_COMBO_BOX_ITEM"
          @select="() => props.setLanguage(language)"
        >
          {{ language }}
        </ComboBoxItem>
      </ComboBoxList>
    </ComboBox>
  </div>
</template>
