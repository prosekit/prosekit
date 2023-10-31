# prosekit/extensions/code-block

## CodeBlockAttrs

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `language`? | `string` | - |

***

## defineCodeBlock()

```ts
defineCodeBlock(options?): Extension<object>
```

### Parameters

▪ **options?**: `object`

▪ **options.hljs?**: `HLJSApi`

### Returns

[`Extension`](../core.md#extensiont)\<`object`\>

***

## defineCodeBlockCommands()

```ts
defineCodeBlockCommands(): Extension<object>
```

### Returns

[`Extension`](../core.md#extensiont)\<`object`\>

***

## defineCodeBlockInputRule()

```ts
defineCodeBlockInputRule(): Extension<ExtensionTyping<string, string, CommandArgs>>
```

### Returns

[`Extension`](../core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

## defineCodeBlockSpec()

```ts
defineCodeBlockSpec(): Extension<object>
```

### Returns

[`Extension`](../core.md#extensiont)\<`object`\>

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
