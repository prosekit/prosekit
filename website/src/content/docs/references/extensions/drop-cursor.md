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

##### class? {#class}

```ts
optional class: string;
```

A CSS class name to add to the cursor element.

<!-- DEBUG inheritance start kind=1024 -->

##### color? {#color}

```ts
optional color: string | false;
```

The color of the cursor.  Use `false` to apply no color and rely only on class.

###### Default

```ts
'black'
```

<!-- DEBUG inheritance start kind=1024 -->

##### width? {#width}

```ts
optional width: number;
```

The precise width of the cursor in pixels.

###### Default

```ts
1
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
