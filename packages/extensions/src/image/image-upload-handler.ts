import {
  insertNode,
  ProseKitError,
  union,
  type PlainExtension,
} from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import {
  defineFileDropHandler,
  defineFilePasteHandler,
  UploadTask,
  type FileDropHandler,
  type FileDropHandlerOptions,
  type FilePasteHandler,
  type FilePasteHandlerOptions,
  type Uploader,
} from '../file'

import type { ImageAttrs } from './image-spec'

/**
 * A predicate to determine if the pasted file should be uploaded and inserted as an image.
 */
export type ImageCanPastePredicate = (options: FilePasteHandlerOptions) => boolean

/**
 * A predicate to determine if the dropped file should be uploaded and inserted as an image.
 */
export type ImageCanDropPredicate = (options: FileDropHandlerOptions) => boolean

/**
 * A handler to be called when an error occurs during the upload.
 */
export type ImageUploadErrorHandler = (options: ImageUploadErrorHandlerOptions) => void

/**
 * Options for the {@link ImageUploadErrorHandler} callback.
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
 * Options for {@link defineImageUploadHandler}.
 */
export interface ImageUploadHandlerOptions {
  /**
   * The uploader used to upload the file. It should return a promise that
   * resolves to the URL of the uploaded image.
   */
  uploader: Uploader<string>
  /**
   * A predicate to determine if the pasted file should be uploaded and inserted as an image.
   * If not provided, it defaults to only allowing paste of files with a content type starting with `image/`.
   */
  canPaste?: ImageCanPastePredicate
  /**
   * A predicate to determine if the dropped file should be uploaded and inserted as an image.
   * If not provided, it defaults to only allowing drop of files with a content type starting with `image/`.
   */
  canDrop?: ImageCanDropPredicate
  /**
   * A handler to be called when an error occurs during the upload.
   * If not provided, it defaults to logging the error to the console.
   */
  onError?: ImageUploadErrorHandler
}

function defaultCanUpload({ file }: { file: File }): boolean {
  // Only handle image files by default
  return file.type.startsWith('image/')
}

const defaultOnError: ImageUploadErrorHandler = ({ error }) => {
  console.error('[prosekit] Failed to upload image:', error)
}

/**
 * Returns an extension that handles image file uploads when pasting or dropping
 * images into the editor.
 *
 * @param options
 */
export function defineImageUploadHandler({
  uploader,
  canPaste = defaultCanUpload,
  canDrop = defaultCanUpload,
  onError = defaultOnError,
}: ImageUploadHandlerOptions): PlainExtension {
  const handleInsert = (view: EditorView, file: File, pos?: number): boolean => {
    const uploadTask = new UploadTask({ file, uploader })
    const objectURL = uploadTask.objectURL
    const attrs: ImageAttrs = { src: objectURL }
    uploadTask.finished.then((resultURL) => {
      if (view.isDestroyed) {
        return
      } else if (typeof resultURL !== 'string') {
        const error = new ProseKitError(`Unexpected upload result. Expected a string but got ${typeof resultURL}`)
        onError({ file, error, uploadTask })
      } else {
        replaceImageURL(view, objectURL, resultURL)
        UploadTask.delete(objectURL)
      }
    }).catch((error) => {
      onError({ file, error, uploadTask })
    })
    const command = insertNode({ type: 'image', attrs, pos })
    return command(view.state, view.dispatch, view)
  }

  const handlePaste: FilePasteHandler = (options) => {
    if (!canPaste(options)) return false
    return handleInsert(options.view, options.file)
  }

  const handleDrop: FileDropHandler = (options) => {
    if (!canDrop(options)) return false
    return handleInsert(options.view, options.file, options.pos)
  }

  return union(
    defineFilePasteHandler(handlePaste),
    defineFileDropHandler(handleDrop),
  )
}

function replaceImageURL(view: EditorView, oldURL: string, newURL: string) {
  const positions: number[] = []
  view.state.doc.descendants((node, pos) => {
    if (node.type.name === 'image') {
      const attrs = node.attrs as ImageAttrs
      if (attrs.src === oldURL) {
        positions.push(pos)
      }
    }
  })
  if (positions.length > 0) {
    const tr = view.state.tr
    for (const pos of positions) {
      tr.setNodeAttribute(pos, 'src', newURL)
    }
    view.dispatch(tr)
  }
}
