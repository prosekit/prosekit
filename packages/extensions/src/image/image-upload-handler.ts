import {
  insertNode,
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
 * Options for {@link defineImageUploadHandler}.
 */
export interface ImageUploadHandlerOptions {
  /**
   * The uploader used to upload the file. It should return a promise that
   * resolves to the URL of the uploaded image.
   */
  uploader: Uploader<string>
  /**
   * Determines whether a pasted file should be uploaded and inserted as an
   * image. By default, only files with a content type starting with `image/`
   * are handled.
   */
  shouldPaste?: (options: FilePasteHandlerOptions) => boolean
  /**
   * Determines whether a dropped file should be uploaded and inserted as an
   * image. By default, only files with a content type starting with `image/`
   * are handled.
   */
  shouldDrop?: (options: FileDropHandlerOptions) => boolean
}

function isImageFile({ file }: { file: File }): boolean {
  // Only handle image files by default
  return file.type.startsWith('image/')
}

/**
 * Returns an extension that handles image file uploads when pasting or dropping
 * images into the editor.
 *
 * @param options
 */
export function defineImageUploadHandler({
  uploader,
  shouldPaste = isImageFile,
  shouldDrop = isImageFile,
}: ImageUploadHandlerOptions): PlainExtension {
  const uploadHandler = (view: EditorView, file: File, pos?: number): boolean => {
    const uploadTask = new UploadTask({ file, uploader })
    const attrs: ImageAttrs = { src: uploadTask.objectURL }
    const command = insertNode({ type: 'image', attrs, pos })
    return command(view.state, view.dispatch, view)
  }

  const pasteHandler: FilePasteHandler = (options) => {
    if (!shouldPaste(options)) return false
    return uploadHandler(options.view, options.file)
  }

  const dropHandler: FileDropHandler = (options) => {
    if (!shouldDrop(options)) return false
    return uploadHandler(options.view, options.file, options.pos)
  }

  return union(
    defineFilePasteHandler(pasteHandler),
    defineFileDropHandler(dropHandler),
  )
}
