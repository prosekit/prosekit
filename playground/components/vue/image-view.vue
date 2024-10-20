<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { VueNodeViewProps } from 'prosekit/vue'
import { ResizableHandle, ResizableRoot } from 'prosekit/vue/resizable'
import { computed, ref } from 'vue'

const props = defineProps<VueNodeViewProps>()

const { setAttrs, node } = props
const attrs = computed(() => node.value.attrs as ImageAttrs)
const url = computed(() => attrs.value.src || '')

const aspectRatio = ref<number | undefined>()

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  const ratio = img.naturalWidth / img.naturalHeight
  if (ratio && Number.isFinite(ratio)) {
    aspectRatio.value = ratio
  }
}
</script>

<template>
  <ResizableRoot
    :width="attrs.width ?? undefined"
    :height="attrs.height ?? undefined"
    :aspect-ratio="aspectRatio"
    :data-selected="props.selected ? '' : undefined"
    :class="Themes.IMAGE_RESIZEALE"
    @resize-end="(event) => setAttrs(event.detail)"
  >
    <img
      :src="url"
      :class="Themes.IMAGE_RESIZEALE_IMAGE"
      @load="handleImageLoad"
    />

    <ResizableHandle
      :class="Themes.IMAGE_RESIZEALE_HANDLE"
      position="bottom-right"
    >
      <div :class="Themes.ICON_CORNER_HANDLE"></div>
    </ResizableHandle>
  </ResizableRoot>
</template>
