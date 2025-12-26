import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { ReactNodeViewProps } from 'prosekit/react'
import {
  ResizableHandle,
  ResizableRoot,
} from 'prosekit/react/resizable'
import {
  useEffect,
  useState,
  type SyntheticEvent,
} from 'react'

export default function ImageViewContent(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as ImageAttrs
  const url = attrs.src || ''
  const uploading = url.startsWith('blob:')

  const [aspectRatio, setAspectRatio] = useState<number | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!uploading) return

    const uploadTask = UploadTask.get<string>(url)
    if (!uploadTask) return

    let canceled = false

    uploadTask.finished.catch((error) => {
      if (canceled) return
      setError(String(error))
    })
    const unsubscribeProgress = uploadTask.subscribeProgress(({ loaded, total }) => {
      if (canceled) return
      setProgress(total ? loaded / total : 0)
    })

    return () => {
      canceled = true
      unsubscribeProgress()
    }
  }, [url, uploading])

  const handleImageLoad = (event: SyntheticEvent) => {
    const img = event.target as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    if (ratio && Number.isFinite(ratio)) {
      setAspectRatio(ratio)
    }
    if (naturalWidth && naturalHeight && (!attrs.width || !attrs.height)) {
      props.setAttrs({ width: naturalWidth, height: naturalHeight })
    }
  }

  return (
    <ResizableRoot
      width={attrs.width ?? undefined}
      height={attrs.height ?? undefined}
      aspectRatio={aspectRatio}
      onResizeEnd={(event) => props.setAttrs(event.detail)}
      data-selected={props.selected ? '' : undefined}
      className="CSS_IMAGE_RESIZABLE"
    >
      {url && !error && (
        <img
          src={url}
          onLoad={handleImageLoad}
          alt="upload preview"
          className="CSS_IMAGE_RESIZABLE_IMAGE"
        />
      )}
      {uploading && !error && (
        <div className="CSS_IMAGE_UPLOAD_PROGRESS">
          <div className="CSS_ICON_LOADER"></div>
          <div>{Math.round(progress * 100)}%</div>
        </div>
      )}
      {error && (
        <div className="CSS_IMAGE_UPLOAD_ERROR">
          <div className="CSS_ICON_IMAGE_ERROR"></div>
          <div className="CSS_IMAGE_UPLOAD_ERROR_MESSAGE">
            Failed to upload image
          </div>
        </div>
      )}
      <ResizableHandle
        className="CSS_IMAGE_RESIZABLE_HANDLE"
        position="bottom-right"
      >
        <div className="CSS_ICON_CORNER_HANDLE"></div>
      </ResizableHandle>
    </ResizableRoot>
  )
}
