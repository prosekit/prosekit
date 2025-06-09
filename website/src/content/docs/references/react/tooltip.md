---
title: prosekit/react/tooltip
sidebar:
  label: react/tooltip
---


## TooltipContentProps {#tooltip-content-props-1}

Props for the [TooltipContent](tooltip.md#tooltip-content-1) component.

<dl>

<dt>

`altBoundary?: boolean`

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**: `false`

</dd>

<dt>

`autoUpdate?: boolean | AutoUpdateOptions`

</dt>

<dd>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**: `true`

</dd>

<dt>

`boundary?: Boundary`

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**: `'clippingAncestors'`

</dd>

<dt>

`elementContext?: ElementContext`

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**: `'floating'`

</dd>

<dt>

`fitViewport?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**: `false`

</dd>

<dt>

`flip?: boolean | Placement[]`

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**: `true`

</dd>

<dt>

`hide?: boolean`

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**: `false`

</dd>

<dt>

`hoist?: boolean`

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**: `true`

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**: `false`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

The distance between the reference and floating element.

**Default**: `6`

</dd>

<dt>

`overflowPadding?: number`

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**: `4`

</dd>

<dt>

`overlap?: boolean`

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**: `false`

</dd>

<dt>

`placement?: Placement`

</dt>

<dd>

The initial placement of the floating element

**Default**: `"top"`

</dd>

<dt>

`rootBoundary?: RootBoundary`

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**: `'viewport'`

</dd>

<dt>

`sameHeight?: boolean`

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`sameWidth?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`shift?: boolean`

</dt>

<dd>

Whether the floating element should shift to keep it in view.

**Default**: `true`

</dd>

<dt>

`strategy?: "fixed" | "absolute"`

</dt>

<dd>

The strategy to use for positioning

**Default**: `"absolute"`

</dd>

<dt>

`transform?: boolean`

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**: `false`

</dd>

</dl>

## TooltipRootProps {#tooltip-root-props-1}

Props for the [TooltipRoot](tooltip.md#tooltip-root-1) component.

<dl>

<dt>

`closeDelay?: number`

</dt>

<dd>

The delay in milliseconds before the tooltip closes.

**Default**: `300`

</dd>

<dt>

`onOpenChange?: (event: boolean) => void`

</dt>

<dd>

</dd>

<dt>

`open?: boolean`

</dt>

<dd>

Whether the popover is open.

**Default**: `false`

</dd>

<dt>

`openDelay?: number`

</dt>

<dd>

The delay in milliseconds before the tooltip opens.

**Default**: `700`

</dd>

</dl>

## TooltipTriggerProps {#tooltip-trigger-props-1}

Props for the [TooltipTrigger](tooltip.md#tooltip-trigger-1) component.

## TooltipContent {#tooltip-content-1}

```ts
function TooltipContent(props: TooltipContentProps & RefAttributes<TooltipContentElement> & HTMLAttributes<TooltipContentElement>): ReactNode
```

## TooltipRoot {#tooltip-root-1}

```ts
function TooltipRoot(props: TooltipRootProps & RefAttributes<TooltipRootElement> & HTMLAttributes<TooltipRootElement>): ReactNode
```

## TooltipTrigger {#tooltip-trigger-1}

```ts
function TooltipTrigger(props: TooltipTriggerProps & RefAttributes<TooltipTriggerElement> & HTMLAttributes<TooltipTriggerElement>): ReactNode
```
