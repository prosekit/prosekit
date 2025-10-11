import {
  insertNode,
  ProseKitError,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import {
  UploadTask,
  type Uploader,
} from '../../file'
import type { ImageAttrs } from '../image-spec'

/**
 * Options for {@link uploadImage}.
 *
 * @public
 */
export interface UploadImageOptions {
  /**
   * The uploader used to upload the file. It should return a promise that
   * resolves to the URL of the uploaded image.
   */
  uploader: Uploader<string>
  /**
   * The file that will be uploaded.
   */
  file: File
  /**
   * The position where the image should be inserted. If not provided, the
   * image is inserted at the current selection.
   */
  pos?: number
  /**
   * A handler to be called when an error occurs during the upload.
   */
  onError?: ImageUploadErrorHandler
}

/**
 * Options for the {@link ImageUploadErrorHandler} callback.
 *
 * @public
 */
export interface ImageUploadErrorHandlerOptions {
  /**
   * The file that was uploaded.
   */
  file: File
  /**
   * The error that occurred during the upload.
   */
  error: unknown
  /**
   * The upload task that was used to upload the file.
   */
  uploadTask: UploadTask<string>
}

/**
 * A handler to be called when an error occurs during the upload.
 *
 * @public
 */
export type ImageUploadErrorHandler = (options: ImageUploadErrorHandlerOptions) => void

/**
 * Returns a command that uploads an image file and inserts an image node with a
 * temporary URL which is replaced once the upload completes.
 *
 * @param options
 *
 * @public
 */
export function uploadImage({ uploader, file, pos, onError }: UploadImageOptions): Command {
  return (state, dispatch, view) => {
    const uploadTask = new UploadTask({ file, uploader })
    const objectURL = uploadTask.objectURL
    const attrs: ImageAttrs = { src: objectURL }

    uploadTask.finished
      .then((resultURL) => {
        if (view && view.isDestroyed) {
          return
        } else if (typeof resultURL !== 'string') {
          const error = new ProseKitError(
            `Unexpected upload result. Expected a string but got ${typeof resultURL}`,
          )
          onError?.({ file, error, uploadTask })
        } else if (!view) {
          const error = new ProseKitError(
            'View must be available to replace the image URL',
          )
          onError?.({ file, error, uploadTask })
        } else {
          replaceImageURL(view, objectURL, resultURL)
          UploadTask.delete(objectURL)
        }
      })
      .catch((error) => {
        onError?.({ file, error, uploadTask })
      })

    return insertNode({ type: 'image', attrs, pos })(state, dispatch, view)
  }
}

/**
 * Replaces the temporary image URL with the final uploaded URL.
 *
 * @internal
 */
export function replaceImageURL(
  view: EditorView,
  oldURL: string,
  newURL: string,
): void {
  const positions: number[] = []
  view.state.doc.descendants((node, pos) => {
    if (node.type.name === 'image') {
      const attrs = node.attrs as ImageAttrs
      if (attrs.src === oldURL) {
        positions.push(pos)
      }
    }
  })

  if (positions.length === 0) {
    return
  }

  const tr = view.state.tr
  for (const pos of positions) {
    tr.setNodeAttribute(pos, 'src', newURL)
  }
  view.dispatch(tr)
}
