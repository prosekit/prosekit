# prosekit/extensions/placeholder

## PlaceholderOptions {#placeholder-options}

<dl>

<dt>

`placeholder`

</dt>

<dd>

The placeholder to use. It can be a static string or a function that
receives the current editor state and returns a string.

**Type**: `string | ((state: EditorState) => string)`

</dd>

<dt>

`strategy`

</dt>

<dd>

By default, the placeholder text will be shown whenever the current text
cursor is in an empty text node. If you only want to show the placeholder
when the whole doc is empty, you can set this option to 'doc'.

**Type**: `"doc" | "block"`

**Default**: `'block'`

</dd>

</dl>

## definePlaceholder {#define-placeholder}

```ts
function definePlaceholder(options: PlaceholderOptions): PlainExtension
```

Add a placeholder text to the editor when the current block or document is
empty.
