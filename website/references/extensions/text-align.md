# prosekit/extensions/text-align

## TextAlignOptions {#text-align-options}

<dl>

<dt>

`default`

</dt>

<dd>

The default value for the attribute.

**Type**: `string`

**Default**: `"left"`

</dd>

<dt>

`types`

</dt>

<dd>

The names of node to add the attribute to.

**Type**: `NodeName[]`

**Example**

```ts
["paragraph", "heading"]
```

</dd>

</dl>

## defineTextAlign {#define-text-align}

```ts
function defineTextAlign<NodeName extends string>(options: TextAlignOptions<NodeName>): TextAlignExtension<NodeName>
```

Adds a `textAlign` attribute to the specified nodes. This will be rendered as
a CSS `text-align` style.
