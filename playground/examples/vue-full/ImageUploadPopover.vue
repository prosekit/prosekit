<script setup lang="ts">
import { Popover } from 'prosekit/vue/popover'
import { computed, ref, type PropType } from 'vue'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

let props = defineProps({
  open: Boolean,
  onClose: Function as PropType<VoidFunction>,
})

const anchorElement = ref(null)
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

const handleClose = () => {
  webUrl.value = ''
  objectUrl.value = ''
  props.onClose?.()
}

const handleSubmit = () => {
  editor.commands.insertImage({ src: url.value })
  setTimeout(handleClose, 100)
}
</script>

<template>
  <div>
    <div ref="anchorElement">
      <slot></slot>
    </div>
    <Popover :reference="anchorElement ?? undefined" :active="props.open">
      <div class="IMAGE_UPLOAD_CARD">
        <div>Select a local image file or enter a web image URL.</div>
        <div v-if="!objectUrl">
          <label>Web Image URL</label>
          <input
            class="IMAGE_UPLOAD_INPUT"
            placeholder="https://placehold.co/128"
            type="url"
            @input="handleWebUrlChange"
          />
        </div>
        <div v-if="!webUrl">
          <label>Local Image</label>
          <input
            class="IMAGE_UPLOAD_INPUT"
            accept="image/*"
            type="file"
            @input="handleFileChange"
          />
        </div>
        <button
          class="IMAGE_UPLOAD_BUTTON"
          :disabled="!url"
          @click="handleSubmit"
        >
          Upload Image
        </button>
      </div>
    </Popover>
  </div>
</template>
