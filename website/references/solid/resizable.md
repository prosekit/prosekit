# prosekit/solid/resizable

## ResizableHandleProps {#resizable-handle-props-2}

Props for the [ResizableHandle](resizable.md#resizable-handle-3) component.

<dl>

<dt>

`position`

</dt>

<dd>

The position of the handle.

**Type**: `"left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"`

**Default**: `"bottom-right"`

</dd>

</dl>

## ResizableRootProps {#resizable-root-props-2}

Props for the [ResizableRoot](resizable.md#resizable-root-3) component.

<dl>

<dt>

`aspectRatio`

</dt>

<dd>

**Type**: `null | number`

</dd>

<dt>

`height`

</dt>

<dd>

**Type**: `null | number`

</dd>

<dt>

`onResizeEnd`

</dt>

<dd>

**Type**: `undefined | ((event: CustomEvent<{ height: number; width: number }>) => void)`

</dd>

<dt>

`onResizeStart`

</dt>

<dd>

**Type**: `undefined | ((event: CustomEvent<{ height: number; width: number }>) => void)`

</dd>

<dt>

`width`

</dt>

<dd>

**Type**: `null | number`

</dd>

</dl>

## ResizableHandle {#resizable-handle-3}

```ts
function ResizableHandle(props: Partial<ResizableHandleProps> & HTMLAttributes<ResizableHandle>): Element
```

## ResizableRoot {#resizable-root-3}

```ts
function ResizableRoot(props: Partial<ResizableRootProps> & HTMLAttributes<ResizableRoot>): Element
```
