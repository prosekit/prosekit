---
title: prosekit/extensions/drop-cursor
sidebar:
  label: extensions/drop-cursor
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### DropCursorOptions {#dropcursoroptions}

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

<a id="class"></a> `class?`

</td>
<td>

`string`

</td>
<td>

A CSS class name to add to the cursor element.

</td>
</tr>
<tr>
<td>

<a id="color"></a> `color?`

</td>
<td>

`string` \| `false`

</td>
<td>

The color of the cursor.  Use `false` to apply no color and rely only on class.

**Default**

```ts
'black'
```

</td>
</tr>
<tr>
<td>

<a id="width"></a> `width?`

</td>
<td>

`number`

</td>
<td>

The precise width of the cursor in pixels.

**Default**

```ts
1
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineDropCursor() {#definedropcursor}

```ts
function defineDropCursor(options?: DropCursorOptions): PlainExtension;
```

Show up a decoration at the drop position when something is dragged over the editor.

See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.

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

`options?`

</td>
<td>

[`DropCursorOptions`](#dropcursoroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG memberWithGroups 10 -->
