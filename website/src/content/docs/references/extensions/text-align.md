---
title: prosekit/extensions/text-align
sidebar:
  label: extensions/text-align
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### TextAlignOptions\<NodeName\> {#textalignoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`NodeName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### default? {#default}

```ts
optional default: string;
```

The default value for the attribute.

###### Default

```ts
"left"
```

##### types {#types}

```ts
types: NodeName[];
```

The names of node to add the attribute to.

###### Example

```ts
["paragraph", "heading"]
```

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineTextAlign() {#definetextalign}

```ts
function defineTextAlign<NodeName>(options: TextAlignOptions<NodeName>): TextAlignExtension<NodeName>;
```

Adds a `textAlign` attribute to the specified nodes. This will be rendered as
a CSS `text-align` style.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`NodeName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

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

[`TextAlignOptions`](#textalignoptions)\<`NodeName`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`TextAlignExtension`\<`NodeName`\>

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
