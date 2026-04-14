---
title: prosekit/solid/popover
sidebar:
  label: solid/popover
---

## Anatomy

```jsx
import {
  PopoverPopup,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/solid/popover'

<PopoverRoot>
  <PopoverTrigger>...</PopoverTrigger>
  <PopoverPositioner>
    <PopoverPopup>...</PopoverPopup>
  </PopoverPositioner>
</PopoverRoot>
```

## Interfaces

### PopoverPopupProps {#popoverpopupprops}

Props for the [PopoverPopup](#popoverpopup) Solid component.

***

### PopoverPositionerProps {#popoverpositionerprops}

Props for the [PopoverPositioner](#popoverpositioner) Solid component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser Popover API to place the floating element on
top of other page content.

###### Default

`true`

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

<code data-typedoc-code><a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

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

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

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

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

***

### PopoverRootProps {#popoverrootprops}

Props for the [PopoverRoot](#popoverroot) Solid component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="modal" href="#modal">modal</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the popover should be modal.
When true, the popover will trap focus and prevent interaction with the rest of the page.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open" href="#open">open</a><i>?</i>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled" href="#disabled">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onopenchange" href="#onopenchange">onOpenChange</a><i>?</i>: (`event`: [`OpenChangeEvent`](../web/autocomplete.md#openchangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the popover is opened or closed.

</dd>

</dl>

***

### PopoverTriggerProps {#popovertriggerprops}

Props for the [PopoverTrigger](#popovertrigger) Solid component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="disabled-1" href="#disabled-1">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="openonhover" href="#openonhover">openOnHover</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the popover should also open when the trigger is hovered.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="delay" href="#delay">delay</a><i>?</i>: `number`</code>

</dt>

<dd>

The delay in milliseconds before opening the popover when hovering.
Only applies when `openOnHover` is true.

###### Default

`300`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="closedelay" href="#closedelay">closeDelay</a><i>?</i>: `number`</code>

</dt>

<dd>

The delay in milliseconds before closing the popover when hover ends.
Only applies when `openOnHover` is true.

###### Default

`0`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onopenchange-1" href="#onopenchange-1">onOpenChange</a><i>?</i>: (`event`: [`OpenChangeEvent`](../web/autocomplete.md#openchangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the popover is opened or closed.

</dd>

</dl>

## Variables

### PopoverPopup {#popoverpopup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="popoverpopup" href="#popoverpopup">PopoverPopup</a>: `Component`\<[`PopoverPopupProps`](#popoverpopupprops) & `JSX.HTMLAttributes`\<[`PopoverPopupElement`](../web/popover.md#popoverpopupelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-popover-popup` custom element.

</dd>

</dl>

***

### PopoverPositioner {#popoverpositioner}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="popoverpositioner" href="#popoverpositioner">PopoverPositioner</a>: `Component`\<[`PopoverPositionerProps`](#popoverpositionerprops) & `JSX.HTMLAttributes`\<[`PopoverPositionerElement`](../web/popover.md#popoverpositionerelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-popover-positioner` custom element.

</dd>

</dl>

***

### PopoverRoot {#popoverroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="popoverroot" href="#popoverroot">PopoverRoot</a>: `Component`\<[`PopoverRootProps`](#popoverrootprops) & `JSX.HTMLAttributes`\<[`PopoverRootElement`](../web/popover.md#popoverrootelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-popover-root` custom element.

</dd>

</dl>

***

### PopoverTrigger {#popovertrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="popovertrigger" href="#popovertrigger">PopoverTrigger</a>: `Component`\<[`PopoverTriggerProps`](#popovertriggerprops) & `JSX.HTMLAttributes`\<[`PopoverTriggerElement`](../web/popover.md#popovertriggerelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-popover-trigger` custom element.

</dd>

</dl>
