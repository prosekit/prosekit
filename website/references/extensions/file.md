# prosekit/extensions/file

## UploadTask {#upload-task}

A class that represents a upload task.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new UploadTask<Result>(options: { file: File; uploader: Uploader<Result> }): UploadTask<Result>
```

</dd>

<dt>

`done`

</dt>

<dd>

A boolean indicating whether the upload is complete (either successfully or with an error).

**Type**: `boolean`

</dd>

<dt>

`finished`

</dt>

<dd>

A promise that fulfills once the upload is complete, or rejects if an error occurs.

**Type**: `Promise<Result>`

</dd>

<dt>

`objectURL`

</dt>

<dd>

An [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
representing the file to be uploaded. This URL will be revoked once the
upload is complete successfully.

**Type**: `string`

</dd>

<dt>

`subscribeProgress`

</dt>

<dd>

```ts
const subscribeProgress: (callback: (progress: UploadProgress) => void) => VoidFunction
```

</dd>

<dt>

`delete`

</dt>

<dd>

```ts
const delete: (objectURL: string) => void
```

</dd>

<dt>

`get`

</dt>

<dd>

```ts
const get: <Result>(objectURL: string) => undefined | UploadTask<Result>
```

</dd>

</dl>

## FileDropHandlerOptions {#file-drop-handler-options}

<dl>

<dt>

`event`

</dt>

<dd>

The event that triggered the drop.

**Type**: `DragEvent`

</dd>

<dt>

`file`

</dt>

<dd>

The file that was dropped.

**Type**: `File`

</dd>

<dt>

`pos`

</dt>

<dd>

The position of the document where the file was dropped.

**Type**: `number`

</dd>

<dt>

`view`

</dt>

<dd>

The editor view.

**Type**: `EditorView`

</dd>

</dl>

## FilePasteHandlerOptions {#file-paste-handler-options}

<dl>

<dt>

`event`

</dt>

<dd>

The event that triggered the paste.

**Type**: `ClipboardEvent`

</dd>

<dt>

`file`

</dt>

<dd>

The file that was pasted.

**Type**: `File`

</dd>

<dt>

`view`

</dt>

<dd>

The editor view.

**Type**: `EditorView`

</dd>

</dl>

## UploaderOptions {#uploader-options}

<dl>

<dt>

`file`

</dt>

<dd>

The file to be uploaded.

**Type**: `File`

</dd>

<dt>

`onProgress`

</dt>

<dd>

A callback function that should be called with the upload progress updates.

**Type**: `(progress: UploadProgress) => void`

</dd>

</dl>

## UploadProgress {#upload-progress}

An interface representing the upload progress.

<dl>

<dt>

`loaded`

</dt>

<dd>

**Type**: `number`

</dd>

<dt>

`total`

</dt>

<dd>

**Type**: `number`

</dd>

</dl>

## Uploader {#uploader}

The implementation of the actual upload function. You need to implement this
function to upload files to your desired destination.

**Type**: `(options: UploaderOptions) => Promise<Result>`

## defineFileDropHandler {#define-file-drop-handler}

```ts
function defineFileDropHandler(handler: FileDropHandler): PlainExtension
```

## defineFilePasteHandler {#define-file-paste-handler}

```ts
function defineFilePasteHandler(handler: FilePasteHandler): PlainExtension
```
