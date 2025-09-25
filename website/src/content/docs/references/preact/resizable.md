---
title: prosekit/preact/resizable
sidebar:
  label: preact/resizable
---

## Interfaces

### ResizableHandleProps {#resizablehandleprops}

Props for the [ResizableHandle](#resizablehandle) component.

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

***

### ResizableRootProps {#resizablerootprops}

Props for the [ResizableRoot](#resizableroot) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="width" href="#width">width</a><i>?</i>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="height" href="#height">height</a><i>?</i>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="aspectratio" href="#aspectratio">aspectRatio</a><i>?</i>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onresizestart" href="#onresizestart">onResizeStart</a><i>?</i>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `width`: `number`; `height`: `number`; \}\>) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onresizeend" href="#onresizeend">onResizeEnd</a><i>?</i>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `width`: `number`; `height`: `number`; \}\>) => `void`</code>

</dt>

</dl>

## Variables

### ResizableHandle {#resizablehandle}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="resizablehandle" href="#resizablehandle">ResizableHandle</a>: `ForwardRefExoticComponent`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizableHandleProps`](#resizablehandleprops)\> & `RefAttributes`\<[`ResizableHandleElement`](../web/resizable.md#resizablehandleelement)\> & `HTMLAttributes`\<[`ResizableHandleElement`](../web/resizable.md#resizablehandleelement)\>\></code>

</dt>

</dl>

***

### ResizableRoot {#resizableroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="resizableroot" href="#resizableroot">ResizableRoot</a>: `ForwardRefExoticComponent`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizableRootProps`](#resizablerootprops)\> & `RefAttributes`\<[`ResizableRootElement`](../web/resizable.md#resizablerootelement)\> & `HTMLAttributes`\<[`ResizableRootElement`](../web/resizable.md#resizablerootelement)\>\></code>

</dt>

</dl>
