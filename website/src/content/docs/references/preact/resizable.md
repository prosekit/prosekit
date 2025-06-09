---
title: prosekit/preact/resizable
sidebar:
  label: preact/resizable
---


## ResizableHandleProps {#resizable-handle-props}

Props for the [ResizableHandle](resizable.md#resizable-handle) component.

<dl>

<dt>

`position?: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"`

</dt>

<dd>

The position of the handle.

**Default**: `"bottom-right"`

</dd>

</dl>

## ResizableRootProps {#resizable-root-props}

Props for the [ResizableRoot](resizable.md#resizable-root) component.

<dl>

<dt>

`aspectRatio?: null | number`

</dt>

<dd>

</dd>

<dt>

`height?: null | number`

</dt>

<dd>

</dd>

<dt>

`onResizeEnd?: (event: CustomEvent<{ height: number; width: number }>) => void`

</dt>

<dd>

</dd>

<dt>

`onResizeStart?: (event: CustomEvent<{ height: number; width: number }>) => void`

</dt>

<dd>

</dd>

<dt>

`width?: null | number`

</dt>

<dd>

</dd>

</dl>

## ResizableHandle {#resizable-handle}

```ts
function ResizableHandle(props: RenderableProps<Partial<ResizableHandleProps> & RefAttributes<ResizableHandleElement> & HTMLAttributes<ResizableHandleElement>>, context?: any): ComponentChildren
```

## ResizableRoot {#resizable-root}

```ts
function ResizableRoot(props: RenderableProps<Partial<ResizableRootProps> & RefAttributes<ResizableRootElement> & HTMLAttributes<ResizableRootElement>>, context?: any): ComponentChildren
```
