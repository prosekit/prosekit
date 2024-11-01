# Compose editor

In this chapter, we will learn how to use extensions to feature your editor, you can add default [extensions](http://localhost:5173/extensions/blockquote) from ProseKit or build your own extensions.

## Extensions

All customizations in ProseKit are done through extensions. Here we are using the `defineBasicExtension` function to return a basic extension that provides the most common features.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'

// ---cut---
const extension = defineBasicExtension()
```

## Compose your editor with extensions

The `createEditor` function creates an editor instance.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'

const extension = defineBasicExtension()

// ---cut---
const editor = createEditor({ extension })
```

You need to mount the editor to the DOM by calling the `editor.mount(element)` method. When the editor is unmounted, you should call `editor.unmount()` or `editor.mount(null)` to clean up the editor. Check out the minimal examples above to see how to mount the editor in different frameworks.

## Data Persistence

The editor's document is stored in JSON, using the [`NodeJSON`] format. The `<Editor>` component requires two properties: `defaultDoc` and `onDocChange`. `defaultDoc` is the initial content shown when the editor loads. `onDocChange` is a callback function that is executed whenever the document changes.

> ProseKit also provides utilities for converting the editor's document to and from HTML. Be aware that converting to HTML format may not capture all details. See the examples below to see how to use these tools:
>
> - [save-html]
> - [save-markdown]

<!-- References -->

[`NodeJSON`]: https://prosekit.dev/references/core#nodejson
[save-html]: /examples/save-html
[save-markdown]: /examples/save-markdown
