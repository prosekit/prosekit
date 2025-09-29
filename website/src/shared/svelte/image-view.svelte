<script lang="ts">
import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { SvelteNodeViewProps } from 'prosekit/svelte'
import {
  ResizableHandle,
  ResizableRoot,
} from 'prosekit/svelte/resizable'

let { node, setAttrs, selected }: SvelteNodeViewProps = $props()

const attrs = $derived($node.attrs as ImageAttrs)
const url = $derived(attrs.src || '')
const uploading = $derived(url.startsWith('blob:'))

let aspectRatio = $state<number | undefined>()
let error = $state<string | undefined>()
let progress = $state(0)

$effect(() => {
  progress = 0
  if (!uploading) {
    error = undefined
    return
  }

  error = undefined
  const uploadTask = UploadTask.get<string>(url)
  if (!uploadTask) return

  let canceled = false

  uploadTask.finished.catch((cause) => {
    if (canceled) return
    error = String(cause)
  })

  const unsubscribe = uploadTask.subscribeProgress(({ loaded, total }) => {
    if (canceled) return
    progress = total ? loaded / total : 0
  })

  return () => {
    canceled = true
    unsubscribe()
  }
})

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  const { naturalWidth, naturalHeight } = img
  const ratio = naturalWidth / naturalHeight

  if (ratio && Number.isFinite(ratio)) {
    aspectRatio = ratio
  }

  if (
    naturalWidth
    && naturalHeight
    && (!attrs.width || !attrs.height)
  ) {
    setAttrs({ width: naturalWidth, height: naturalHeight })
  }
}

function handleResizeEnd(event: CustomEvent<{ width: number; height: number }>) {
  setAttrs(event.detail)
}
</script>

<ResizableRoot
  width={attrs.width ?? undefined}
  height={attrs.height ?? undefined}
  aspectRatio={aspectRatio}
  class="CSS_IMAGE_RESIZABLE"
  data-selected={$selected ? '' : undefined}
  onResizeEnd={handleResizeEnd}
>
  {#if url && !error}
    <img
      src={url}
      class="CSS_IMAGE_RESIZABLE_IMAGE"
      on:load={handleImageLoad}
    />
  {/if}

  {#if uploading && !error}
    <div class="CSS_IMAGE_UPLOAD_PROGRESS">
      <div class="CSS_ICON_LOADER"></div>
      <div>{Math.round(progress * 100)}%</div>
    </div>
  {/if}

  {#if error}
    <div class="CSS_IMAGE_UPLOAD_ERROR">
      <div class="CSS_ICON_IMAGE_ERROR"></div>
      <div class="CSS_IMAGE_UPLOAD_ERROR_MESSAGE">Failed to upload image</div>
    </div>
  {/if}

  <ResizableHandle class="CSS_IMAGE_RESIZABLE_HANDLE" position="bottom-right">
    <div class="CSS_ICON_CORNER_HANDLE"></div>
  </ResizableHandle>
</ResizableRoot>
