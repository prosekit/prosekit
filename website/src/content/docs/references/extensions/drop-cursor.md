---
title: prosekit/extensions/drop-cursor
sidebar:
  label: extensions/drop-cursor
---


## DropCursorOptions {#drop-cursor-options}

<dl>

<dt>

`class?: string`

</dt>

<dd>

A CSS class name to add to the cursor element.

</dd>

<dt>

`color?: string | false`

</dt>

<dd>

The color of the cursor.  Use `false` to apply no color and rely only on class.

**Default**: `'black'`

</dd>

<dt>

`width?: number`

</dt>

<dd>

The precise width of the cursor in pixels.

**Default**: `1`

</dd>

</dl>

## defineDropCursor {#define-drop-cursor}

```ts
function defineDropCursor(options?: DropCursorOptions): PlainExtension
```

Show up a decoration at the drop position when something is dragged over the editor.

See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.
