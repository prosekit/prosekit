# prosekit/extensions/blockquote

<a id="BlockquoteCommandsExtension" name="BlockquoteCommandsExtension"></a>

## BlockquoteCommandsExtension

> **BlockquoteCommandsExtension**: [`Extension`](../core.md#ExtensionT)\<`object`\>

### Type declaration

| Name | Type |
| ------ | ------ |
| `Commands` | `object` |
| `Commands.insertBlockquote` | [] |
| `Commands.setBlockquote` | [] |
| `Commands.toggleBlockquote` | [] |

***

<a id="BlockquoteSpecExtension" name="BlockquoteSpecExtension"></a>

## BlockquoteSpecExtension

> **BlockquoteSpecExtension**: [`Extension`](../core.md#ExtensionT)\<`object`\>

### Type declaration

| Name | Type |
| ------ | ------ |
| `Nodes` | `object` |
| `Nodes.blockquote` | [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) |

***

<a id="defineBlockquote" name="defineBlockquote"></a>

## defineBlockquote()

> **defineBlockquote**(): `BlockquoteExtension`

### Returns

`BlockquoteExtension`

***

<a id="defineBlockquoteInputRule" name="defineBlockquoteInputRule"></a>

## defineBlockquoteInputRule()

> **defineBlockquoteInputRule**(): `PlainExtension`

Wraps the text block in a blockquote when `>` is typed at the start of a new
line followed by a space.

### Returns

`PlainExtension`

***

<a id="defineBlockquoteSpec" name="defineBlockquoteSpec"></a>

## defineBlockquoteSpec()

> **defineBlockquoteSpec**(): [`BlockquoteSpecExtension`](blockquote.md#BlockquoteSpecExtension)

### Returns

[`BlockquoteSpecExtension`](blockquote.md#BlockquoteSpecExtension)
