<script setup lang="ts">
import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { VueNodeViewProps } from 'prosekit/vue'
import { ResizableHandle, ResizableRoot } from 'prosekit/vue/resizable'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<VueNodeViewProps>()

const attrs = computed(() => props.node.value.attrs as ImageAttrs)
const url = computed(() => attrs.value.src || '')
const uploading = computed(() => url.value.startsWith('blob:'))

const aspectRatio = ref<number | undefined>()
const error = ref<string | undefined>()
const progress = ref(0)

watchEffect((onCleanup) => {
  if (!uploading.value) return

  const uploadTask = UploadTask.get<string>(url.value)
  if (!uploadTask) return

  let canceled = false

  uploadTask.finished.catch((err) => {
    if (canceled) return
    error.value = String(err)
  })
  const unsubscribeProgress = uploadTask.subscribeProgress(({ loaded, total }) => {
    if (canceled) return
    progress.value = total ? loaded / total : 0
  })

  onCleanup(() => {
    canceled = true
    unsubscribeProgress()
  })
})

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  const { naturalWidth, naturalHeight } = img
  const ratio = naturalWidth / naturalHeight
  if (ratio && Number.isFinite(ratio)) {
    aspectRatio.value = ratio
  }
  if (naturalWidth && naturalHeight && (!attrs.value.width || !attrs.value.height)) {
    props.setAttrs({ width: naturalWidth, height: naturalHeight })
  }
}
</script>

<template>
  <ResizableRoot
    :width="attrs.width ?? undefined"
    :height="attrs.height ?? undefined"
    :aspect-ratio="aspectRatio"
    :data-selected="props.selected.value ? '' : undefined"
    class="CSS_IMAGE_RESIZABLE"
    @resize-end="(event) => setAttrs(event.detail)"
  >
    <img
      v-if="url && !error"
      :src="url"
      alt="upload preview"
      class="CSS_IMAGE_RESIZABLE_IMAGE"
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
      class="CSS_IMAGE_RESIZABLE_HANDLE"
      position="bottom-right"
    >
      <div class="CSS_ICON_CORNER_HANDLE"></div>
    </ResizableHandle>
  </ResizableRoot>
</template>
