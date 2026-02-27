import { PlainExtension } from "@prosekit/core";
import { EditorView } from "@prosekit/pm/view";

//#region src/file/file-drop-handler.d.ts
interface FileDropHandlerOptions {
  /**
   * The editor view.
   */
  view: EditorView;
  /**
   * The event that triggered the drop.
   */
  event: DragEvent;
  /**
   * The file that was dropped.
   */
  file: File;
  /**
   * The position of the document where the file was dropped.
   */
  pos: number;
}
/**
 * A function that handles one of the files in a drop event.
 *
 * Returns `true` if the file was handled and thus should not be handled by
 * other handlers.
 */
type FileDropHandler = (options: FileDropHandlerOptions) => boolean | void;
declare function defineFileDropHandler(handler: FileDropHandler): PlainExtension;
//#endregion
//#region src/file/file-paste-handler.d.ts
interface FilePasteHandlerOptions {
  /**
   * The editor view.
   */
  view: EditorView;
  /**
   * The event that triggered the paste.
   */
  event: ClipboardEvent;
  /**
   * The file that was pasted.
   */
  file: File;
}
/**
 * A function that handles one of the files in a paste event.
 *
 * Returns `true` if the file was handled and thus should not be handled by
 * other handlers.
 */
type FilePasteHandler = (options: FilePasteHandlerOptions) => boolean | void;
declare function defineFilePasteHandler(handler: FilePasteHandler): PlainExtension;
//#endregion
//#region src/file/file-upload.d.ts
/**
 * An interface representing the upload progress.
 */
interface UploadProgress {
  loaded: number;
  total: number;
}
interface UploaderOptions {
  /**
   * The file to be uploaded.
   */
  file: File;
  /**
   * A callback function that should be called with the upload progress updates.
   */
  onProgress: (progress: UploadProgress) => void;
}
/**
 * The implementation of the actual upload function. You need to implement this
 * function to upload files to your desired destination.
 */
type Uploader<Result> = (options: UploaderOptions) => Promise<Result>;
/**
 * A class that represents a upload task.
 */
declare class UploadTask<Result> {
  /**
   * An [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
   * representing the file to be uploaded. This URL will be revoked once the
   * upload is complete successfully.
   */
  readonly objectURL: string;
  /**
   * A boolean indicating whether the upload is complete (either successfully or with an error).
   */
  protected done: boolean;
  /**
   * If the upload is complete successfully, this will be the result of the upload.
   */
  protected result: Result | undefined;
  /**
   * If the upload is complete with an error, this will be the error that occurred.
   */
  protected error: Error | undefined;
  /**
   * A promise that fulfills once the upload is complete, or rejects if an error occurs.
   */
  readonly finished: Promise<Result>;
  private subscribers;
  /**
   * Creates a new upload task. You can find the upload task by its object URL
   * later using `UploadTask.get()`.
   *
   * @param options - The options for the upload task.
   */
  constructor({
    file,
    uploader
  }: {
    file: File;
    uploader: Uploader<Result>;
  });
  /**
   * Subscribes to progress updates. Returns a function to unsubscribe.
   */
  subscribeProgress(callback: (progress: UploadProgress) => void): VoidFunction;
  /**
   * Finds an upload task from the global store by its object URL.
   */
  static get<Result = unknown>(objectURL: string): UploadTask<Result> | undefined;
  /**
   * Deletes an upload task from the global store by its object URL.
   */
  static delete(objectURL: string): void;
}
//#endregion
export { FilePasteHandler as a, FileDropHandler as c, UploaderOptions as i, FileDropHandlerOptions as l, UploadTask as n, FilePasteHandlerOptions as o, Uploader as r, defineFilePasteHandler as s, UploadProgress as t, defineFileDropHandler as u };
//# sourceMappingURL=index-DGb484yw.d.ts.map