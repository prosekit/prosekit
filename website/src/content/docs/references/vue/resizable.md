---
title: prosekit/vue/resizable
sidebar:
  label: vue/resizable
---


## ResizableHandleEmits {#resizable-handle-emits}

Emits for the [ResizableHandle](resizable.md#resizable-handle-4) component.

## ResizableHandleProps {#resizable-handle-props-4}

Props for the [ResizableHandle](resizable.md#resizable-handle-4) component.

<dl>

<dt>

`position?: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"`

</dt>

<dd>

The position of the handle.

**Default**: `"bottom-right"`

</dd>

</dl>

## ResizableRootEmits {#resizable-root-emits}

Emits for the [ResizableRoot](resizable.md#resizable-root-4) component.

<dl>

<dt>

`resizeEnd: (event: CustomEvent<{ height: number; width: number }>) => void`

</dt>

<dd>

</dd>

<dt>

`resizeStart: (event: CustomEvent<{ height: number; width: number }>) => void`

</dt>

<dd>

</dd>

</dl>

## ResizableRootProps {#resizable-root-props-4}

Props for the [ResizableRoot](resizable.md#resizable-root-4) component.

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

`width?: null | number`

</dt>

<dd>

</dd>

</dl>

## ResizableHandle {#resizable-handle-4}

**Type**: `DefineSetupFnComponent<ResizableHandleProps & HTMLAttributes, ResizableHandleEmits>`

## ResizableRoot {#resizable-root-4}

**Type**: `DefineSetupFnComponent<ResizableRootProps & HTMLAttributes, ResizableRootEmits>`
