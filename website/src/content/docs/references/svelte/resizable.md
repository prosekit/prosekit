---
title: prosekit/svelte/resizable
sidebar:
  label: svelte/resizable
---

## Anatomy

```jsx
import {
  ResizableHandle,
  ResizableRoot,
} from 'prosekit/svelte/resizable'

<ResizableRoot>
  <img src="..." />
  <ResizableHandle>...</ResizableHandle>
</ResizableRoot>
```

## Interfaces

### ResizableHandleProps {#resizablehandleprops}

Props for the [ResizableHandle](#resizablehandle) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="position" href="#position">position</a><i>?</i>: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`</code>

</dt>

<dd>

The position of the handle.

###### Default

`"bottom-right"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="children" href="#children">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### ResizableRootProps {#resizablerootprops}

Props for the [ResizableRoot](#resizableroot) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="width" href="#width">width</a><i>?</i>: `number` \| `null`</code>

</dt>

<dd>

The width of the resizable element.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="height" href="#height">height</a><i>?</i>: `number` \| `null`</code>

</dt>

<dd>

The height of the resizable element.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="aspectratio" href="#aspectratio">aspectRatio</a><i>?</i>: `number` \| `null`</code>

</dt>

<dd>

The aspect ratio of the resizable element.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onresizestart" href="#onresizestart">onResizeStart</a><i>?</i>: (`event`: [`ResizeStartEvent`](../web/resizable.md#resizestartevent)) => `void`</code>

</dt>

<dd>

Emitted when a resize operation starts.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onresizeend" href="#onresizeend">onResizeEnd</a><i>?</i>: (`event`: [`ResizeEndEvent`](../web/resizable.md#resizeendevent)) => `void`</code>

</dt>

<dd>

Emitted when a resize operation ends.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="children-1" href="#children-1">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

## Variables

### ResizableHandle {#resizablehandle}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="resizablehandle" href="#resizablehandle">ResizableHandle</a>: `Component`\<[`ResizableHandleProps`](#resizablehandleprops) & `HTMLAttributes`\<[`ResizableHandleElement`](../web/resizable.md#resizablehandleelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-resizable-handle` custom element.

</dd>

</dl>

***

### ResizableRoot {#resizableroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="resizableroot" href="#resizableroot">ResizableRoot</a>: `Component`\<[`ResizableRootProps`](#resizablerootprops) & `HTMLAttributes`\<[`ResizableRootElement`](../web/resizable.md#resizablerootelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-resizable-root` custom element.

</dd>

</dl>
