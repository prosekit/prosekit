<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/vue/popover'
import { computed, ref } from 'vue'
import type { EditorExtension } from './extension'
import Toggle from './button.vue'

const props = defineProps<{
  disabled: Boolean
  tooltip: string
}>()

const open = ref(false)
const webUrl = ref('')
const objectUrl = ref('')
const url = computed(() => webUrl.value || objectUrl.value)
const editor = useEditor<EditorExtension>()

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]

  if (file) {
    objectUrl.value = URL.createObjectURL(file)
    webUrl.value = ''
  } else {
    objectUrl.value = ''
  }
}

const handleWebUrlChange = (event: Event) => {
  const url = (event.target as HTMLInputElement)?.value

  if (url) {
    webUrl.value = url
    objectUrl.value = ''
  } else {
    webUrl.value = ''
  }
}

const deferResetState = () => {
  setTimeout(() => {
    webUrl.value = ''
    objectUrl.value = ''
  }, 300)
}

const handleSubmit = () => {
  editor.value.commands.insertImage({ src: url.value })
  deferResetState()
  open.value = false
}

const handleOpenChange = (openValue: boolean) => {
  if (!openValue) {
    deferResetState()
  }
  open.value = openValue
}
</script>

<template>
  <PopoverRoot :open="open" :onOpenChange="handleOpenChange">
    <PopoverTrigger>
      <Toggle
        :pressed="open"
        :disabled="props.disabled"
        :tooltip="props.tooltip"
      >
        <slot />
      </Toggle>
    </PopoverTrigger>

    <PopoverContent :class="Themes.IMAGE_UPLOAD_CARD">
      <template v-if="!objectUrl">
        <label>Embed Link</label>
        <input
          :class="Themes.IMAGE_UPLOAD_INPUT"
          placeholder="Paste the image link..."
          type="url"
          :value="webUrl"
          @input="handleWebUrlChange"
        />
      </template>
      <template v-if="!webUrl">
        <label>Upload</label>
        <input
          :class="Themes.IMAGE_UPLOAD_INPUT"
          accept="image/*"
          type="file"
          @input="handleFileChange"
        />
      </template>
      <button
        v-if="url"
        :class="Themes.IMAGE_UPLOAD_BUTTON"
        @click="handleSubmit"
      >
        Insert Image
      </button>
    </PopoverContent>
  </PopoverRoot>
</template>
