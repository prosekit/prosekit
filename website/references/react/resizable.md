# prosekit/react/resizable

## ResizableHandleProps {#resizable-handle-props-1}

Props for the [ResizableHandle](resizable.md#resizable-handle-2) component.

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

## ResizableRootProps {#resizable-root-props-1}

Props for the [ResizableRoot](resizable.md#resizable-root-2) component.

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

**Type**: `(event: CustomEvent<{ height: number; width: number }>) => void`

</dd>

<dt>

`onResizeStart`

</dt>

<dd>

**Type**: `(event: CustomEvent<{ height: number; width: number }>) => void`

</dd>

<dt>

`width`

</dt>

<dd>

**Type**: `null | number`

</dd>

</dl>

## ResizableHandle {#resizable-handle-2}

```ts
function ResizableHandle(props: ResizableHandleProps & RefAttributes<ResizableHandle> & HTMLAttributes<ResizableHandle>): ReactNode
```

## ResizableRoot {#resizable-root-2}

```ts
function ResizableRoot(props: ResizableRootProps & RefAttributes<ResizableRoot> & HTMLAttributes<ResizableRoot>): ReactNode
```
