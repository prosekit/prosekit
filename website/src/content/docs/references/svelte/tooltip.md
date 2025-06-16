---
title: prosekit/svelte/tooltip
sidebar:
  label: svelte/tooltip
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### TooltipContentProps {#tooltipcontentprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TooltipContent](#tooltipcontent) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TooltipContentProps`](../web/tooltip.md#tooltipcontentprops), [`TooltipContentEvents`](../web/tooltip.md#tooltipcontentevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary? {#altboundary}

```ts
optional altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### autoUpdate? {#autoupdate}

```ts
optional autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### boundary? {#boundary}

```ts
optional boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

<!-- DEBUG inheritance start kind=1024 -->

##### elementContext? {#elementcontext}

```ts
optional elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

<!-- DEBUG inheritance start kind=1024 -->

##### fitViewport? {#fitviewport}

```ts
optional fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### flip? {#flip}

```ts
optional flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### hide? {#hide}

```ts
optional hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### hoist? {#hoist}

```ts
optional hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### inline? {#inline}

```ts
optional inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### offset? {#offset}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

<!-- DEBUG inheritance start kind=1024 -->

##### overflowPadding? {#overflowpadding}

```ts
optional overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

<!-- DEBUG inheritance start kind=1024 -->

##### overlap? {#overlap}

```ts
optional overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### placement? {#placement}

```ts
optional placement: Placement;
```

The initial placement of the floating element

###### Default

```ts
"top"
```

<!-- DEBUG inheritance start kind=1024 -->

##### rootBoundary? {#rootboundary}

```ts
optional rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameHeight? {#sameheight}

```ts
optional sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameWidth? {#samewidth}

```ts
optional sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### shift? {#shift}

```ts
optional shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy? {#strategy}

```ts
optional strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

##### transform? {#transform}

```ts
optional transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipRootProps {#tooltiprootprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TooltipRoot](#tooltiproot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TooltipRootProps`](../web/tooltip.md#tooltiprootprops), [`TooltipRootEvents`](../web/tooltip.md#tooltiprootevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### closeDelay? {#closedelay}

```ts
optional closeDelay: number;
```

The delay in milliseconds before the tooltip closes.

###### Default

```ts
300
```

<!-- DEBUG inheritance start kind=1024 -->

##### onOpenChange()? {#onopenchange}

```ts
optional onOpenChange: (event: boolean) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### open? {#open}

```ts
optional open: boolean;
```

Whether the popover is open.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### openDelay? {#opendelay}

```ts
optional openDelay: number;
```

The delay in milliseconds before the tooltip opens.

###### Default

```ts
700
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipTriggerProps {#tooltiptriggerprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TooltipTrigger](#tooltiptrigger) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TooltipTriggerProps`](../web/tooltip.md#tooltiptriggerprops), [`TooltipTriggerEvents`](../web/tooltip.md#tooltiptriggerevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

## Variables

### TooltipContent {#tooltipcontent}

```ts
const TooltipContent: typeof SvelteComponent;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TooltipRoot {#tooltiproot}

```ts
const TooltipRoot: typeof SvelteComponent;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TooltipTrigger {#tooltiptrigger}

```ts
const TooltipTrigger: typeof SvelteComponent;
```

<!-- DEBUG inheritance start kind=32 -->

<!-- DEBUG memberWithGroups 10 -->
