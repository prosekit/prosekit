<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { PopoverTrigger } from 'prosekit/vue/popover-trigger'
import { PopoverRoot } from 'prosekit/vue/popover-root'
import { PopoverPositioner } from 'prosekit/vue/popover-positioner'
import { computed, ref } from 'vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const open = ref(false)
const webUrl = ref('')
const objectUrl = ref('')
const url = computed(() => webUrl.value || objectUrl.value)
const editor = useEditor<EditorExtension>().value

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
  editor.commands.insertImage({ src: url.value })
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
    <Toggle
      :as="PopoverTrigger"
      :pressed="open"
      :disabled="!editor.commands.insertImage.canApply()"
    >
      <slot />
    </Toggle>

    <PopoverPositioner class="IMAGE_UPLOAD_CARD">
      <template v-if="!objectUrl">
        <label>Embed Link</label>
        <input
          class="IMAGE_UPLOAD_INPUT"
          placeholder="Paste the image link..."
          type="url"
          :value="webUrl"
          @input="handleWebUrlChange"
        />
      </template>
      <template v-if="!webUrl">
        <label>Upload</label>
        <input
          class="IMAGE_UPLOAD_INPUT"
          accept="image/*"
          type="file"
          @input="handleFileChange"
        />
      </template>
      <button v-if="url" class="IMAGE_UPLOAD_BUTTON" @click="handleSubmit">
        Insert Image
      </button>
    </PopoverPositioner>
  </PopoverRoot>
</template>
