<script lang="ts">
import type { ProseMirrorNode } from 'prosekit/pm/model'
import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { SvelteNodeViewProps } from 'prosekit/svelte'
import { ResizableHandle, ResizableRoot } from 'prosekit/svelte/resizable'
import { fromStore } from 'svelte/store'

interface Props extends SvelteNodeViewProps {}

const props: Props = $props()
const node: ProseMirrorNode = $derived(fromStore(props.node).current)
const selected: boolean = $derived(fromStore(props.selected).current)

const attrs = $derived(node.attrs as ImageAttrs)
const url = $derived(attrs.src || '')
const uploading = $derived(url.startsWith('blob:'))

let aspectRatio = $state<number | undefined>(undefined)
let error = $state<string | undefined>(undefined)
let progress = $state(0)

$effect(() => {
  if (!uploading) {
    return
  }

  const uploadTask = UploadTask.get<string>(url)
  if (!uploadTask) return

  let canceled = false

  uploadTask.finished.catch((err) => {
    if (canceled) return
    error = String(err)
  })
  const unsubscribeProgress = uploadTask.subscribeProgress(({ loaded, total }) => {
    if (canceled) return
    progress = total ? loaded / total : 0
  })

  return () => {
    canceled = true
    unsubscribeProgress()
  }
})

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  const { naturalWidth, naturalHeight } = img
  const ratio = naturalWidth / naturalHeight
  if (ratio && Number.isFinite(ratio)) {
    aspectRatio = ratio
  }
  if (naturalWidth && naturalHeight && (!attrs.width || !attrs.height)) {
    props.setAttrs({ width: naturalWidth, height: naturalHeight })
  }
}
</script>

<ResizableRoot
  width={attrs.width ?? undefined}
  height={attrs.height ?? undefined}
  {aspectRatio}
  data-selected={selected ? '' : undefined}
  class="CSS_IMAGE_RESIZABLE"
  onResizeEnd={(event) => props.setAttrs(event.detail)}
>
  {#if url && !error}
    <img
      src={url}
      alt="upload preview"
      class="CSS_IMAGE_RESIZABLE_IMAGE"
      onload={handleImageLoad}
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
      <div class="CSS_IMAGE_UPLOAD_ERROR_MESSAGE">
        Failed to upload image
      </div>
    </div>
  {/if}
  <ResizableHandle
    class="CSS_IMAGE_RESIZABLE_HANDLE"
    position="bottom-right"
  >
    <div class="CSS_ICON_CORNER_HANDLE"></div>
  </ResizableHandle>
</ResizableRoot>
