# prosekit/extensions/code-block

<a id="CodeBlockAttrs" name="CodeBlockAttrs"></a>

## CodeBlockAttrs

The attributes for the `codeBlock` node.

### Properties

<a id="language" name="language"></a>

#### language?

> **language**?: `string`

***

<a id="HighlightParser" name="HighlightParser"></a>

## HighlightParser

> **HighlightParser**: `Parser`

An alias for the `Parser` type from the `prosemirror-highlight` package.

***

<a id="defineCodeBlock" name="defineCodeBlock"></a>

## defineCodeBlock()

> **defineCodeBlock**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

Adds `codeBlock` nodes to the editor. This includes the following extensions:

- [defineCodeBlockSpec](code-block.md#defineCodeBlockSpec)
- [defineCodeBlockInputRule](code-block.md#defineCodeBlockInputRule)
- [defineCodeBlockEnterRule](code-block.md#defineCodeBlockEnterRule)
- [defineCodeBlockKeymap]([object Object])
- [defineCodeBlockCommands](code-block.md#defineCodeBlockCommands).

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.setCodeBlockLanguage` | [`string`] | - |
> | `NODES` | `"codeBlock"` | - |
>

***

<a id="defineCodeBlockCommands" name="defineCodeBlockCommands"></a>

## defineCodeBlockCommands()

> **defineCodeBlockCommands**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

Adds commands for working with `codeBlock` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.setCodeBlockLanguage` | [`string`] | - |
>

***

<a id="defineCodeBlockEnterRule" name="defineCodeBlockEnterRule"></a>

## defineCodeBlockEnterRule()

> **defineCodeBlockEnterRule**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Adds enter rules for `codeBlock` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineCodeBlockHighlight" name="defineCodeBlockHighlight"></a>

## defineCodeBlockHighlight()

> **defineCodeBlockHighlight**(`__namedParameters`): [`Extension`](../core.md#ExtensionT)

Adds syntax highlighting to code blocks. This function requires a `Parser`
instance from the `prosemirror-highlight` package. See the
[documentation](https://github.com/ocavue/prosemirror-highlight) for more
information.

### Parameters

• **\_\_namedParameters**: `Object`

• **\_\_namedParameters\.parser**: `Parser`

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineCodeBlockInputRule" name="defineCodeBlockInputRule"></a>

## defineCodeBlockInputRule()

> **defineCodeBlockInputRule**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Adds input rules for `codeBlock` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineCodeBlockShikiji" name="defineCodeBlockShikiji"></a>

## defineCodeBlockShikiji()

> **defineCodeBlockShikiji**(`options`?): [`Extension`](../core.md#ExtensionT)

Adds syntax highlighting to code blocks using the [shikiji](https://github.com/antfu/shikiji) package.

### Parameters

• **options?**: `Object`

• **options\.theme?**: `BundledTheme`

The shikiji theme to use.

**Default**
```ts
'github-light'
```

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineCodeBlockSpec" name="defineCodeBlockSpec"></a>

## defineCodeBlockSpec()

> **defineCodeBlockSpec**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

Defines the `codeBlock` node spec.

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `NODES` | `"codeBlock"` | - |
>

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
