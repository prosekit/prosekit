# prosekit/lit/inline-popover

<a id="InlinePopover" name="InlinePopover"></a>

## InlinePopover

### Extends

- `BaseElement`\<`this`\> & [`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps)\<`this`\>

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new InlinePopover()

> **new InlinePopover**(): [`InlinePopover`](inline-popover.md#InlinePopover)

##### Returns

[`InlinePopover`](inline-popover.md#InlinePopover)

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).constructor`

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

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).defaultOpen`

<a id="dismissOnEscape" name="dismissOnEscape"></a>

#### dismissOnEscape

> **dismissOnEscape**: `boolean`

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).dismissOnEscape`

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).editor`

<a id="flip" name="flip"></a>

#### flip

> **flip**: `boolean` \| `Placement`[]

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).flip`

<a id="hide" name="hide"></a>

#### hide

> **hide**: `boolean`

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).hide`

<a id="hoist" name="hoist"></a>

#### hoist

> **hoist**: `boolean`

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).hoist`

<a id="inline" name="inline"></a>

#### inline

> **inline**: `boolean`

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).inline`

<a id="offset" name="offset"></a>

#### offset

> **offset**: `null` \| `OffsetOptions`

##### Default

```ts
12
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).offset`

<a id="onOpenChange" name="onOpenChange"></a>

#### onOpenChange

> **onOpenChange**: `null` \| (`open`) => `void`

Event handler called when the open state changed caused by user interaction
(i.e. select or unselect inline content).

##### Default

```ts
null
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).onOpenChange`

<a id="open" name="open"></a>

#### open

> **open**: `boolean`

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is
empty.

##### Default

```ts
false
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).open`

<a id="overlap" name="overlap"></a>

#### overlap

> **overlap**: `boolean`

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).overlap`

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the selected inline content.

##### Default

```ts
"top"
```

##### Inherited from

`ElementBuilder<InlinePopoverProps>(useInlinePopover, defaultInlinePopoverProps).placement`
