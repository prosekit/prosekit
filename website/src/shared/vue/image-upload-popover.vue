<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/vue/popover'
import { ref } from 'vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'
import { sampleUploader } from './sample-uploader'

const props = defineProps<{
  disabled: Boolean
  tooltip: string
}>()

const open = ref(false)
const url = ref('')
const file = ref<File | null>(null)
const editor = useEditor<EditorExtension>()

function handleFileChange(event: Event) {
  const nextFile = (event.target as HTMLInputElement)?.files?.[0] ?? null

  file.value = nextFile
  if (nextFile) {
    url.value = ''
  }
}

function handleUrlChange(event: Event) {
  const nextUrl = (event.target as HTMLInputElement)?.value ?? ''

  url.value = nextUrl
  if (nextUrl) {
    file.value = null
  }
}

function deferResetState() {
  setTimeout(() => {
    url.value = ''
    file.value = null
  }, 300)
}

function handleSubmit() {
  const src = url.value
  const nextFile = file.value

  if (src) {
    editor.value.commands.insertImage({ src })
  } else if (nextFile) {
    editor.value.commands.uploadImage({ file: nextFile, uploader: sampleUploader })
  }
  open.value = false
  deferResetState()
}

function handleOpenChange(openValue: boolean) {
  if (!openValue) {
    deferResetState()
  }
  open.value = openValue
}
</script>

<template>
  <PopoverRoot :open="open" @open-change="handleOpenChange">
    <PopoverTrigger>
      <Button
        :pressed="open"
        :disabled="props.disabled"
        :tooltip="props.tooltip"
      >
        <slot />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="CSS_IMAGE_UPLOAD_CARD">
      <template v-if="!file">
        <label>Embed Link</label>
        <input
          class="CSS_IMAGE_UPLOAD_INPUT"
          placeholder="Paste the image link..."
          type="url"
          :value="url"
          @input="handleUrlChange"
        />
      </template>
      <template v-if="!url">
        <label>Upload</label>
        <input
          class="CSS_IMAGE_UPLOAD_INPUT"
          accept="image/*"
          type="file"
          @input="handleFileChange"
        />
      </template>
      <button v-if="url" class="CSS_IMAGE_UPLOAD_BUTTON" @click="handleSubmit">
        Insert Image
      </button>
      <button v-if="file" class="CSS_IMAGE_UPLOAD_BUTTON" @click="handleSubmit">
        Upload Image
      </button>
    </PopoverContent>
  </PopoverRoot>
</template>
