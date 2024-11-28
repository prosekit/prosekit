# prosekit/extensions/list

## ListAttrs {#list-attrs}

The attributes of a list node.

<dl>

<dt>

`checked`

</dt>

<dd>

Whether the list node is checked if its `kind` is `"task"`.

**Type**: `boolean`

</dd>

<dt>

`collapsed`

</dt>

<dd>

Whether the list node is collapsed if its `kind` is `"toggle"`.

**Type**: `boolean`

</dd>

<dt>

`kind`

</dt>

<dd>

The kind of list node.

**Type**: `"toggle" | "bullet" | "ordered" | "task"`

</dd>

<dt>

`order`

</dt>

<dd>

The optional order of the list node.

**Type**: `null | number`

</dd>

</dl>

## defineList {#define-list}

```ts
function defineList(): ListExtension
```
