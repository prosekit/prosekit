---
title: prosekit/extensions/image
sidebar:
  label: extensions/image
---

## Interfaces

### UploadImageOptions {#uploadimageoptions}

Options for [uploadImage](#uploadimage).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="uploader" href="#uploader">uploader</a>: [`Uploader`](file.md#uploader)\<`string`\></code>

</dt>

<dd>

The uploader used to upload the file. It should return a promise that
resolves to the URL of the uploaded image.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="file" href="#file">file</a>: [`File`](https://developer.mozilla.org/docs/Web/API/File)</code>

</dt>

<dd>

The file that will be uploaded.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="pos" href="#pos">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

The position where the image should be inserted. If not provided, the
image is inserted at the current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onerror" href="#onerror">onError</a><i>?</i>: [`ImageUploadErrorHandler`](#imageuploaderrorhandler)</code>

</dt>

<dd>

A handler to be called when an error occurs during the upload.

</dd>

</dl>

***

### ImageUploadErrorHandlerOptions {#imageuploaderrorhandleroptions}

Options for the [ImageUploadErrorHandler](#imageuploaderrorhandler) callback.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="file-1" href="#file-1">file</a>: [`File`](https://developer.mozilla.org/docs/Web/API/File)</code>

</dt>

<dd>

The file that was uploaded.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="error" href="#error">error</a>: `unknown`</code>

</dt>

<dd>

The error that occurred during the upload.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="uploadtask" href="#uploadtask">uploadTask</a>: [`UploadTask`](file.md#uploadtask)\<`string`\></code>

</dt>

<dd>

The upload task that was used to upload the file.

</dd>

</dl>

***

### ImageAttrs {#imageattrs}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="src" href="#src">src</a><i>?</i>: `string` \| `null`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="width" href="#width">width</a><i>?</i>: `number` \| `null`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="height" href="#height">height</a><i>?</i>: `number` \| `null`</code>

</dt>

</dl>

***

### ImageUploadHandlerOptions {#imageuploadhandleroptions}

A handler to be called when an error occurs during the upload.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="uploader-1" href="#uploader-1">uploader</a>: [`Uploader`](file.md#uploader)\<`string`\></code>

</dt>

<dd>

The uploader used to upload the file. It should return a promise that
resolves to the URL of the uploaded image.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="canpaste" href="#canpaste">canPaste</a><i>?</i>: [`ImageCanPastePredicate`](#imagecanpastepredicate)</code>

</dt>

<dd>

A predicate to determine if the pasted file should be uploaded and inserted as an image.
If not provided, it defaults to only allowing paste of files with a content type starting with `image/`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="candrop" href="#candrop">canDrop</a><i>?</i>: [`ImageCanDropPredicate`](#imagecandroppredicate)</code>

</dt>

<dd>

A predicate to determine if the dropped file should be uploaded and inserted as an image.
If not provided, it defaults to only allowing drop of files with a content type starting with `image/`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onerror-1" href="#onerror-1">onError</a><i>?</i>: [`ImageUploadErrorHandler`](#imageuploaderrorhandler)</code>

</dt>

<dd>

A handler to be called when an error occurs during the upload.
If not provided, it defaults to logging the error to the console.

</dd>

</dl>

## Type Aliases

### ImageUploadErrorHandler() {#imageuploaderrorhandler}

<dl>

<dt>

<code data-typedoc-code>type <a id="imageuploaderrorhandler" href="#imageuploaderrorhandler">ImageUploadErrorHandler</a> = (`options`: [`ImageUploadErrorHandlerOptions`](#imageuploaderrorhandleroptions)) => `void`</code>

</dt>

<dd>

A handler to be called when an error occurs during the upload.

</dd>

</dl>

***

### ImageCanPastePredicate() {#imagecanpastepredicate}

<dl>

<dt>

<code data-typedoc-code>type <a id="imagecanpastepredicate" href="#imagecanpastepredicate">ImageCanPastePredicate</a> = (`options`: [`FilePasteHandlerOptions`](file.md#filepastehandleroptions)) => `boolean`</code>

</dt>

<dd>

A predicate to determine if the pasted file should be uploaded and inserted as an image.

</dd>

</dl>

***

### ImageCanDropPredicate() {#imagecandroppredicate}

<dl>

<dt>

<code data-typedoc-code>type <a id="imagecandroppredicate" href="#imagecandroppredicate">ImageCanDropPredicate</a> = (`options`: [`FileDropHandlerOptions`](file.md#filedrophandleroptions)) => `boolean`</code>

</dt>

<dd>

A predicate to determine if the dropped file should be uploaded and inserted as an image.

</dd>

</dl>

## Functions

### insertImage() {#insertimage}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="insertimage" href="#insertimage">insertImage</a>(`attrs?`: [`ImageAttrs`](#imageattrs)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Returns a command that inserts an image node with the given attributes at the
current selection position.

</dd>

</dl>

***

### uploadImage() {#uploadimage}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="uploadimage" href="#uploadimage">uploadImage</a>(`options`: [`UploadImageOptions`](#uploadimageoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Returns a command that uploads an image file and inserts an image node with a
temporary URL which is replaced once the upload completes.

</dd>

</dl>

***

### defineImageUploadHandler() {#defineimageuploadhandler}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineimageuploadhandler" href="#defineimageuploadhandler">defineImageUploadHandler</a>(`options`: [`ImageUploadHandlerOptions`](#imageuploadhandleroptions)): `PlainExtension`</code>

</dt>

<dd>

Returns an extension that handles image file uploads when pasting or dropping
images into the editor.

</dd>

</dl>

***

### defineImage() {#defineimage}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineimage" href="#defineimage">defineImage</a>(): `ImageExtension`</code>

</dt>

<dd>

</dd>

</dl>
