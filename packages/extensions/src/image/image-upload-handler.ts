import { union, type PlainExtension } from '@prosekit/core'

import {
  defineFileDropHandler,
  defineFilePasteHandler,
  type FileDropHandler,
  type FileDropHandlerOptions,
  type FilePasteHandler,
  type FilePasteHandlerOptions,
  type Uploader,
} from '../file/index.ts'

import { uploadImage, type ImageUploadErrorHandler } from './image-commands/upload-image.ts'

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
  const handlePaste: FilePasteHandler = (options) => {
    if (!canPaste(options)) return false
    const { view, file } = options
    const command = uploadImage({ uploader, file, onError })
    return command(view.state, view.dispatch, view)
  }

  const handleDrop: FileDropHandler = (options) => {
    if (!canDrop(options)) return false
    const { view, file, pos } = options
    const command = uploadImage({ uploader, file, onError, pos })
    return command(view.state, view.dispatch, view)
  }

  return union(
    defineFilePasteHandler(handlePaste),
    defineFileDropHandler(handleDrop),
  )
}
