---
title: prosekit/extensions/list
sidebar:
  label: extensions/list
---

## Interfaces

### ListAttrs {#listattrs}

The attributes of a list node.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="checked" href="#checked">checked</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the list node is checked if its `kind` is `"task"`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="collapsed" href="#collapsed">collapsed</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the list node is collapsed if its `kind` is `"toggle"`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="kind" href="#kind">kind</a><i>?</i>: `"toggle"` \| `"bullet"` \| `"ordered"` \| `"task"`</code>

</dt>

<dd>

The kind of list node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="order" href="#order">order</a><i>?</i>: `null` \| `number`</code>

</dt>

<dd>

The optional order of the list node.

</dd>

</dl>

## Functions

### defineList() {#definelist}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definelist-2" href="#definelist-2">defineList</a>(): `ListExtension`</code>

</dt>

<dd>

</dd>

</dl>
