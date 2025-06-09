---
title: prosekit/extensions/list
sidebar:
  label: extensions/list
---


## ListAttrs {#list-attrs}

The attributes of a list node.

<dl>

<dt>

`checked?: boolean`

</dt>

<dd>

Whether the list node is checked if its `kind` is `"task"`.

</dd>

<dt>

`collapsed?: boolean`

</dt>

<dd>

Whether the list node is collapsed if its `kind` is `"toggle"`.

</dd>

<dt>

`kind?: "toggle" | "bullet" | "ordered" | "task"`

</dt>

<dd>

The kind of list node.

</dd>

<dt>

`order?: null | number`

</dt>

<dd>

The optional order of the list node.

</dd>

</dl>

## defineList {#define-list}

```ts
function defineList(): ListExtension
```
