---
title: prosekit/extensions/file
sidebar:
  label: extensions/file
---

## Classes

### UploadTask\<Result\> {#uploadtask}

A class that represents a upload task.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
</tbody>
</table>

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructoruploadtask" href="#constructoruploadtask">UploadTask</a>\<Result\>(`options`: `object`): [`UploadTask`](#uploadtask)\<`Result`\></code>

</dt>

<dd>

Creates a new upload task. You can find the upload task by its object URL
later using `UploadTask.get()`.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>protected</i> <a id="done" href="#done">done</a>: `boolean` = `false`</code>

</dt>

<dd>

A boolean indicating whether the upload is complete (either successfully or with an error).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="finished" href="#finished">finished</a>: [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Result`\></code>

</dt>

<dd>

A promise that fulfills once the upload is complete, or rejects if an error occurs.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="objecturl" href="#objecturl">objectURL</a>: `string`</code>

</dt>

<dd>

An [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
representing the file to be uploaded. This URL will be revoked once the
upload is complete successfully.

</dd>

</dl>

#### Methods

##### subscribeProgress() {#subscribeprogress}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="subscribeprogress-1" href="#subscribeprogress-1">subscribeProgress</a>(`callback`: (`progress`: [`UploadProgress`](#uploadprogress)) => `void`): `VoidFunction`</code>

</dt>

<dd>

Subscribes to progress updates. Returns a function to unsubscribe.

</dd>

</dl>

##### delete() {#delete}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="delete-1" href="#delete-1">delete</a>(`objectURL`: `string`): `void`</code>

</dt>

<dd>

Deletes an upload task by its object URL.

</dd>

</dl>

##### get() {#get}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="get-1" href="#get-1">get</a>\<Result\>(`objectURL`: `string`): `undefined` \| [`UploadTask`](#uploadtask)\<`Result`\></code>

</dt>

<dd>

Finds an upload task by its object URL.

</dd>

</dl>

## Interfaces

### FileDropHandlerOptions {#filedrophandleroptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="event" href="#event">event</a>: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)</code>

</dt>

<dd>

The event that triggered the drop.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="file" href="#file">file</a>: [`File`](https://developer.mozilla.org/docs/Web/API/File)</code>

</dt>

<dd>

The file that was dropped.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pos" href="#pos">pos</a>: `number`</code>

</dt>

<dd>

The position of the document where the file was dropped.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="view" href="#view">view</a>: [`EditorView`](../pm/view.md#editorview)</code>

</dt>

<dd>

The editor view.

</dd>

</dl>

***

### FilePasteHandlerOptions {#filepastehandleroptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="event-1" href="#event-1">event</a>: [`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)</code>

</dt>

<dd>

The event that triggered the paste.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="file-1" href="#file-1">file</a>: [`File`](https://developer.mozilla.org/docs/Web/API/File)</code>

</dt>

<dd>

The file that was pasted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="view-1" href="#view-1">view</a>: [`EditorView`](../pm/view.md#editorview)</code>

</dt>

<dd>

The editor view.

</dd>

</dl>

***

### UploaderOptions {#uploaderoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="file-2" href="#file-2">file</a>: [`File`](https://developer.mozilla.org/docs/Web/API/File)</code>

</dt>

<dd>

The file to be uploaded.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onprogress" href="#onprogress">onProgress</a>: (`progress`: [`UploadProgress`](#uploadprogress)) => `void`</code>

</dt>

<dd>

A callback function that should be called with the upload progress updates.

</dd>

</dl>

***

### UploadProgress {#uploadprogress}

An interface representing the upload progress.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="loaded" href="#loaded">loaded</a>: `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="total" href="#total">total</a>: `number`</code>

</dt>

</dl>

## Type Aliases

### Uploader()\<Result\> {#uploader}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="uploader" href="#uploader">Uploader</a>\<Result\> = (`options`: [`UploaderOptions`](#uploaderoptions)) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Result`\></code>

</dt>

<dd>

The implementation of the actual upload function. You need to implement this
function to upload files to your desired destination.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
</tbody>
</table>

</dd>

</dl>

## Functions

### defineFileDropHandler() {#definefiledrophandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definefiledrophandler-2" href="#definefiledrophandler-2">defineFileDropHandler</a>(`handler`: `FileDropHandler`): `PlainExtension`</code>

</dt>

</dl>

***

### defineFilePasteHandler() {#definefilepastehandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definefilepastehandler-2" href="#definefilepastehandler-2">defineFilePasteHandler</a>(`handler`: `FilePasteHandler`): `PlainExtension`</code>

</dt>

</dl>
