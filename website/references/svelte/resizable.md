# prosekit/svelte/resizable

## ResizableHandleProps {#resizable-handle-props-3}

Props for the [ResizableHandle](resizable.md#resizable-handle-4) component.

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

## ResizableRootProps {#resizable-root-props-3}

Props for the [ResizableRoot](resizable.md#resizable-root-4) component.

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

## ResizableHandle {#resizable-handle-4}

**Type**: `typeof SvelteComponent`

## ResizableRoot {#resizable-root-4}

**Type**: `typeof SvelteComponent`
