<script setup lang="ts">
import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { VueNodeViewProps } from 'prosekit/vue'
import {
  ResizableHandle,
  ResizableRoot,
} from 'prosekit/vue/resizable'
import {
  computed,
  ref,
  watchEffect,
} from 'vue'

const props = defineProps<VueNodeViewProps>()

const { setAttrs, node } = props
const attrs = computed(() => node.value.attrs as ImageAttrs)
const url = computed(() => attrs.value.src || '')
const uploading = computed(() => url.value.startsWith('blob:'))

const aspectRatio = ref<number | undefined>()
const error = ref<string | undefined>()
const progress = ref(0)

watchEffect((onCleanup) => {
  if (!url.value.startsWith('blob:')) {
    return
  }

  const uploadTask = UploadTask.get<string>(url.value)
  if (!uploadTask) {
    return
  }

  const abortController = new AbortController()
  void uploadTask.finished
    .then((resultUrl) => {
      if (resultUrl && typeof resultUrl === 'string') {
        if (abortController.signal.aborted) {
          return
        }
        setAttrs({ src: resultUrl })
      } else {
        if (abortController.signal.aborted) {
          return
        }
        error.value = 'Unexpected upload result'
      }
      UploadTask.delete(uploadTask.objectURL)
    })
    .catch((error) => {
      if (abortController.signal.aborted) {
        return
      }
      error.value = String(error)
      UploadTask.delete(uploadTask.objectURL)
    })
  const unsubscribe = uploadTask.subscribeProgress(({ loaded, total }) => {
    if (abortController.signal.aborted) {
      return
    }
    if (total > 0) {
      progress.value = loaded / total
    }
  })
  onCleanup(() => {
    unsubscribe()
    abortController.abort()
  })
})

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  const { naturalWidth, naturalHeight } = img
  const ratio = naturalWidth / naturalHeight
  if (ratio && Number.isFinite(ratio)) {
    aspectRatio.value = ratio
  }
  if (
    naturalWidth
    && naturalHeight
    && (!attrs.value.width || !attrs.value.height)
  ) {
    setAttrs({ width: naturalWidth, height: naturalHeight })
  }
}
</script>

<template>
  <ResizableRoot
    :width="attrs.width ?? undefined"
    :height="attrs.height ?? undefined"
    :aspect-ratio="aspectRatio"
    :data-selected="props.selected.value ? '' : undefined"
    class="CSS_IMAGE_RESIZEALE"
    @resize-end="(event) => setAttrs(event.detail)"
  >
    <img
      v-if="url && !error"
      :src="url"
      class="CSS_IMAGE_RESIZEALE_IMAGE"
      @load="handleImageLoad"
    />

    <div v-if="uploading && !error" class="CSS_IMAGE_UPLOAD_PROGRESS">
      <div class="CSS_ICON_LOADER"></div>
      <div>{{ Math.round(progress * 100) }}%</div>
    </div>
    <div v-if="error" class="CSS_IMAGE_UPLOAD_ERROR">
      <div class="CSS_ICON_IMAGE_ERROR"></div>
      <div class="CSS_IMAGE_UPLOAD_ERROR_MESSAGE">
        Failed to upload image
      </div>
    </div>

    <ResizableHandle
      class="CSS_IMAGE_RESIZEALE_HANDLE"
      position="bottom-right"
    >
      <div class="CSS_ICON_CORNER_HANDLE"></div>
    </ResizableHandle>
  </ResizableRoot>
</template>
