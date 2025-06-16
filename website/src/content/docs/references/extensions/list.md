---
title: prosekit/extensions/list
sidebar:
  label: extensions/list
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### ListAttrs {#listattrs}

<!-- DEBUG memberWithGroups 1 -->

The attributes of a list node.

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

<a id="checked"></a> `checked?`

</td>
<td>

`boolean`

</td>
<td>

Whether the list node is checked if its `kind` is `"task"`.

</td>
</tr>
<tr>
<td>

<a id="collapsed"></a> `collapsed?`

</td>
<td>

`boolean`

</td>
<td>

Whether the list node is collapsed if its `kind` is `"toggle"`.

</td>
</tr>
<tr>
<td>

<a id="kind"></a> `kind?`

</td>
<td>

`"toggle"` \| `"bullet"` \| `"ordered"` \| `"task"`

</td>
<td>

The kind of list node.

</td>
</tr>
<tr>
<td>

<a id="order"></a> `order?`

</td>
<td>

`null` \| `number`

</td>
<td>

The optional order of the list node.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineList() {#definelist}

```ts
function defineList(): ListExtension;
```

#### Returns

`ListExtension`

<!-- DEBUG memberWithGroups 10 -->
