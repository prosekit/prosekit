---
title: prosekit/extensions/placeholder
sidebar:
  label: extensions/placeholder
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### PlaceholderOptions {#placeholderoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="placeholder"></a> `placeholder`

</td>
<td>

 \| `string` \| (`state`: [`EditorState`](../pm/state.md#editorstate)) => `string`

</td>
<td>

The placeholder to use. It can be a static string or a function that
receives the current editor state and returns a string.

</td>
</tr>
<tr>
<td>

<a id="strategy"></a> `strategy?`

</td>
<td>

 \| `"doc"` \| `"block"` \| (`state`: [`EditorState`](../pm/state.md#editorstate)) => `boolean`

</td>
<td>

By default, the placeholder text will be shown whenever the current text
cursor is in an empty text node and it's not inside a code block or a
table node.

If you only want to show the placeholder when the whole doc is empty, you
can set this option to 'doc'.

You can also pass a function that receives the current editor state and
returns a boolean value to determine whether the placeholder should be
shown.

**Default**

```ts
'block'
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Functions

### definePlaceholder() {#defineplaceholder}

```ts
function definePlaceholder(options: PlaceholderOptions): PlainExtension;
```

Add a placeholder text to the editor when the current block or document is
empty.

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

[`PlaceholderOptions`](#placeholderoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG memberWithGroups 10 -->
