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

> **defineHeading**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.insertHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | - |
> | `COMMAND_ARGS.setHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | - |
> | `COMMAND_ARGS.toggleHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | - |
> | `NODES` | `"heading"` | - |
>

***

<a id="defineHeadingCommands" name="defineHeadingCommands"></a>

## defineHeadingCommands()

> **defineHeadingCommands**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.insertHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | - |
> | `COMMAND_ARGS.setHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | - |
> | `COMMAND_ARGS.toggleHeading` | [[`HeadingAttrs`](heading.md#HeadingAttrs)] | - |
>

***

<a id="defineHeadingInputRule" name="defineHeadingInputRule"></a>

## defineHeadingInputRule()

> **defineHeadingInputRule**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Converts the text block to a heading when `#` is typed at the start of a new
line followed by a space.

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineHeadingKeymap" name="defineHeadingKeymap"></a>

## defineHeadingKeymap()

> **defineHeadingKeymap**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineHeadingSpec" name="defineHeadingSpec"></a>

## defineHeadingSpec()

> **defineHeadingSpec**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type |
> | :------ | :------ |
> | `NODES` | `"heading"` |
>
