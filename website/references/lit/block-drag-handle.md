# prosekit/lit/block-drag-handle

<a id="BlockDragHandle" name="BlockDragHandle"></a>

## BlockDragHandle

### Extends

- `BaseElement`.[`BlockDragHandleProps`](block-drag-handle.md#BlockDragHandleProps)

### Implements

- [`BlockDragHandleProps`](block-drag-handle.md#BlockDragHandleProps)

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new BlockDragHandle(props)

> **new BlockDragHandle**(`props`?): [`BlockDragHandle`](block-drag-handle.md#BlockDragHandle)

##### Parameters

• **props?**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`BlockDragHandleProps`](block-drag-handle.md#BlockDragHandleProps)\>

##### Returns

[`BlockDragHandle`](block-drag-handle.md#BlockDragHandle)

##### Overrides

`BaseElement.constructor`

### Properties

<a id="_s" name="_s"></a>

#### \_s

> **`readonly`** **\_s**: `SingalState`\<[`BlockDragHandleProps`](block-drag-handle.md#BlockDragHandleProps)\>

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Implementation of

[`BlockDragHandleProps`](block-drag-handle.md#BlockDragHandleProps).[`editor`](block-drag-handle.md#editor-1)

##### Inherited from

[`BlockDragHandleProps`](block-drag-handle.md#BlockDragHandleProps).[`editor`](block-drag-handle.md#editor-1)

***

<a id="BlockDragHandleProps" name="BlockDragHandleProps"></a>

## BlockDragHandleProps

### Extended by

- [`BlockDragHandle`](block-drag-handle.md#BlockDragHandle)

### Properties

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

***

<a id="defaultBlockDragHandleProps" name="defaultBlockDragHandleProps"></a>

## defaultBlockDragHandleProps

> **`const`** **defaultBlockDragHandleProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Member | Type | Value |
| :------ | :------ | :------ |
| `editor` | `null` | null |

***

<a id="propNames" name="propNames"></a>

## propNames

> **`const`** **propNames**: `"editor"`[]
