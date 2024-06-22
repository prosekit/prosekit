# prosekit/extensions/link

<a id="LinkAttrs" name="LinkAttrs"></a>

## LinkAttrs

### Properties

<a id="href" name="href"></a>

#### href

> **href**: `string`

***

<a id="defineLink" name="defineLink"></a>

## defineLink()

> **defineLink**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `object` |
| `Marks` | `any` |
| `Nodes` | `any` |

***

<a id="defineLinkCommands" name="defineLinkCommands"></a>

## defineLinkCommands()

> **defineLinkCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type | Value |
| :------ | :------ | :------ |
| `Commands` | `object` | - |
| `Commands.addLink` | [[`LinkAttrs`](link.md#LinkAttrs)] | ... |
| `Commands.expandLink` | [] | ... |
| `Commands.removeLink` | [] | ... |
| `Commands.toggleLink` | [[`LinkAttrs`](link.md#LinkAttrs)] | ... |
| `Marks` | `never` | - |
| `Nodes` | `never` | - |

***

<a id="defineLinkEnterRule" name="defineLinkEnterRule"></a>

## defineLinkEnterRule()

> **defineLinkEnterRule**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

Apply link marks after typing Enter.

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineLinkInputRule" name="defineLinkInputRule"></a>

## defineLinkInputRule()

> **defineLinkInputRule**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

Apply link marks after pressing Space.

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineLinkMarkRule" name="defineLinkMarkRule"></a>

## defineLinkMarkRule()

> **defineLinkMarkRule**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

Apply and remove link marks to the text during typing.

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineLinkSpec" name="defineLinkSpec"></a>

## defineLinkSpec()

> **defineLinkSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `"link"` |
| `Nodes` | `never` |
