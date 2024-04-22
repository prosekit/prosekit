# prosekit/extensions/placeholder

<a id="PlaceholderOptions" name="PlaceholderOptions"></a>

## PlaceholderOptions

### Properties

<a id="placeholder" name="placeholder"></a>

#### placeholder

> **placeholder**: `string`

The placeholder text to use.

<a id="strategy" name="strategy"></a>

#### strategy?

> **`optional`** **strategy**: `"doc"` \| `"block"`

By default, the placeholder text will be shown whenever the current text
cursor is in an empty text node. If you only want to show the placeholder
when the whole doc is empty, you can set this option to 'doc'.

##### Default

```ts
'block'
```

***

<a id="definePlaceholder" name="definePlaceholder"></a>

## definePlaceholder()

> **definePlaceholder**(`options`): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Add a placeholder text to the editor when the current block or document is
empty.

### Parameters

• **options**: [`PlaceholderOptions`](placeholder.md#PlaceholderOptions)

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>
