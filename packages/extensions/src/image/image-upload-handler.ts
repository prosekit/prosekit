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
 * Options for {@link ImageUploadHandler}.
 */
export interface ImageUploadHandlerOptions {
  /**
   * The uploader to use to upload the file. It should return a promise that
   * resolves to the URL of the uploaded image file.
   */
  uploader: Uploader<string>
  /**
   * Returns true if the pasted file should be uploaded and inserted as an
   * image. By default, only if the content type starts with `image/`.
   */
  canPaste?: (options: FilePasteHandlerOptions) => boolean
  /**
   * Returns true if the dropped file should be uploaded and inserted as an
   * image. By default, only if the content type starts with `image/`.
   */
  canDrop?: (options: FileDropHandlerOptions) => boolean
}

function defaultCanHandle({ file }: { file: File }): boolean {
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
  canPaste = defaultCanHandle,
  canDrop = defaultCanHandle,
}: ImageUploadHandlerOptions): PlainExtension {
  const uploadHandler = (view: EditorView, file: File, pos?: number): boolean => {
    const uploadTask = new UploadTask({ file, uploader })
    const attrs: ImageAttrs = { src: uploadTask.objectURL }
    const command = insertNode({ type: 'image', attrs, pos })
    return command(view.state, view.dispatch, view)
  }

  const pasteHandler: FilePasteHandler = (options) => {
    if (!canPaste(options)) return false
    return uploadHandler(options.view, options.file)
  }

  const dropHandler: FileDropHandler = (options) => {
    if (!canDrop(options)) return false
    return uploadHandler(options.view, options.file, options.pos)
  }

  return union(
    defineFilePasteHandler(pasteHandler),
    defineFileDropHandler(dropHandler),
  )
}
