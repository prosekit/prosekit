---
title: prosekit/extensions/text-align
sidebar:
  label: extensions/text-align
---

## Interfaces

### TextAlignOptions\<NodeName\> {#textalignoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="types" href="#types">types</a>: `NodeName`[]</code>

</dt>

<dd>

The names of node to add the attribute to.

###### Example

```ts
["paragraph", "heading"]
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="default" href="#default">default</a><i>?</i>: `string`</code>

</dt>

<dd>

The default value for the attribute.

###### Default

`"left"`

</dd>

</dl>

## Functions

### defineTextAlign() {#definetextalign}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetextalign" href="#definetextalign">defineTextAlign</a>\<NodeName\>(`options`: [`TextAlignOptions`](#textalignoptions)\<`NodeName`\>): `TextAlignExtension`\<`NodeName`\></code>

</dt>

<dd>

Adds a `textAlign` attribute to the specified nodes. This will be rendered as
a CSS `text-align` style.

</dd>

</dl>
