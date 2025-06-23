---
title: prosekit/extensions/placeholder
sidebar:
  label: extensions/placeholder
---

## Interfaces

### PlaceholderOptions {#placeholderoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="placeholder" href="#placeholder">placeholder</a>: `string` \| (`state`: [`EditorState`](../pm/state.md#editorstate)) => `string`</code>

</dt>

<dd>

The placeholder to use. It can be a static string or a function that
receives the current editor state and returns a string.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="strategy" href="#strategy">strategy</a><i>?</i>: `"doc"` \| `"block"` \| (`state`: [`EditorState`](../pm/state.md#editorstate)) => `boolean`</code>

</dt>

<dd>

By default, the placeholder text will be shown whenever the current text
cursor is in an empty text node and it's not inside a code block or a
table node.

If you only want to show the placeholder when the whole doc is empty, you
can set this option to 'doc'.

You can also pass a function that receives the current editor state and
returns a boolean value to determine whether the placeholder should be
shown.

###### Default

```ts
'block'
```

</dd>

</dl>

## Functions

### definePlaceholder() {#defineplaceholder}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineplaceholder-2" href="#defineplaceholder-2">definePlaceholder</a>(`options`: [`PlaceholderOptions`](#placeholderoptions)): `PlainExtension`</code>

</dt>

<dd>

Add a placeholder text to the editor when the current block or document is
empty.

</dd>

</dl>
