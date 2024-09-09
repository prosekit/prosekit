# prosekit/extensions/list

<a id="ListAttrs" name="ListAttrs"></a>

## ListAttrs

The attributes of a list node.

### Properties

<a id="checked" name="checked"></a>

#### checked?

> `optional` **checked**: `boolean`

Whether the list node is checked if its `kind` is `"task"`.

<a id="collapsed" name="collapsed"></a>

#### collapsed?

> `optional` **collapsed**: `boolean`

Whether the list node is collapsed if its `kind` is `"toggle"`.

<a id="kind" name="kind"></a>

#### kind?

> `optional` **kind**: `"toggle"` \| `"bullet"` \| `"ordered"` \| `"task"`

The kind of list node.

<a id="order" name="order"></a>

#### order?

> `optional` **order**: `null` \| `number`

The optional order of the list node.

***

<a id="defineList" name="defineList"></a>

## defineList()

> **defineList**(): `ListExtension`

### Returns

`ListExtension`
