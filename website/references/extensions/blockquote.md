# prosekit/extensions/blockquote

<a id="defineBlockquote" name="defineBlockquote"></a>

## defineBlockquote()

> **defineBlockquote**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `object` |
| `Marks` | `any` |
| `Nodes` | `any` |

***

<a id="defineBlockquoteInputRule" name="defineBlockquoteInputRule"></a>

## defineBlockquoteInputRule()

> **defineBlockquoteInputRule**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

Wraps the text block in a blockquote when `>` is typed at the start of a new
line followed by a space.

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineBlockquoteSpec" name="defineBlockquoteSpec"></a>

## defineBlockquoteSpec()

> **defineBlockquoteSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"blockquote"` |
