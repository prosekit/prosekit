# prosekit/extensions/mention

<a id="MentionAttrs" name="MentionAttrs"></a>

## MentionAttrs

### Properties

<a id="id" name="id"></a>

#### id

> **id**: `string`

<a id="kind" name="kind"></a>

#### kind

> **kind**: `string`

<a id="value" name="value"></a>

#### value

> **value**: `string`

***

<a id="defineMention" name="defineMention"></a>

## defineMention()

> **defineMention**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type | Value |
| :------ | :------ | :------ |
| `Commands` | `object` | - |
| `Commands.insertMention` | [[`MentionAttrs`](mention.md#MentionAttrs)] | ... |
| `Marks` | `never` | - |
| `Nodes` | `"mention"` | - |

***

<a id="defineMentionCommands" name="defineMentionCommands"></a>

## defineMentionCommands()

> **defineMentionCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type | Value |
| :------ | :------ | :------ |
| `Commands` | `object` | - |
| `Commands.insertMention` | [[`MentionAttrs`](mention.md#MentionAttrs)] | ... |
| `Marks` | `never` | - |
| `Nodes` | `never` | - |

***

<a id="defineMentionSpec" name="defineMentionSpec"></a>

## defineMentionSpec()

> **defineMentionSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"mention"` |
