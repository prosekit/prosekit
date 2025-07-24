---
title: prosekit/web/popover
sidebar:
  label: web/popover
---

## Classes

### PopoverContentElement {#popovercontentelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code><i></i> new <a id="constructor" href="#constructor">PopoverContentElement</a>(): [`PopoverContentElement`](#popovercontentelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="strategy" href="#strategy">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="autoupdate" href="#autoupdate">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><i></i> <a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="transform" href="#transform">transform</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="flip" href="#flip">flip</a>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><i></i> <a id="shift" href="#shift">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="fitviewport" href="#fitviewport">fitViewport</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="samewidth" href="#samewidth">sameWidth</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="sameheight" href="#sameheight">sameHeight</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="inline" href="#inline">inline</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="hide" href="#hide">hide</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="boundary" href="#boundary">boundary</a>: `Boundary`</code>

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

<code data-typedoc-code><i></i> <a id="rootboundary" href="#rootboundary">rootBoundary</a>: `RootBoundary`</code>

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

<code data-typedoc-code><i></i> <a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

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

<code data-typedoc-code><i></i> <a id="elementcontext" href="#elementcontext">elementContext</a>: `ElementContext`</code>

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

<code data-typedoc-code><i></i> <a id="altboundary" href="#altboundary">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

***

### PopoverRootElement {#popoverrootelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code><i></i> new <a id="constructor-1" href="#constructor-1">PopoverRootElement</a>(): [`PopoverRootElement`](#popoverrootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="defaultopen" href="#defaultopen">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open by default.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="open" href="#open">open</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open.

###### Default

`false`

</dd>

</dl>

***

### PopoverTriggerElement {#popovertriggerelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code><i></i> new <a id="constructor-2" href="#constructor-2">PopoverTriggerElement</a>(): [`PopoverTriggerElement`](#popovertriggerelement)</code>

</dt>

</dl>

## Interfaces

### PopoverContentProps {#popovercontentprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="strategy-1" href="#strategy-1">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><i></i> <a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="transform-1" href="#transform-1">transform</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="offset-1" href="#offset-1">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="flip-1" href="#flip-1">flip</a>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><i></i> <a id="shift-1" href="#shift-1">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="overlap-1" href="#overlap-1">overlap</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="fitviewport-1" href="#fitviewport-1">fitViewport</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="samewidth-1" href="#samewidth-1">sameWidth</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="sameheight-1" href="#sameheight-1">sameHeight</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="inline-1" href="#inline-1">inline</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="hide-1" href="#hide-1">hide</a>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="boundary-1" href="#boundary-1">boundary</a>: `Boundary`</code>

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

<code data-typedoc-code><i></i> <a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a>: `RootBoundary`</code>

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

<code data-typedoc-code><i></i> <a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a>: `number`</code>

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

<code data-typedoc-code><i></i> <a id="elementcontext-1" href="#elementcontext-1">elementContext</a>: `ElementContext`</code>

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

<code data-typedoc-code><i></i> <a id="altboundary-1" href="#altboundary-1">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

***

### PopoverContentEvents {#popovercontentevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="escapekeydown" href="#escapekeydown">escapeKeyDown</a>: `EscapeKeyDownEvent`</code>

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="pointerdownoutside" href="#pointerdownoutside">pointerDownOutside</a>: `PointerDownOutsideEvent`</code>

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="focusoutside" href="#focusoutside">focusOutside</a>: `FocusOutsideEvent`</code>

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="interactoutside" href="#interactoutside">interactOutside</a>: `InteractOutsideEvent`</code>

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the
component.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

***

### PopoverRootProps {#popoverrootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="defaultopen-1" href="#defaultopen-1">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open by default.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="open-1" href="#open-1">open</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open.

###### Default

`false`

</dd>

</dl>

***

### PopoverRootEvents {#popoverrootevents-1}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="openchange" href="#openchange">openChange</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`boolean`\></code>

</dt>

</dl>

***

### PopoverTriggerProps {#popovertriggerprops}

***

### PopoverTriggerEvents {#popovertriggerevents}

## PopoverContent

### popoverRootEvents {#popoverrootevents}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="popoverrootevents" href="#popoverrootevents">popoverRootEvents</a>: `EventDeclarations`\<`PopoverRootEvents`\></code>

</dt>

<dd>

</dd>

</dl>
