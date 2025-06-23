---
title: prosekit/svelte/block-handle
sidebar:
  label: svelte/block-handle
---

## Interfaces

### BlockHandleAddProps {#blockhandleaddprops}

Props for the [BlockHandleAdd](#blockhandleadd) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`BlockHandleAddProps`](../web/block-handle.md#blockhandleaddprops), `Events`\>\>

***

### BlockHandleDraggableProps {#blockhandledraggableprops}

Props for the [BlockHandleDraggable](#blockhandledraggable) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`BlockHandleDraggableProps`](../web/block-handle.md#blockhandledraggableprops), `Events`\>\>

***

### BlockHandlePopoverProps {#blockhandlepopoverprops}

Props for the [BlockHandlePopover](#blockhandlepopover) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`BlockHandlePopoverProps`](../web/block-handle.md#blockhandlepopoverprops), [`BlockHandlePopoverEvents`](../web/block-handle.md#blockhandlepopoverevents)\>\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

```ts
6
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onstatechange" href="#onstatechange">onStateChange</a><i>?</i>: (`event`: `null` \| \{ `node`: [`ProseMirrorNode`](../pm/model.md#prosemirrornode); `pos`: `number`; \}) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered block.

###### Default

```ts
"left"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

```ts
"absolute"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transform" href="#transform">transform</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

</dd>

</dl>

## Variables

### BlockHandleAdd {#blockhandleadd}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="blockhandleadd" href="#blockhandleadd">BlockHandleAdd</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### BlockHandleDraggable {#blockhandledraggable}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="blockhandledraggable" href="#blockhandledraggable">BlockHandleDraggable</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### BlockHandlePopover {#blockhandlepopover}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="blockhandlepopover" href="#blockhandlepopover">BlockHandlePopover</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>
