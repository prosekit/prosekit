# prosekit/web/block-handle

<a id="BlockDragHandleElement" name="BlockDragHandleElement"></a>

## BlockDragHandleElement

Renames and re-exports [BlockDragHandle](../lit/block-handle.md#BlockDragHandle)

<a id="BlockHandleAddElement" name="BlockHandleAddElement"></a>

## BlockHandleAddElement

Renames and re-exports [BlockHandleAdd](../lit/block-handle.md#BlockHandleAdd)

<a id="BlockHandleDraggableElement" name="BlockHandleDraggableElement"></a>

## BlockHandleDraggableElement

Renames and re-exports [BlockHandleDraggable](../lit/block-handle.md#BlockHandleDraggable)

<a id="BlockHandlePopoverElement" name="BlockHandlePopoverElement"></a>

## BlockHandlePopoverElement

Renames and re-exports [BlockHandlePopover](../lit/block-handle.md#BlockHandlePopover)

<a id="BlockPopoverElement" name="BlockPopoverElement"></a>

## BlockPopoverElement

Renames and re-exports [BlockPopover](../lit/block-handle.md#BlockPopover)

<a id="BlockDragHandleProps" name="BlockDragHandleProps"></a>

## ~~BlockDragHandleProps~~

### Deprecated

Use `BlockHandleDraggableProps` instead.

### Properties

<a id="editor" name="editor"></a>

#### ~~editor~~

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

***

<a id="BlockHandleAddProps" name="BlockHandleAddProps"></a>

## BlockHandleAddProps

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

<a id="BlockHandleDraggableProps" name="BlockHandleDraggableProps"></a>

## BlockHandleDraggableProps

### Properties

<a id="editor-2" name="editor-2"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

***

<a id="BlockHandlePopoverProps" name="BlockHandlePopoverProps"></a>

## BlockHandlePopoverProps

### Extends

- [`BlockPopoverProps`](block-handle.md#BlockPopoverProps)

### Properties

<a id="editor-3" name="editor-3"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Inherited from

[`BlockPopoverProps`](block-handle.md#BlockPopoverProps).[`editor`](block-handle.md#editor-4)

<a id="offset" name="offset"></a>

#### offset

> **offset**: `number`

The distance between the popover and the hovered block.

##### Default

```ts
4
```

##### Inherited from

[`BlockPopoverProps`](block-handle.md#BlockPopoverProps).[`offset`](block-handle.md#offset-1)

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the hovered block.

##### Default

```ts
"left-start"
```

##### Inherited from

[`BlockPopoverProps`](block-handle.md#BlockPopoverProps).[`placement`](block-handle.md#placement-1)

***

<a id="BlockPopoverProps" name="BlockPopoverProps"></a>

## BlockPopoverProps

### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"` \| `"offset"`\>

### Extended by

- [`BlockHandlePopoverProps`](block-handle.md#BlockHandlePopoverProps)

### Properties

<a id="editor-4" name="editor-4"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

<a id="offset-1" name="offset-1"></a>

#### offset

> **offset**: `number`

The distance between the popover and the hovered block.

##### Default

```ts
4
```

<a id="placement-1" name="placement-1"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the hovered block.

##### Default

```ts
"left-start"
```

***

<a id="defaultBlockDragHandleProps" name="defaultBlockDragHandleProps"></a>

## defaultBlockDragHandleProps

> `const` **defaultBlockDragHandleProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |

***

<a id="defaultBlockHandleAddProps" name="defaultBlockHandleAddProps"></a>

## defaultBlockHandleAddProps

> `const` **defaultBlockHandleAddProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |

***

<a id="defaultBlockHandleDraggableProps" name="defaultBlockHandleDraggableProps"></a>

## defaultBlockHandleDraggableProps

> `const` **defaultBlockHandleDraggableProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |

***

<a id="defaultBlockHandlePopoverProps" name="defaultBlockHandlePopoverProps"></a>

## defaultBlockHandlePopoverProps

> `const` **defaultBlockHandlePopoverProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |
| `offset` | `4` | 4 |
| `placement` | `"left-start"` | 'left-start' |

***

<a id="defaultBlockPopoverProps" name="defaultBlockPopoverProps"></a>

## defaultBlockPopoverProps

> `const` **defaultBlockPopoverProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |
| `offset` | `4` | 4 |
| `placement` | `"left-start"` | 'left-start' |
