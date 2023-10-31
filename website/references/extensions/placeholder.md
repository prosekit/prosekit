# prosekit/extensions/placeholder

<a id="placeholderoptions" name="placeholderoptions"></a>

## PlaceholderOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `placeholder` | `string` | The placeholder text to use. |
| `strategy`? | `"doc"` \| `"block"` | By default, the placeholder text will be shown whenever the current text<br />cursor is in an empty node. If you only want to show the placeholder when<br />the whole doc is empty, you can set this option to 'doc'.<br /><br />**Default**<br /><br />` 'block' ` |

***

<a id="defineplaceholder" name="defineplaceholder"></a>

## definePlaceholder()

```ts
definePlaceholder(options): Extension<ExtensionTyping<string, string, CommandArgs>>
```

Add a placeholder text to the editor when the current block or document is
empty.

### Parameters

▪ **options**: [`PlaceholderOptions`](placeholder.md#placeholderoptions)

### Returns

[`Extension`](../core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
