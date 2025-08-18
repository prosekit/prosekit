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

<code data-typedoc-code><a id="kind" href="#kind">kind</a><i>?</i>: `"toggle"` \| `"bullet"` \| `"ordered"` \| `"task"`</code>

</dt>

<dd>

The kind of list node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="order" href="#order">order</a><i>?</i>: `null` \| `number`</code>

</dt>

<dd>

The optional order of the list node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="checked" href="#checked">checked</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the list node is checked if its `kind` is `"task"`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="collapsed" href="#collapsed">collapsed</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the list node is collapsed if its `kind` is `"toggle"`.

</dd>

</dl>

## Functions

### defineList() {#definelist}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definelist" href="#definelist">defineList</a>(): `ListExtension`</code>

</dt>

<dd>

</dd>

</dl>
