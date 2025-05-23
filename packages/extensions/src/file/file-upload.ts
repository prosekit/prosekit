/**
 * An interface representing the upload progress.
 */
export interface UploadProgress {
  // A number representing the amount of work already performed by the
  // underlying process.
  loaded: number
  // A number representing the total amount of work that the underlying
  // process is in the progress of performing.
  total: number
}

export interface UploaderOptions {
  /**
   * The file to be uploaded.
   */
  file: File

  /**
   * A callback function that should be called with the upload progress updates.
   */
  onProgress: (progress: UploadProgress) => void
}

/**
 * The implementation of the actual upload function. You need to implement this
 * function to upload files to your desired destination.
 */
export type Uploader<Result> = (options: UploaderOptions) => Promise<Result>

/**
 * A class that represents a upload task.
 */
export class UploadTask<Result> {
  /**
   * An [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
   * representing the file to be uploaded. This URL will be revoked once the
   * upload is complete successfully.
   */
  readonly objectURL: string

  /**
   * A boolean indicating whether the upload is complete (either successfully or with an error).
   */
  protected done = false

  /**
   * A promise that fulfills once the upload is complete, or rejects if an error occurs.
   */
  readonly finished: Promise<Result>

  private subscribers: ((progress: UploadProgress) => void)[] = []

  /**
   * Creates a new upload task. You can find the upload task by its object URL
   * later using `UploadTask.get()`.
   *
   * @param options - The options for the upload task.
   */
  constructor({ file, uploader }: { file: File; uploader: Uploader<Result> }) {
    this.objectURL = URL.createObjectURL(file)
    this.finished = new Promise((resolve, reject) => {
      const maybePromise = uploader({
        file,
        onProgress: (progress) => {
          for (const subscriber of this.subscribers) {
            subscriber(progress)
          }
        },
      })
      Promise.resolve(maybePromise).then(
        (result) => {
          this.done = true
          URL.revokeObjectURL(this.objectURL)
          resolve(result)
        },
        (error) => {
          this.done = true
          reject(
            new Error('[prosekit] Failed to upload file', { cause: error }),
          )
        },
      )
    })
    store.set(this.objectURL, this)
  }

  /**
   * Subscribes to progress updates. Returns a function to unsubscribe.
   */
  public subscribeProgress(
    callback: (progress: UploadProgress) => void,
  ): VoidFunction {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(
        (subscriber) => subscriber !== callback,
      )
    }
  }

  /**
   * Finds an upload task by its object URL.
   */
  static get<Result = unknown>(
    objectURL: string,
  ): UploadTask<Result> | undefined {
    return store.get(objectURL) as UploadTask<Result> | undefined
  }

  /**
   * Deletes an upload task by its object URL.
   */
  static delete(objectURL: string): void {
    store.delete(objectURL)
  }
}

const store = new Map<string, UploadTask<unknown>>()
