---
title: prosekit/vue/resizable
sidebar:
  label: vue/resizable
---

## Interfaces

### ResizableHandleEmits {#resizablehandleemits}

Emits for the [ResizableHandle](#resizablehandle) component.

#### Extends

- `CreateEmits`\<`Events`\>

***

### ResizableHandleProps {#resizablehandleprops}

Props for the [ResizableHandle](#resizablehandle) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizableHandleProps`](../web/resizable.md#resizablehandleprops)\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="position" href="#position">position</a><i>?</i>: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`</code>

</dt>

<dd>

The position of the handle.

###### Default

```ts
"bottom-right"
```

</dd>

</dl>

***

### ResizableRootEmits {#resizablerootemits}

Emits for the [ResizableRoot](#resizableroot) component.

#### Extends

- `CreateEmits`\<[`ResizableRootEvents`](../web/resizable.md#resizablerootevents)\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="resizeend" href="#resizeend">resizeEnd</a>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="resizestart" href="#resizestart">resizeStart</a>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>) => `void`</code>

</dt>

</dl>

***

### ResizableRootProps {#resizablerootprops}

Props for the [ResizableRoot](#resizableroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizableRootProps`](../web/resizable.md#resizablerootprops)\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="aspectratio" href="#aspectratio">aspectRatio</a><i>?</i>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="height" href="#height">height</a><i>?</i>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="width" href="#width">width</a><i>?</i>: `null` \| `number`</code>

</dt>

</dl>

## Variables

### ResizableHandle {#resizablehandle}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="resizablehandle" href="#resizablehandle">ResizableHandle</a>: `DefineSetupFnComponent`\<[`ResizableHandleProps`](#resizablehandleprops) & `HTMLAttributes`, [`ResizableHandleEmits`](#resizablehandleemits)\></code>

</dt>

</dl>

***

### ResizableRoot {#resizableroot}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="resizableroot" href="#resizableroot">ResizableRoot</a>: `DefineSetupFnComponent`\<[`ResizableRootProps`](#resizablerootprops) & `HTMLAttributes`, [`ResizableRootEmits`](#resizablerootemits)\></code>

</dt>

</dl>
