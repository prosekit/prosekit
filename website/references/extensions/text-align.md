# prosekit/extensions/text-align

<a id="TextAlignOptions" name="TextAlignOptions"></a>

## TextAlignOptions

### Properties

<a id="default" name="default"></a>

#### default?

> `optional` **default**: `string`

The default value for the attribute.

##### Default

```ts
"left"
```

<a id="types" name="types"></a>

#### types

> **types**: `string`[]

The names of node to add the attribute to.

##### Example

```ts
["paragraph", "heading"]
```

***

<a id="defineTextAlign" name="defineTextAlign"></a>

## defineTextAlign()

> **defineTextAlign**(`options`): [`Extension`](../core.md#ExtensionT)\<`object`\>

Adds a `textAlign` attribute to the specified nodes. This will be rendered as
a CSS `text-align` style.

### Parameters

• **options**: [`TextAlignOptions`](text-align.md#TextAlignOptions)

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `object` |
| `Marks` | `any` |
| `Nodes` | `any` |
