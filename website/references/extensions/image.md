# prosekit/extensions/image

<a id="ImageAttrs" name="ImageAttrs"></a>

## ImageAttrs

### Properties

<a id="src" name="src"></a>

#### src?

> `optional` **src**: `null` \| `string`

***

<a id="defineImage" name="defineImage"></a>

## defineImage()

> **defineImage**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type | Value |
| :------ | :------ | :------ |
| `Commands` | `object` | - |
| `Commands.insertImage` | [[`ImageAttrs`](image.md#ImageAttrs)] | ... |
| `Marks` | `never` | - |
| `Nodes` | `"image"` | - |

***

<a id="defineImageCommands" name="defineImageCommands"></a>

## defineImageCommands()

> **defineImageCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type | Value |
| :------ | :------ | :------ |
| `Commands` | `object` | - |
| `Commands.insertImage` | [[`ImageAttrs`](image.md#ImageAttrs)] | ... |
| `Marks` | `never` | - |
| `Nodes` | `never` | - |

***

<a id="defineImageSpec" name="defineImageSpec"></a>

## defineImageSpec()

> **defineImageSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"image"` |
