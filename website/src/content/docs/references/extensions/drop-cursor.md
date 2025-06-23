---
title: prosekit/extensions/drop-cursor
sidebar:
  label: extensions/drop-cursor
---

## Interfaces

### DropCursorOptions {#dropcursoroptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="class" href="#class">class</a><i>?</i>: `string`</code>

</dt>

<dd>

A CSS class name to add to the cursor element.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="color" href="#color">color</a><i>?</i>: `string` \| `false`</code>

</dt>

<dd>

The color of the cursor.  Use `false` to apply no color and rely only on class.

###### Default

```ts
'black'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="width" href="#width">width</a><i>?</i>: `number`</code>

</dt>

<dd>

The precise width of the cursor in pixels.

###### Default

```ts
1
```

</dd>

</dl>

## Functions

### defineDropCursor() {#definedropcursor}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedropcursor-2" href="#definedropcursor-2">defineDropCursor</a>(`options?`: [`DropCursorOptions`](#dropcursoroptions)): `PlainExtension`</code>

</dt>

<dd>

Show up a decoration at the drop position when something is dragged over the editor.

See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.

</dd>

</dl>
