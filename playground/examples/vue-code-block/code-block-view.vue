<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'
import { ComboBox } from 'prosekit/vue/combo-box'
import { ComboBoxInput } from 'prosekit/vue/combo-box-input'
import { ComboBoxItem } from 'prosekit/vue/combo-box-item'
import { ComboBoxList } from 'prosekit/vue/combo-box-list'
import { defineProps, ref } from 'vue'
import { languages } from './shikiji'

const props = defineProps<VueNodeViewProps>()

const showComboBox = ref(false)
const buttonRef = ref<HTMLButtonElement>()

const closeComboBox = () => {
  showComboBox.value = false
}
const toggleComboBox = () => {
  showComboBox.value = !showComboBox.value
}

const setLanguage = (language: string) => {
  props.setAttrs({ language })
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
      {{ props.node.value.attrs.language || 'Plain Text' }}
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
          @select="() => setLanguage(language)"
        >
          {{ language }}
        </ComboBoxItem>
      </ComboBoxList>
    </ComboBox>
  </div>

  <pre :ref="contentRef" :data-language="props.node.value.attrs.language"></pre>
</template>
