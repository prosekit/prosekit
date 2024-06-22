# prosekit/lit/block-handle

<a id="BlockDragHandle" name="BlockDragHandle"></a>

## BlockDragHandle

### Extends

- `BaseElement`\<`this`\> & [`BlockDragHandleProps`](../web/block-handle.md#BlockDragHandleProps)

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new BlockDragHandle()

> **new BlockDragHandle**(): [`BlockDragHandle`](block-handle.md#BlockDragHandle)

##### Returns

[`BlockDragHandle`](block-handle.md#BlockDragHandle)

##### Inherited from

`ElementBuilder<BlockDragHandleProps>(useBlockDragHandle, defaultBlockDragHandleProps).constructor`

### Properties

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Inherited from

`ElementBuilder<BlockDragHandleProps>(useBlockDragHandle, defaultBlockDragHandleProps).editor`

***

<a id="BlockPopover" name="BlockPopover"></a>

## BlockPopover

### Extends

- `BaseElement`\<`this`\> & [`BlockPopoverProps`](../web/block-handle.md#BlockPopoverProps)\<`this`\>

### Constructors

<a id="Constructors-1" name="Constructors-1"></a>

#### new BlockPopover()

> **new BlockPopover**(): [`BlockPopover`](block-handle.md#BlockPopover)

##### Returns

[`BlockPopover`](block-handle.md#BlockPopover)

##### Inherited from

`ElementBuilder<BlockPopoverProps>(useBlockPopover, defaultBlockPopoverProps).constructor`

### Properties

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Inherited from

`ElementBuilder<BlockPopoverProps>(useBlockPopover, defaultBlockPopoverProps).editor`

<a id="offset" name="offset"></a>

#### offset

> **offset**: `number`

The distance between the popover and the hovered block.

##### Default

```ts
4
```

##### Inherited from

`ElementBuilder<BlockPopoverProps>(useBlockPopover, defaultBlockPopoverProps).offset`

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the hovered block.

##### Default

```ts
"left-start"
```

##### Inherited from

`ElementBuilder<BlockPopoverProps>(useBlockPopover, defaultBlockPopoverProps).placement`
