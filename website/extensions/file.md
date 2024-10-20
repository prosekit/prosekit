# File

A set of APIs for handling file pasting, dropping and uploading in the editor.

<!-- @include: @/examples/image-view.md -->

## Usage

It's common to upload files to a remote server when pasting or dropping files into the editor.

The easiest way is update the document after uploading the file to a remote server and getting the file URL. Here's an example to handle image files:

```ts twoslash
function myUploader(file: File): Promise<string> {
  return Promise.resolve('https://example.com/file.png')
}

// ---cut---
import { insertNode } from 'prosekit/core'
import {
  defineFilePasteHandler,
  defineFileDropHandler,
} from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { Command } from 'prosekit/pm/state'

const imagePasteExtension = defineFilePasteHandler(({ view, file }) => {
  // Only handle image files
  if (!file.type.startsWith('image/')) return false

  // Upload the file to a remote server and get the URL
  const url: string = await myUploader(file)

  // Insert the image into current text cursor position
  const attrs: ImageAttrs = { src: url }
  const command: Command = insertNode({ type: 'image', attrs })
  return command(view.state, view.dispatch, view)
})

const imageDropExtension = defineFileDropHandler(({ view, files }, pos) => {
  // Only handle image files
  if (!file.type.startsWith('image/')) return false

  // Upload the file to a remote server and get the URL
  const url: string = await myUploader(file)

  // Insert the image into drop position
  const attrs: ImageAttrs = { src: url }
  const command: Command = insertNode({ type: 'image', attrs }, pos)
  return command(view.state, view.dispatch, view)
})
```

However, images won't be displayed until the upload is complete, this is especially annoying when the upload is slow. To improve the user experience, you can insert an image right away and update the image URL after uploading is complete. ProseKit provides a `UploadTask` class to make it easier.

First, create an `UploadTask` instance when the paste or drop event is triggered:

::: code-group

<<< @/../playground/components/common/upload-file.ts

:::

Then, in the node view that renders the image, wait for the `UploadTask` instance to complete and update the image URL:

<!-- @include: @/example-code-blocks/image-view/image-view.md -->

You can check the full example [here](/examples/image-view).

## API Reference

- [prosekit/extensions/file](/references/extensions/file)
