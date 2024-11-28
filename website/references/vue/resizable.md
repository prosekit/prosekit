# prosekit/vue/resizable

## ResizableHandleEmits {#resizable-handle-emits}

Emits for the [ResizableHandle](resizable.md#resizable-handle-5) component.

## ResizableHandleProps {#resizable-handle-props-4}

Props for the [ResizableHandle](resizable.md#resizable-handle-5) component.

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

## ResizableRootEmits {#resizable-root-emits}

Emits for the [ResizableRoot](resizable.md#resizable-root-5) component.

<dl>

<dt>

`resizeEnd`

</dt>

<dd>

**Type**: `(event: CustomEvent<{ height: number; width: number }>) => void`

</dd>

<dt>

`resizeStart`

</dt>

<dd>

**Type**: `(event: CustomEvent<{ height: number; width: number }>) => void`

</dd>

</dl>

## ResizableRootProps {#resizable-root-props-4}

Props for the [ResizableRoot](resizable.md#resizable-root-5) component.

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

`width`

</dt>

<dd>

**Type**: `null | number`

</dd>

</dl>

## ResizableHandle {#resizable-handle-5}

**Type**: `DefineSetupFnComponent<ResizableHandleProps & HTMLAttributes, ResizableHandleEmits>`

## ResizableRoot {#resizable-root-5}

**Type**: `DefineSetupFnComponent<ResizableRootProps & HTMLAttributes, ResizableRootEmits>`
