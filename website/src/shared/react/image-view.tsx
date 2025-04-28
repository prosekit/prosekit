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

export default function ImageView(props: ReactNodeViewProps) {
  const { setAttrs, node } = props
  const attrs = node.attrs as ImageAttrs
  const url = attrs.src || ''
  const uploading = url.startsWith('blob:')

  const [aspectRatio, setAspectRatio] = useState<number | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!url.startsWith('blob:')) {
      return
    }

    const uploadTask = UploadTask.get<string>(url)
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
          setError('Unexpected upload result')
        }
        UploadTask.delete(uploadTask.objectURL)
      })
      .catch((error) => {
        if (abortController.signal.aborted) {
          return
        }
        setError(String(error))
        UploadTask.delete(uploadTask.objectURL)
      })
    const unsubscribe = uploadTask.subscribeProgress(({ loaded, total }) => {
      if (abortController.signal.aborted) {
        return
      }
      if (total > 0) {
        setProgress(loaded / total)
      }
    })
    return () => {
      unsubscribe()
      abortController.abort()
    }
  }, [url, setAttrs])

  const handleImageLoad = (event: SyntheticEvent) => {
    const img = event.target as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    if (ratio && Number.isFinite(ratio)) {
      setAspectRatio(ratio)
    }
    if (naturalWidth && naturalHeight && (!attrs.width || !attrs.height)) {
      setAttrs({ width: naturalWidth, height: naturalHeight })
    }
  }

  return (
    <ResizableRoot
      width={attrs.width ?? undefined}
      height={attrs.height ?? undefined}
      aspectRatio={aspectRatio}
      onResizeEnd={(event) => setAttrs(event.detail)}
      data-selected={props.selected ? '' : undefined}
      className="CSS_IMAGE_RESIZEALE"
    >
      {url && !error && (
        <img
          src={url}
          onLoad={handleImageLoad}
          className="CSS_IMAGE_RESIZEALE_IMAGE"
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
        className="CSS_IMAGE_RESIZEALE_HANDLE"
        position="bottom-right"
      >
        <div className="CSS_ICON_CORNER_HANDLE"></div>
      </ResizableHandle>
    </ResizableRoot>
  )
}
