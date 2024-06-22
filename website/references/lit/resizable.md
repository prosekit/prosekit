# prosekit/lit/resizable

<a id="ResizableHandle" name="ResizableHandle"></a>

## ResizableHandle

### Extends

- `BaseElement`\<`this`\> & [`ResizableHandleProps`](../web/resizable.md#ResizableHandleProps)

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new ResizableHandle()

> **new ResizableHandle**(): [`ResizableHandle`](resizable.md#ResizableHandle)

##### Returns

[`ResizableHandle`](resizable.md#ResizableHandle)

##### Inherited from

`ElementBuilder<ResizableHandleProps>(useResizableHandle, defaultResizableHandleProps).constructor`

### Properties

<a id="position" name="position"></a>

#### position

> **position**: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`

The position of the handle.

##### Default

```ts
"bottom-right"
```

##### Inherited from

`ElementBuilder<ResizableHandleProps>(useResizableHandle, defaultResizableHandleProps).position`

***

<a id="ResizableRoot" name="ResizableRoot"></a>

## ResizableRoot

### Extends

- `BaseElement`\<`this`\> & [`ResizableRootProps`](../web/resizable.md#ResizableRootProps)

### Constructors

<a id="Constructors-1" name="Constructors-1"></a>

#### new ResizableRoot()

> **new ResizableRoot**(): [`ResizableRoot`](resizable.md#ResizableRoot)

##### Returns

[`ResizableRoot`](resizable.md#ResizableRoot)

##### Inherited from

`ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps).constructor`

### Properties

<a id="aspectRatio" name="aspectRatio"></a>

#### aspectRatio

> **aspectRatio**: `null` \| `number`

##### Inherited from

`ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps).aspectRatio`

<a id="height" name="height"></a>

#### height

> **height**: `null` \| `number`

##### Inherited from

`ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps).height`

<a id="onSizeChange" name="onSizeChange"></a>

#### onSizeChange

> **onSizeChange**: `null` \| (`size`) => `void`

##### Inherited from

`ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps).onSizeChange`

<a id="onSizeChangeEnd" name="onSizeChangeEnd"></a>

#### onSizeChangeEnd

> **onSizeChangeEnd**: `null` \| (`size`) => `void`

##### Inherited from

`ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps).onSizeChangeEnd`

<a id="onSizeChangeStart" name="onSizeChangeStart"></a>

#### onSizeChangeStart

> **onSizeChangeStart**: `null` \| (`size`) => `void`

##### Inherited from

`ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps).onSizeChangeStart`

<a id="width" name="width"></a>

#### width

> **width**: `null` \| `number`

##### Inherited from

`ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps).width`
