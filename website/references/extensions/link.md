# prosekit/extensions/link

<a id="LinkAttrs" name="LinkAttrs"></a>

## LinkAttrs

### Properties

<a id="href" name="href"></a>

#### href

> **href**: `string`

***

<a id="defineLink" name="defineLink"></a>

## defineLink()

> **defineLink**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `object` | - |
> | `COMMAND_ARGS.addLink` | [[`LinkAttrs`](link.md#LinkAttrs)] | ... |
> | `COMMAND_ARGS.expandLink` | [] | ... |
> | `COMMAND_ARGS.removeLink` | [] | ... |
> | `COMMAND_ARGS.toggleLink` | [[`LinkAttrs`](link.md#LinkAttrs)] | ... |
> | `MARKS` | `"link"` | - |
>

***

<a id="defineLinkCommands" name="defineLinkCommands"></a>

## defineLinkCommands()

> **defineLinkCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `object` | - |
> | `COMMAND_ARGS.addLink` | [[`LinkAttrs`](link.md#LinkAttrs)] | ... |
> | `COMMAND_ARGS.expandLink` | [] | ... |
> | `COMMAND_ARGS.removeLink` | [] | ... |
> | `COMMAND_ARGS.toggleLink` | [[`LinkAttrs`](link.md#LinkAttrs)] | ... |
>

***

<a id="defineLinkEnterRule" name="defineLinkEnterRule"></a>

## defineLinkEnterRule()

> **defineLinkEnterRule**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineLinkInputRule" name="defineLinkInputRule"></a>

## defineLinkInputRule()

> **defineLinkInputRule**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineLinkSpec" name="defineLinkSpec"></a>

## defineLinkSpec()

> **defineLinkSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type |
> | :------ | :------ |
> | `MARKS` | `"link"` |
>
