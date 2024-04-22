# prosekit/web/block-handle

<a id="BlockDragHandleElement" name="BlockDragHandleElement"></a>

## BlockDragHandleElement

Renames and re-exports [BlockDragHandle](../lit/block-handle.md#BlockDragHandle)

<a id="BlockPopoverElement" name="BlockPopoverElement"></a>

## BlockPopoverElement

Renames and re-exports [BlockPopover](../lit/block-handle.md#BlockPopover)

<a id="BlockDragHandleProps" name="BlockDragHandleProps"></a>

## BlockDragHandleProps

### Extended by

- [`BlockDragHandle`](../lit/block-handle.md#BlockDragHandle)

### Properties

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

***

<a id="BlockPopoverProps" name="BlockPopoverProps"></a>

## BlockPopoverProps

### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"` \| `"offset"`\>

### Properties

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

<a id="offset" name="offset"></a>

#### offset

> **offset**: `number`

The distance between the popover and the hovered block.

##### Default

```ts
4
```

<a id="placement" name="placement"></a>

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

> **`const`** **defaultBlockDragHandleProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Member | Type | Value |
| :------ | :------ | :------ |
| `editor` | `null` | null |

***

<a id="defaultBlockPopoverProps" name="defaultBlockPopoverProps"></a>

## defaultBlockPopoverProps

> **`const`** **defaultBlockPopoverProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Member | Type | Value |
| :------ | :------ | :------ |
| `editor` | `null` | null |
| `offset` | `4` | 4 |
| `placement` | `"left-start"` | 'left-start' |
