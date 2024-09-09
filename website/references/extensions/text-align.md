# prosekit/extensions/text-align

<a id="TextAlignOptionsNodeName" name="TextAlignOptionsNodeName"></a>

## TextAlignOptions\<NodeName\>

### Type Parameters

• **NodeName** *extends* `string` = `string`

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

> **types**: `NodeName`[]

The names of node to add the attribute to.

##### Example

```ts
["paragraph", "heading"]
```

***

<a id="defineTextAlign" name="defineTextAlign"></a>

## defineTextAlign()

> **defineTextAlign**\<`NodeName`\>(`options`): `TextAlignExtension`\<`NodeName`\>

Adds a `textAlign` attribute to the specified nodes. This will be rendered as
a CSS `text-align` style.

### Type Parameters

• **NodeName** *extends* `string` = `string`

### Parameters

• **options**: [`TextAlignOptions`](text-align.md#TextAlignOptionsNodeName)\<`NodeName`\>

### Returns

`TextAlignExtension`\<`NodeName`\>
