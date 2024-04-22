# prosekit/web/inline-popover

<a id="InlinePopoverElement" name="InlinePopoverElement"></a>

## InlinePopoverElement

Renames and re-exports [InlinePopover](../lit/inline-popover.md#InlinePopover)

<a id="InlinePopoverProps" name="InlinePopoverProps"></a>

## InlinePopoverProps

### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"` \| `"offset"`\>

### Properties

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

<a id="flip" name="flip"></a>

#### flip

> **flip**: `boolean` \| `Placement`[]

##### Default

```ts
true
```

##### Overrides

`Omit.flip`

<a id="hide" name="hide"></a>

#### hide

> **hide**: `boolean`

##### Default

```ts
true
```

##### Overrides

`Omit.hide`

<a id="hoist" name="hoist"></a>

#### hoist

> **hoist**: `boolean`

##### Default

```ts
true
```

##### Overrides

`Omit.hoist`

<a id="inline" name="inline"></a>

#### inline

> **inline**: `boolean`

##### Default

```ts
true
```

##### Overrides

`Omit.inline`

<a id="offset" name="offset"></a>

#### offset

> **offset**: `null` \| `OffsetOptions`

##### Default

```ts
12
```

<a id="onOpenChange" name="onOpenChange"></a>

#### onOpenChange

> **onOpenChange**: `null` \| (`open`) => `void`

A callback that is called when the popover's open state changes.

##### Default

```ts
null
```

<a id="open" name="open"></a>

#### open

> **open**: `boolean`

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is empty.

##### Default

`true`

<a id="overlap" name="overlap"></a>

#### overlap

> **overlap**: `boolean`

##### Default

```ts
true
```

##### Overrides

`Omit.overlap`

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the selected inline content.

##### Default

```ts
"top"
```

***

<a id="defaultInlinePopoverProps" name="defaultInlinePopoverProps"></a>

## defaultInlinePopoverProps

> **`const`** **defaultInlinePopoverProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Member | Type | Value |
| :------ | :------ | :------ |
| `editor` | `null` | null |
| `flip` | `true` | true |
| `hide` | `true` | true |
| `hoist` | `true` | true |
| `inline` | `true` | true |
| `offset` | `12` | 12 |
| `onOpenChange` | `null` | null |
| `open` | `true` | true |
| `overlap` | `true` | true |
| `placement` | `"top"` | 'top' |
