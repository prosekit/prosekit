# prosekit/web/table-handle

<a id="TableHandleColumnRootElement" name="TableHandleColumnRootElement"></a>

## TableHandleColumnRootElement

Renames and re-exports [TableHandleColumnRoot](../lit/table-handle.md#TableHandleColumnRoot)

<a id="TableHandleColumnTriggerElement" name="TableHandleColumnTriggerElement"></a>

## TableHandleColumnTriggerElement

Renames and re-exports [TableHandleColumnTrigger](../lit/table-handle.md#TableHandleColumnTrigger)

<a id="TableHandlePopoverContentElement" name="TableHandlePopoverContentElement"></a>

## TableHandlePopoverContentElement

Renames and re-exports [TableHandlePopoverContent](../lit/table-handle.md#TableHandlePopoverContent)

<a id="TableHandlePopoverItemElement" name="TableHandlePopoverItemElement"></a>

## TableHandlePopoverItemElement

Renames and re-exports [TableHandlePopoverItem](../lit/table-handle.md#TableHandlePopoverItem)

<a id="TableHandleRootElement" name="TableHandleRootElement"></a>

## TableHandleRootElement

Renames and re-exports [TableHandleRoot](../lit/table-handle.md#TableHandleRoot)

<a id="TableHandleRowRootElement" name="TableHandleRowRootElement"></a>

## TableHandleRowRootElement

Renames and re-exports [TableHandleRowRoot](../lit/table-handle.md#TableHandleRowRoot)

<a id="TableHandleRowTriggerElement" name="TableHandleRowTriggerElement"></a>

## TableHandleRowTriggerElement

Renames and re-exports [TableHandleRowTrigger](../lit/table-handle.md#TableHandleRowTrigger)

<a id="TableHandleColumnRootProps" name="TableHandleColumnRootProps"></a>

## TableHandleColumnRootProps

### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"`\>

### Properties

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the hovered table cell.

##### Default

```ts
"top"
```

***

<a id="TableHandleColumnTriggerProps" name="TableHandleColumnTriggerProps"></a>

## TableHandleColumnTriggerProps

### Properties

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`TableCommandsExtension`\>

***

<a id="TableHandlePopoverContentProps" name="TableHandlePopoverContentProps"></a>

## TableHandlePopoverContentProps

### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`MenuContentProps`, `"placement"` \| `"offset"`\>

### Properties

<a id="editor-2" name="editor-2"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

<a id="offset" name="offset"></a>

#### offset

> **offset**: `null` \| `OffsetOptions`

##### Default

```ts
{mainAxis: -4, crossAxis: 4}
```

<a id="placement-1" name="placement-1"></a>

#### placement

> **placement**: `Placement`

##### Default

```ts
'bottom-start'
```

***

<a id="TableHandlePopoverItemProps" name="TableHandlePopoverItemProps"></a>

## TableHandlePopoverItemProps

### Extends

- `MenuItemProps`

### Properties

<a id="disabled" name="disabled"></a>

#### disabled?

> `optional` **disabled**: `boolean`

***

<a id="TableHandleRootProps" name="TableHandleRootProps"></a>

## TableHandleRootProps

### Properties

<a id="editor-3" name="editor-3"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

***

<a id="TableHandleRowRootProps" name="TableHandleRowRootProps"></a>

## TableHandleRowRootProps

### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"`\>

### Properties

<a id="editor-4" name="editor-4"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

<a id="placement-2" name="placement-2"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the hovered table cell.

##### Default

```ts
"left"
```

***

<a id="TableHandleRowTriggerProps" name="TableHandleRowTriggerProps"></a>

## TableHandleRowTriggerProps

### Properties

<a id="editor-5" name="editor-5"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`TableCommandsExtension`\>

***

<a id="defaultTableHandleColumnRootProps" name="defaultTableHandleColumnRootProps"></a>

## defaultTableHandleColumnRootProps

> `const` **defaultTableHandleColumnRootProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |
| `placement` | `"top"` | 'top' |

***

<a id="defaultTableHandleColumnTriggerProps" name="defaultTableHandleColumnTriggerProps"></a>

## defaultTableHandleColumnTriggerProps

> `const` **defaultTableHandleColumnTriggerProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |

***

<a id="defaultTableHandlePopoverContentProps" name="defaultTableHandlePopoverContentProps"></a>

## defaultTableHandlePopoverContentProps

> `const` **defaultTableHandlePopoverContentProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |
| `offset` | `object` | - |
| `offset.crossAxis` | `number` | 4 |
| `offset.mainAxis` | `number` | -4 |
| `placement` | `"right-start"` | 'right-start' |

***

<a id="defaultTableHandlePopoverItemProps" name="defaultTableHandlePopoverItemProps"></a>

## defaultTableHandlePopoverItemProps

> `const` **defaultTableHandlePopoverItemProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `disabled` | `false` | false |

***

<a id="defaultTableHandleRootProps" name="defaultTableHandleRootProps"></a>

## defaultTableHandleRootProps

> `const` **defaultTableHandleRootProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |

***

<a id="defaultTableHandleRowRootProps" name="defaultTableHandleRowRootProps"></a>

## defaultTableHandleRowRootProps

> `const` **defaultTableHandleRowRootProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |
| `placement` | `"left"` | 'left' |

***

<a id="defaultTableHandleRowTriggerProps" name="defaultTableHandleRowTriggerProps"></a>

## defaultTableHandleRowTriggerProps

> `const` **defaultTableHandleRowTriggerProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |
