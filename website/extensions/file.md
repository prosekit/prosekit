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
import type { EditorView } from 'prosekit/pm/view'

async function handleFile(view: EditorView, file: File, pos?: number) {
  // Upload the file to a remote server and get the URL
  const url: string = await myUploader(file)

  // Attributes for the image node
  const attrs: ImageAttrs = { src: url }

  // For paste, insert the image node at current text cursor position.
  // For drop, insert the image node at the drop position.
  const command: Command = pos
    ? insertNode({ type: 'image', attrs, pos })
    : insertNode({ type: 'image', attrs })
  return command(view.state, view.dispatch, view)
}

const imagePasteExtension = defineFilePasteHandler(({ view, file }) => {
  if (!file.type.startsWith('image/')) return false
  void handleFile(view, file)
  return true
})

const imageDropExtension = defineFileDropHandler(({ view, file, pos }) => {
  if (!file.type.startsWith('image/')) return false
  void handleFile(view, file, pos)
  return true
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
