---
title: prosekit/web/table-handle
sidebar:
  label: web/table-handle
---

## Classes

### TableHandleColumnRootElement {#tablehandlecolumnrootelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">TableHandleColumnRootElement</a>(): [`TableHandleColumnRootElement`](#tablehandlecolumnrootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="transform" href="#transform">transform</a>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

***

### TableHandleColumnTriggerElement {#tablehandlecolumntriggerelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">TableHandleColumnTriggerElement</a>(): [`TableHandleColumnTriggerElement`](#tablehandlecolumntriggerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor" href="#editor">editor</a>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleDragPreviewElement {#tablehandledragpreviewelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">TableHandleDragPreviewElement</a>(): [`TableHandleDragPreviewElement`](#tablehandledragpreviewelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-2" href="#editor-2">editor</a>: [`Editor`](../core.md#editor)\<`any`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleDropIndicatorElement {#tablehandledropindicatorelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">TableHandleDropIndicatorElement</a>(): [`TableHandleDropIndicatorElement`](#tablehandledropindicatorelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-4" href="#editor-4">editor</a>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandlePopoverContentElement {#tablehandlepopovercontentelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-4" href="#constructor-4">TableHandlePopoverContentElement</a>(): [`TableHandlePopoverContentElement`](#tablehandlepopovercontentelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="eventtarget" href="#eventtarget">eventTarget</a><i>?</i>: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `TypedEventTarget`\<`"keydown"`\></code>

</dt>

<dd>

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy-2" href="#strategy-2">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-2" href="#autoupdate-2">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-2" href="#hoist-2">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="transform-2" href="#transform-2">transform</a>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip" href="#flip">flip</a>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shift" href="#shift">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-2" href="#overlap-2">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-2" href="#fitviewport-2">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-2" href="#samewidth-2">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-2" href="#sameheight-2">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-2" href="#inline-2">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide" href="#hide">hide</a>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-2" href="#boundary-2">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-2" href="#rootboundary-2">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-2" href="#overflowpadding-2">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-2" href="#elementcontext-2">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-2" href="#altboundary-2">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-2" href="#placement-2">placement</a>: `Placement`</code>

</dt>

<dd>

###### Default

`'bottom-start'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-2" href="#offset-2">offset</a>: `OffsetOptions` \| `undefined`</code>

</dt>

<dd>

###### Default

```ts
{mainAxis: -4, crossAxis: 4}
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="editor-6" href="#editor-6">editor</a>: [`Editor`](../core.md#editor)\<`any`\> \| `null`</code>

</dt>

</dl>

***

### TableHandlePopoverItemElement {#tablehandlepopoveritemelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-5" href="#constructor-5">TableHandlePopoverItemElement</a>(): [`TableHandlePopoverItemElement`](#tablehandlepopoveritemelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a>: `string`</code>

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="query" href="#query">query</a>: `string`</code>

</dt>

<dd>

The query string to filter the listbox items.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filter" href="#filter">filter</a>: `ItemFilter`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.

###### Default

`defaultItemFilter`

</dd>

</dl>

***

### TableHandleRootElement {#tablehandlerootelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-6" href="#constructor-6">TableHandleRootElement</a>(): [`TableHandleRootElement`](#tablehandlerootelement)</code>

</dt>

</dl>

***

### TableHandleRowRootElement {#tablehandlerowrootelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-7" href="#constructor-7">TableHandleRowRootElement</a>(): [`TableHandleRowRootElement`](#tablehandlerowrootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-4" href="#strategy-4">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-4" href="#autoupdate-4">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="transform-4" href="#transform-4">transform</a>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-4" href="#offset-4">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-4" href="#overlap-4">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-4" href="#fitviewport-4">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-4" href="#samewidth-4">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-4" href="#sameheight-4">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-4" href="#inline-4">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-4" href="#boundary-4">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-4" href="#rootboundary-4">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-4" href="#overflowpadding-4">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-4" href="#elementcontext-4">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-4" href="#altboundary-4">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-4" href="#placement-4">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"left"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-4" href="#hoist-4">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

***

### TableHandleRowTriggerElement {#tablehandlerowtriggerelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-8" href="#constructor-8">TableHandleRowTriggerElement</a>(): [`TableHandleRowTriggerElement`](#tablehandlerowtriggerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-8" href="#editor-8">editor</a>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

## Interfaces

### TableHandleColumnRootProps {#tablehandlecolumnrootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-1" href="#strategy-1">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="transform-1" href="#transform-1">transform</a>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-1" href="#offset-1">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-1" href="#overlap-1">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-1" href="#fitviewport-1">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-1" href="#samewidth-1">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-1" href="#sameheight-1">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-1" href="#inline-1">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-1" href="#boundary-1">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-1" href="#elementcontext-1">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-1" href="#altboundary-1">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

***

### TableHandleColumnTriggerProps {#tablehandlecolumntriggerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-1" href="#editor-1">editor</a>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleDragPreviewProps {#tablehandledragpreviewprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-3" href="#editor-3">editor</a>: [`Editor`](../core.md#editor)\<`any`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleDragPreviewEvents {#tablehandledragpreviewevents}

***

### TableHandleDropIndicatorProps {#tablehandledropindicatorprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-5" href="#editor-5">editor</a>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleDropIndicatorEvents {#tablehandledropindicatorevents}

***

### TableHandlePopoverContentProps {#tablehandlepopovercontentprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="eventtarget-1" href="#eventtarget-1">eventTarget</a><i>?</i>: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `TypedEventTarget`\<`"keydown"`\></code>

</dt>

<dd>

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy-3" href="#strategy-3">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-3" href="#autoupdate-3">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-3" href="#hoist-3">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="transform-3" href="#transform-3">transform</a>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip-1" href="#flip-1">flip</a>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shift-1" href="#shift-1">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-3" href="#overlap-3">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-3" href="#fitviewport-3">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-3" href="#samewidth-3">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-3" href="#sameheight-3">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-3" href="#inline-3">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide-1" href="#hide-1">hide</a>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-3" href="#boundary-3">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-3" href="#rootboundary-3">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-3" href="#overflowpadding-3">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-3" href="#elementcontext-3">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-3" href="#altboundary-3">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-3" href="#placement-3">placement</a>: `Placement`</code>

</dt>

<dd>

###### Default

`'bottom-start'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-3" href="#offset-3">offset</a>: `OffsetOptions` \| `undefined`</code>

</dt>

<dd>

###### Default

```ts
{mainAxis: -4, crossAxis: 4}
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="editor-7" href="#editor-7">editor</a>: [`Editor`](../core.md#editor)\<`any`\> \| `null`</code>

</dt>

</dl>

***

### TableHandlePopoverContentEvents {#tablehandlepopovercontentevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="escapekeydown" href="#escapekeydown">escapeKeyDown</a>: `EscapeKeyDownEvent`</code>

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="pointerdownoutside" href="#pointerdownoutside">pointerDownOutside</a>: `PointerDownOutsideEvent`</code>

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="focusoutside" href="#focusoutside">focusOutside</a>: `FocusOutsideEvent`</code>

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="interactoutside" href="#interactoutside">interactOutside</a>: `InteractOutsideEvent`</code>

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the
component.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

***

### TableHandlePopoverItemProps {#tablehandlepopoveritemprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value-1" href="#value-1">value</a>: `string`</code>

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="query-1" href="#query-1">query</a>: `string`</code>

</dt>

<dd>

The query string to filter the listbox items.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filter-1" href="#filter-1">filter</a>: `ItemFilter`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.

###### Default

`defaultItemFilter`

</dd>

</dl>

***

### TableHandlePopoverItemEvents {#tablehandlepopoveritemevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="select" href="#select">select</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\></code>

</dt>

<dd>

Fired when the item is selected.

</dd>

</dl>

***

### TableHandleRootProps {#tablehandlerootprops}

***

### TableHandleRowRootProps {#tablehandlerowrootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-5" href="#strategy-5">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-5" href="#autoupdate-5">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="transform-5" href="#transform-5">transform</a>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-5" href="#offset-5">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-5" href="#overlap-5">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-5" href="#fitviewport-5">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-5" href="#samewidth-5">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-5" href="#sameheight-5">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-5" href="#inline-5">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-5" href="#boundary-5">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-5" href="#rootboundary-5">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-5" href="#overflowpadding-5">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-5" href="#elementcontext-5">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-5" href="#altboundary-5">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-5" href="#placement-5">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"left"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-5" href="#hoist-5">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

***

### TableHandleRowTriggerProps {#tablehandlerowtriggerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-9" href="#editor-9">editor</a>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleRowTriggerEvents {#tablehandlerowtriggerevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="select-1" href="#select-1">select</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\></code>

</dt>

</dl>

## Variables

### tableHandleDragPreviewProps {#tablehandledragpreviewprops-1}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledragpreviewprops-1" href="#tablehandledragpreviewprops-1">tableHandleDragPreviewProps</a>: `PropDeclarations`\<[`TableHandleDragPreviewProps`](#tablehandledragpreviewprops)\></code>

</dt>

</dl>

***

### tableHandleDragPreviewEvents {#tablehandledragpreviewevents-1}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledragpreviewevents-1" href="#tablehandledragpreviewevents-1">tableHandleDragPreviewEvents</a>: `EventDeclarations`\<[`TableHandleDragPreviewEvents`](#tablehandledragpreviewevents)\> = `{}`</code>

</dt>

</dl>

***

### tableHandleDropIndicatorProps {#tablehandledropindicatorprops-1}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledropindicatorprops-1" href="#tablehandledropindicatorprops-1">tableHandleDropIndicatorProps</a>: `PropDeclarations`\<[`TableHandleDropIndicatorProps`](#tablehandledropindicatorprops)\></code>

</dt>

</dl>

***

### tableHandleDropIndicatorEvents {#tablehandledropindicatorevents-1}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledropindicatorevents-1" href="#tablehandledropindicatorevents-1">tableHandleDropIndicatorEvents</a>: `EventDeclarations`\<[`TableHandleDropIndicatorEvents`](#tablehandledropindicatorevents)\> = `{}`</code>

</dt>

</dl>
