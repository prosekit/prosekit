---
title: prosekit/extensions/file
sidebar:
  label: extensions/file
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### UploadTask\<Result\> {#uploadtask}

<!-- DEBUG memberWithGroups 1 -->

A class that represents a upload task.

<!-- DEBUG memberWithGroups 4 -->

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

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new UploadTask<Result>(options: object): UploadTask<Result>;
```

Creates a new upload task. You can find the upload task by its object URL
later using `UploadTask.get()`.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

\{ `file`: [`File`](https://developer.mozilla.org/docs/Web/API/File); `uploader`: [`Uploader`](#uploader)\<`Result`\>; \}

</td>
<td>

The options for the upload task.

</td>
</tr>
<tr>
<td>

`options.file`

</td>
<td>

[`File`](https://developer.mozilla.org/docs/Web/API/File)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options.uploader`

</td>
<td>

[`Uploader`](#uploader)\<`Result`\>

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

[`UploadTask`](#uploadtask)\<`Result`\>

<!-- DEBUG inheritance start kind=16384 -->

#### Properties

##### done {#done}

```ts
protected done: boolean = false;
```

A boolean indicating whether the upload is complete (either successfully or with an error).

<!-- DEBUG inheritance start kind=1024 -->

##### finished {#finished}

```ts
readonly finished: Promise<Result>;
```

A promise that fulfills once the upload is complete, or rejects if an error occurs.

<!-- DEBUG inheritance start kind=1024 -->

##### objectURL {#objecturl}

```ts
readonly objectURL: string;
```

An [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
representing the file to be uploaded. This URL will be revoked once the
upload is complete successfully.

<!-- DEBUG inheritance start kind=1024 -->

#### Methods

##### subscribeProgress() {#subscribeprogress}

```ts
subscribeProgress(callback: (progress: UploadProgress) => void): VoidFunction;
```

Subscribes to progress updates. Returns a function to unsubscribe.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

(`progress`: [`UploadProgress`](#uploadprogress)) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`VoidFunction`

<!-- DEBUG inheritance start kind=4096 -->

##### delete() {#delete}

```ts
static delete(objectURL: string): void;
```

Deletes an upload task by its object URL.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`objectURL`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

##### get() {#get}

```ts
static get<Result>(objectURL: string): undefined | UploadTask<Result>;
```

Finds an upload task by its object URL.

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`objectURL`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| [`UploadTask`](#uploadtask)\<`Result`\>

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### FileDropHandlerOptions {#filedrophandleroptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### event {#event}

```ts
event: DragEvent;
```

The event that triggered the drop.

<!-- DEBUG inheritance start kind=1024 -->

##### file {#file}

```ts
file: File;
```

The file that was dropped.

<!-- DEBUG inheritance start kind=1024 -->

##### pos {#pos}

```ts
pos: number;
```

The position of the document where the file was dropped.

<!-- DEBUG inheritance start kind=1024 -->

##### view {#view}

```ts
view: EditorView;
```

The editor view.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### FilePasteHandlerOptions {#filepastehandleroptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### event {#event-1}

```ts
event: ClipboardEvent;
```

The event that triggered the paste.

<!-- DEBUG inheritance start kind=1024 -->

##### file {#file-1}

```ts
file: File;
```

The file that was pasted.

<!-- DEBUG inheritance start kind=1024 -->

##### view {#view-1}

```ts
view: EditorView;
```

The editor view.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### UploaderOptions {#uploaderoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### file {#file-2}

```ts
file: File;
```

The file to be uploaded.

<!-- DEBUG inheritance start kind=1024 -->

##### onProgress() {#onprogress}

```ts
onProgress: (progress: UploadProgress) => void;
```

A callback function that should be called with the upload progress updates.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`progress`

</td>
<td>

[`UploadProgress`](#uploadprogress)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### UploadProgress {#uploadprogress}

<!-- DEBUG memberWithGroups 1 -->

An interface representing the upload progress.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### loaded {#loaded}

```ts
loaded: number;
```

<!-- DEBUG inheritance start kind=1024 -->

##### total {#total}

```ts
total: number;
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### Uploader()\<Result\> {#uploader}

```ts
type Uploader<Result> = (options: UploaderOptions) => Promise<Result>;
```

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

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`UploaderOptions`](#uploaderoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Result`\>

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=2097152 -->

## Functions

### defineFileDropHandler() {#definefiledrophandler}

```ts
function defineFileDropHandler(handler: FileDropHandler): PlainExtension;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`handler`

</td>
<td>

`FileDropHandler`

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineFilePasteHandler() {#definefilepastehandler}

```ts
function defineFilePasteHandler(handler: FilePasteHandler): PlainExtension;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`handler`

</td>
<td>

`FilePasteHandler`

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
