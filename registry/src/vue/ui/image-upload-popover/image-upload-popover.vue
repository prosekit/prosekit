<script setup lang="ts">
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import { useEditor } from 'prosekit/vue'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/vue/popover'
import {
  ref,
  useId,
} from 'vue'

import { Button } from '../button'

const props = defineProps<{
  uploader: Uploader<string>
  tooltip: string
  disabled: boolean
}>()

const open = ref(false)
const url = ref('')
const file = ref<File | null>(null)
const ariaId = useId()

const editor = useEditor<ImageExtension>()

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0]

  if (selectedFile) {
    file.value = selectedFile
    url.value = ''
  } else {
    file.value = null
  }
}

function handleUrlChange(event: Event) {
  const target = event.target as HTMLInputElement
  const inputUrl = target.value

  if (inputUrl) {
    url.value = inputUrl
    file.value = null
  } else {
    url.value = ''
  }
}

function deferResetState() {
  setTimeout(() => {
    url.value = ''
    file.value = null
  }, 300)
}

function handleSubmit() {
  if (url.value) {
    editor.value.commands.insertImage({ src: url.value })
  } else if (file.value) {
    editor.value.commands.uploadImage({ file: file.value, uploader: props.uploader })
  }
  open.value = false
  deferResetState()
}

function handleOpenChange(isOpen: boolean) {
  if (!isOpen) {
    deferResetState()
  }
  open.value = isOpen
}
</script>

<template>
  <PopoverRoot :open="open" @open-change="handleOpenChange">
    <PopoverTrigger>
      <Button :pressed="open" :disabled="disabled" :tooltip="tooltip">
        <slot />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="CSS_IMAGE_UPLOAD_CARD">
      <label v-if="!file" :for="`id-link-${ariaId}`">Embed Link</label>
      <input
        v-if="!file"
        :id="`id-link-${ariaId}`"
        class="CSS_IMAGE_UPLOAD_INPUT"
        placeholder="Paste the image link..."
        type="url"
        :value="url"
        @input="handleUrlChange"
      />

      <label v-if="!url" :for="`id-upload-${ariaId}`">Upload</label>
      <input
        v-if="!url"
        :id="`id-upload-${ariaId}`"
        class="CSS_IMAGE_UPLOAD_INPUT"
        accept="image/*"
        type="file"
        @change="handleFileChange"
      />

      <button v-if="url" class="CSS_IMAGE_UPLOAD_BUTTON" @click="handleSubmit">
        Insert Image
      </button>

      <button v-if="file" class="CSS_IMAGE_UPLOAD_BUTTON" @click="handleSubmit">
        Upload Image
      </button>
    </PopoverContent>
  </PopoverRoot>
</template>
