# prosekit/web/inline-popover

<a id="InlinePopoverElement" name="InlinePopoverElement"></a>

## InlinePopoverElement

Renames and re-exports [InlinePopover](../lit/inline-popover.md#InlinePopover)

<a id="InlinePopoverProps" name="InlinePopoverProps"></a>

## InlinePopoverProps

### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"` \| `"offset"`\>

### Properties

<a id="defaultOpen" name="defaultOpen"></a>

#### defaultOpen

> **defaultOpen**: `boolean`

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

##### Default

```ts
true
```

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

Event handler called when the open state changed caused by user interaction (i.e. select or unselect inline content).

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

```ts
false
```

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

> `const` **defaultInlinePopoverProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `boundary` | `never`[] | \[\] |
| `defaultOpen` | `true` | true |
| `editor` | `null` | null |
| `flip` | `true` | true |
| `hide` | `true` | true |
| `hoist` | `true` | true |
| `inline` | `true` | true |
| `offset` | `12` | 12 |
| `onOpenChange` | `null` | null |
| `open` | `false` | false |
| `overflowPadding` | `8` | 8 |
| `overlap` | `true` | true |
| `placement` | `"top"` | 'top' |
| `shift` | `true` | true |
