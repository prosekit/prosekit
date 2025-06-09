---
title: prosekit/extensions/file
sidebar:
  label: extensions/file
---


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

`done: boolean`

</dt>

<dd>

A boolean indicating whether the upload is complete (either successfully or with an error).

</dd>

<dt>

`finished: Promise<Result>`

</dt>

<dd>

A promise that fulfills once the upload is complete, or rejects if an error occurs.

</dd>

<dt>

`objectURL: string`

</dt>

<dd>

An [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
representing the file to be uploaded. This URL will be revoked once the
upload is complete successfully.

</dd>

<dt>

`subscribeProgress`

</dt>

<dd>

Subscribes to progress updates. Returns a function to unsubscribe.

```ts
const subscribeProgress: (callback: (progress: UploadProgress) => void) => VoidFunction
```

</dd>

<dt>

`delete`

</dt>

<dd>

Deletes an upload task by its object URL.

```ts
const delete: (objectURL: string) => void
```

</dd>

<dt>

`get`

</dt>

<dd>

Finds an upload task by its object URL.

```ts
const get: <Result>(objectURL: string) => undefined | UploadTask<Result>
```

</dd>

</dl>

## FileDropHandlerOptions {#file-drop-handler-options}

<dl>

<dt>

`event: DragEvent`

</dt>

<dd>

The event that triggered the drop.

</dd>

<dt>

`file: File`

</dt>

<dd>

The file that was dropped.

</dd>

<dt>

`pos: number`

</dt>

<dd>

The position of the document where the file was dropped.

</dd>

<dt>

`view: EditorView`

</dt>

<dd>

The editor view.

</dd>

</dl>

## FilePasteHandlerOptions {#file-paste-handler-options}

<dl>

<dt>

`event: ClipboardEvent`

</dt>

<dd>

The event that triggered the paste.

</dd>

<dt>

`file: File`

</dt>

<dd>

The file that was pasted.

</dd>

<dt>

`view: EditorView`

</dt>

<dd>

The editor view.

</dd>

</dl>

## UploaderOptions {#uploader-options}

<dl>

<dt>

`file: File`

</dt>

<dd>

The file to be uploaded.

</dd>

<dt>

`onProgress: (progress: UploadProgress) => void`

</dt>

<dd>

A callback function that should be called with the upload progress updates.

</dd>

</dl>

## UploadProgress {#upload-progress}

An interface representing the upload progress.

<dl>

<dt>

`loaded: number`

</dt>

<dd>

</dd>

<dt>

`total: number`

</dt>

<dd>

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
