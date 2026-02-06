import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { SolidNodeViewProps } from 'prosekit/solid'
import { ResizableHandle, ResizableRoot } from 'prosekit/solid/resizable'
import { createEffect, createSignal, onCleanup, Show, type JSX } from 'solid-js'

export default function ImageView(props: SolidNodeViewProps): JSX.Element {
  const attrs = () => props.node.attrs as ImageAttrs
  const url = () => attrs().src || ''
  const uploading = () => url().startsWith('blob:')

  const [aspectRatio, setAspectRatio] = createSignal<number | undefined>()
  const [error, setError] = createSignal<string | undefined>()
  const [progress, setProgress] = createSignal(0)

  createEffect(() => {
    if (!uploading()) return

    const uploadTask = UploadTask.get<string>(url())
    if (!uploadTask) return

    let canceled = false

    uploadTask.finished.catch((err) => {
      if (canceled) return
      setError(String(err))
    })
    const unsubscribeProgress = uploadTask.subscribeProgress(({ loaded, total }) => {
      if (canceled) return
      setProgress(total ? loaded / total : 0)
    })

    onCleanup(() => {
      canceled = true
      unsubscribeProgress()
    })
  })

  const handleImageLoad = (event: Event) => {
    const img = event.target as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    if (ratio && Number.isFinite(ratio)) {
      setAspectRatio(ratio)
    }
    if (naturalWidth && naturalHeight && (!attrs().width || !attrs().height)) {
      props.setAttrs({ width: naturalWidth, height: naturalHeight })
    }
  }

  return (
    <ResizableRoot
      width={attrs().width ?? undefined}
      height={attrs().height ?? undefined}
      aspectRatio={aspectRatio()}
      onResizeEnd={(event) => props.setAttrs(event.detail)}
      attr:data-selected={props.selected ? '' : undefined}
      class="CSS_IMAGE_RESIZABLE"
    >
      <Show when={url() && !error()}>
        <img
          src={url()}
          onLoad={handleImageLoad}
          alt="upload preview"
          class="CSS_IMAGE_RESIZABLE_IMAGE"
        />
      </Show>
      <Show when={uploading() && !error()}>
        <div class="CSS_IMAGE_UPLOAD_PROGRESS">
          <div class="CSS_ICON_LOADER"></div>
          <div>{Math.round(progress() * 100)}%</div>
        </div>
      </Show>
      <Show when={error()}>
        <div class="CSS_IMAGE_UPLOAD_ERROR">
          <div class="CSS_ICON_IMAGE_ERROR"></div>
          <div class="CSS_IMAGE_UPLOAD_ERROR_MESSAGE">
            Failed to upload image
          </div>
        </div>
      </Show>
      <ResizableHandle
        class="CSS_IMAGE_RESIZABLE_HANDLE"
        position="bottom-right"
      >
        <div class="CSS_ICON_CORNER_HANDLE"></div>
      </ResizableHandle>
    </ResizableRoot>
  )
}
