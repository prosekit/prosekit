# prosekit/extensions/code-block

<a id="CodeBlockAttrs" name="CodeBlockAttrs"></a>

## CodeBlockAttrs

The attributes for the `codeBlock` node.

### Properties

<a id="language" name="language"></a>

#### language

> **language**: `string`

***

<a id="CodeBlockHighlightOptions" name="CodeBlockHighlightOptions"></a>

## CodeBlockHighlightOptions

> **CodeBlockHighlightOptions**: `object`

### Type declaration

| Name | Type |
| ------ | ------ |
| `parser` | [`HighlightParser`](code-block.md#HighlightParser) |

***

<a id="HighlightParser" name="HighlightParser"></a>

## HighlightParser

> **HighlightParser**: `Parser`

An alias for the `Parser` type from the `prosemirror-highlight` package.

***

<a id="defineCodeBlock" name="defineCodeBlock"></a>

## defineCodeBlock()

> **defineCodeBlock**(): `CodeBlockExtension`

Adds `codeBlock` nodes to the editor. This includes the following extensions:

- [defineCodeBlockSpec](code-block.md#defineCodeBlockSpec)
- [defineCodeBlockInputRule](code-block.md#defineCodeBlockInputRule)
- [defineCodeBlockEnterRule](code-block.md#defineCodeBlockEnterRule)
- [defineCodeBlockKeymap](code-block.md#defineCodeBlockKeymap)
- [defineCodeBlockCommands](code-block.md#defineCodeBlockCommands).

### Returns

`CodeBlockExtension`

***

<a id="defineCodeBlockCommands" name="defineCodeBlockCommands"></a>

## defineCodeBlockCommands()

> **defineCodeBlockCommands**(): `CodeBlockCommandsExtension`

Adds commands for working with `codeBlock` nodes.

### Returns

`CodeBlockCommandsExtension`

***

<a id="defineCodeBlockEnterRule" name="defineCodeBlockEnterRule"></a>

## defineCodeBlockEnterRule()

> **defineCodeBlockEnterRule**(): `PlainExtension`

Adds enter rules for `codeBlock` nodes.

### Returns

`PlainExtension`

***

<a id="defineCodeBlockHighlight" name="defineCodeBlockHighlight"></a>

## defineCodeBlockHighlight()

> **defineCodeBlockHighlight**(`options`): [`Extension`](../core.md#ExtensionT)

Adds syntax highlighting to code blocks. This function requires a `Parser`
instance from the `prosemirror-highlight` package. See the
[documentation](https://github.com/ocavue/prosemirror-highlight) for more
information.

### Parameters

• **options**: [`CodeBlockHighlightOptions`](code-block.md#CodeBlockHighlightOptions)

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineCodeBlockInputRule" name="defineCodeBlockInputRule"></a>

## defineCodeBlockInputRule()

> **defineCodeBlockInputRule**(): `PlainExtension`

Adds input rules for `codeBlock` nodes.

### Returns

`PlainExtension`

***

<a id="defineCodeBlockKeymap" name="defineCodeBlockKeymap"></a>

## defineCodeBlockKeymap()

> **defineCodeBlockKeymap**(): `PlainExtension`

Defines the keymap for code blocks.

### Returns

`PlainExtension`

***

<a id="defineCodeBlockShiki" name="defineCodeBlockShiki"></a>

## defineCodeBlockShiki()

> **defineCodeBlockShiki**(`options`): [`Extension`](../core.md#ExtensionT)

Adds syntax highlighting to code blocks using the [Shiki](https://github.com/shikijs/shiki) package.

### Parameters

• **options**: `CodeBlockShikiOptions` = `{}`

The options to configure the Shiki highlighter.

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineCodeBlockSpec" name="defineCodeBlockSpec"></a>

## defineCodeBlockSpec()

> **defineCodeBlockSpec**(): `CodeBlockSpecExtension`

Defines the `codeBlock` node spec.

### Returns

`CodeBlockSpecExtension`
