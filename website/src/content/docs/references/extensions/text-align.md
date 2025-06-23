---
title: prosekit/extensions/text-align
sidebar:
  label: extensions/text-align
---

## Interfaces

### TextAlignOptions\<NodeName\> {#textalignoptions}

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

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="default" href="#default">default</a><i>?</i>: `string`</code>

</dt>

<dd>

The default value for the attribute.

###### Default

```ts
"left"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="types" href="#types">types</a>: `NodeName`[]</code>

</dt>

<dd>

The names of node to add the attribute to.

###### Example

```ts
["paragraph", "heading"]
```

</dd>

</dl>

## Functions

### defineTextAlign() {#definetextalign}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetextalign-2" href="#definetextalign-2">defineTextAlign</a>\<NodeName\>(`options`: [`TextAlignOptions`](#textalignoptions)\<`NodeName`\>): `TextAlignExtension`\<`NodeName`\></code>

</dt>

<dd>

Adds a `textAlign` attribute to the specified nodes. This will be rendered as
a CSS `text-align` style.

</dd>

</dl>
