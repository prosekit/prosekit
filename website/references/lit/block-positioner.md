# prosekit/lit/block-positioner

<a id="BlockPositioner" name="BlockPositioner"></a>

## BlockPositioner

### Extends

- `BaseElement`.`BlockPositionerProps`

### Implements

- `BlockPositionerProps`

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new BlockPositioner(props)

> **new BlockPositioner**(`props`?): [`BlockPositioner`](block-positioner.md#BlockPositioner)

##### Parameters

• **props?**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`BlockPositionerProps`\>

##### Returns

[`BlockPositioner`](block-positioner.md#BlockPositioner)

##### Overrides

`BaseElement.constructor`

### Properties

<a id="_s" name="_s"></a>

#### \_s

> **`readonly`** **\_s**: `SingalState`\<`BlockPositionerProps`\>

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Implementation of

`BlockPositionerProps.editor`

<a id="offset" name="offset"></a>

#### offset

> **offset**: `number`

The distance from the hovered block to the block positioner.

##### Default

```ts
4
```

##### Implementation of

`BlockPositionerProps.offset`

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the block positioner, relative to the hovered block.

##### Default

```ts
"left-start"
```

##### Implementation of

`BlockPositionerProps.placement`

***

<a id="BlockPositionerProps" name="BlockPositionerProps"></a>

## BlockPositionerProps

> **BlockPositionerProps**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`_BlockPositionerProps`\>

***

<a id="defaultBlockPositionerProps" name="defaultBlockPositionerProps"></a>

## defaultBlockPositionerProps

> **`const`** **defaultBlockPositionerProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Member | Type | Value |
| :------ | :------ | :------ |
| `editor` | `null` | null |
| `offset` | `4` | 4 |
| `placement` | `"left-start"` | 'left-start' |

***

<a id="propNames" name="propNames"></a>

## propNames

> **`const`** **propNames**: keyof `BlockPositionerProps`[]
