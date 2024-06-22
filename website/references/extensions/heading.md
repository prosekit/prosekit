# prosekit/extensions/heading

<a id="HeadingAttrs" name="HeadingAttrs"></a>

## HeadingAttrs

### Properties

<a id="level" name="level"></a>

#### level

> **level**: `number`

***

<a id="defineHeading" name="defineHeading"></a>

## defineHeading()

> **defineHeading**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `object` |
| `Marks` | `any` |
| `Nodes` | `any` |

***

<a id="defineHeadingCommands" name="defineHeadingCommands"></a>

## defineHeadingCommands()

> **defineHeadingCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type | Value |
| :------ | :------ | :------ |
| `Commands` | `object` | - |
| `Commands.insertHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | ... |
| `Commands.setHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | ... |
| `Commands.toggleHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | ... |
| `Marks` | `never` | - |
| `Nodes` | `never` | - |

***

<a id="defineHeadingInputRule" name="defineHeadingInputRule"></a>

## defineHeadingInputRule()

> **defineHeadingInputRule**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

Converts the text block to a heading when `#` is typed at the start of a new
line followed by a space.

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineHeadingKeymap" name="defineHeadingKeymap"></a>

## defineHeadingKeymap()

> **defineHeadingKeymap**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineHeadingSpec" name="defineHeadingSpec"></a>

## defineHeadingSpec()

> **defineHeadingSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"heading"` |
