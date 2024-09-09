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

> **defineMention**(): `Union`\<readonly [[`Extension`](../core.md#ExtensionT)\<`object`\>, [`Extension`](../core.md#ExtensionT)\<`object`\>]\>

### Returns

`Union`\<readonly [[`Extension`](../core.md#ExtensionT)\<`object`\>, [`Extension`](../core.md#ExtensionT)\<`object`\>]\>

***

<a id="defineMentionCommands" name="defineMentionCommands"></a>

## defineMentionCommands()

> **defineMentionCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `object` |
| `Commands.insertMention` | [[`MentionAttrs`](mention.md#MentionAttrs)] |

***

<a id="defineMentionSpec" name="defineMentionSpec"></a>

## defineMentionSpec()

> **defineMentionSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Nodes` | `object` |
| `Nodes.mention` | [`MentionAttrs`](mention.md#MentionAttrs) |
