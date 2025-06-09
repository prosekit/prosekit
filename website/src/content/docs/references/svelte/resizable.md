---
title: prosekit/svelte/resizable
sidebar:
  label: svelte/resizable
---


## ResizableHandleProps {#resizable-handle-props-3}

Props for the [ResizableHandle](resizable.md#resizable-handle-3) component.

<dl>

<dt>

`position?: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"`

</dt>

<dd>

The position of the handle.

**Default**: `"bottom-right"`

</dd>

</dl>

## ResizableRootProps {#resizable-root-props-3}

Props for the [ResizableRoot](resizable.md#resizable-root-3) component.

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

## ResizableHandle {#resizable-handle-3}

**Type**: `typeof SvelteComponent`

## ResizableRoot {#resizable-root-3}

**Type**: `typeof SvelteComponent`
