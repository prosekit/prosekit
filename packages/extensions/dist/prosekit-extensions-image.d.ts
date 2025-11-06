import { l as FileDropHandlerOptions, n as UploadTask, o as FilePasteHandlerOptions, r as Uploader } from "./index-DdjnBeho.js";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Command } from "@prosekit/pm/state";
import { EditorView } from "@prosekit/pm/view";

//#region src/image/image-commands/upload-image.d.ts

/**
 * Options for {@link uploadImage}.
 *
 * @public
 */
interface UploadImageOptions {
  /**
   * The uploader used to upload the file. It should return a promise that
   * resolves to the URL of the uploaded image.
   */
  uploader: Uploader<string>;
  /**
   * The file that will be uploaded.
   */
  file: File;
  /**
   * The position where the image should be inserted. If not provided, the
   * image is inserted at the current selection.
   */
  pos?: number;
  /**
   * A handler to be called when an error occurs during the upload.
   */
  onError?: ImageUploadErrorHandler;
}
/**
 * Options for the {@link ImageUploadErrorHandler} callback.
 *
 * @public
 */
interface ImageUploadErrorHandlerOptions {
  /**
   * The file that was uploaded.
   */
  file: File;
  /**
   * The error that occurred during the upload.
   */
  error: unknown;
  /**
   * The upload task that was used to upload the file.
   */
  uploadTask: UploadTask<string>;
}
/**
 * A handler to be called when an error occurs during the upload.
 *
 * @public
 */
type ImageUploadErrorHandler = (options: ImageUploadErrorHandlerOptions) => void;
/**
 * Returns a command that uploads an image file and inserts an image node with a
 * temporary URL which is replaced once the upload completes.
 *
 * @param options
 *
 * @public
 */
declare function uploadImage({
  uploader,
  file,
  pos,
  onError
}: UploadImageOptions): Command;
/**
 * Replaces the temporary image URL with the final uploaded URL.
 *
 * @internal
 */
declare function replaceImageURL(view: EditorView, oldURL: string, newURL: string): void;
//#endregion
//#region src/image/image-spec.d.ts
/**
 * @public
 */
interface ImageAttrs {
  src?: string | null;
  width?: number | null;
  height?: number | null;
}
/**
 * @internal
 */
type ImageSpecExtension = Extension<{
  Nodes: {
    image: ImageAttrs;
  };
}>;
/**
 * @internal
 */
declare function defineImageSpec(): ImageSpecExtension;
//#endregion
//#region src/image/image-commands.d.ts
/**
 * @internal
 */
type ImageCommandsExtension = Extension<{
  Commands: {
    insertImage: [attrs?: ImageAttrs];
    uploadImage: [options: UploadImageOptions];
  };
}>;
/**
 * @internal
 */
declare function defineImageCommands(): ImageCommandsExtension;
//#endregion
//#region src/image/image.d.ts
/**
 * @internal
 */
type ImageExtension = Union<[ImageSpecExtension, ImageCommandsExtension]>;
/**
 * @public
 */
declare function defineImage(): ImageExtension;
//#endregion
//#region src/image/image-commands/insert-image.d.ts
/**
 * Returns a command that inserts an image node with the given attributes at the
 * current selection position.
 *
 * @public
 */
declare function insertImage(attrs?: ImageAttrs): Command;
//#endregion
//#region src/image/image-upload-handler.d.ts
/**
 * A predicate to determine if the pasted file should be uploaded and inserted as an image.
 */
type ImageCanPastePredicate = (options: FilePasteHandlerOptions) => boolean;
/**
 * A predicate to determine if the dropped file should be uploaded and inserted as an image.
 */
type ImageCanDropPredicate = (options: FileDropHandlerOptions) => boolean;
/**
 * A handler to be called when an error occurs during the upload.
 */
interface ImageUploadHandlerOptions {
  /**
   * The uploader used to upload the file. It should return a promise that
   * resolves to the URL of the uploaded image.
   */
  uploader: Uploader<string>;
  /**
   * A predicate to determine if the pasted file should be uploaded and inserted as an image.
   * If not provided, it defaults to only allowing paste of files with a content type starting with `image/`.
   */
  canPaste?: ImageCanPastePredicate;
  /**
   * A predicate to determine if the dropped file should be uploaded and inserted as an image.
   * If not provided, it defaults to only allowing drop of files with a content type starting with `image/`.
   */
  canDrop?: ImageCanDropPredicate;
  /**
   * A handler to be called when an error occurs during the upload.
   * If not provided, it defaults to logging the error to the console.
   */
  onError?: ImageUploadErrorHandler;
}
/**
 * Returns an extension that handles image file uploads when pasting or dropping
 * images into the editor.
 *
 * @param options
 */
declare function defineImageUploadHandler({
  uploader,
  canPaste,
  canDrop,
  onError
}: ImageUploadHandlerOptions): PlainExtension;
//#endregion
export { type ImageAttrs, type ImageCanDropPredicate, type ImageCanPastePredicate, type ImageCommandsExtension, type ImageExtension, type ImageSpecExtension, type ImageUploadErrorHandler, type ImageUploadErrorHandlerOptions, type ImageUploadHandlerOptions, type UploadImageOptions, defineImage, defineImageCommands, defineImageSpec, defineImageUploadHandler, insertImage, replaceImageURL, uploadImage };
//# sourceMappingURL=prosekit-extensions-image.d.ts.map