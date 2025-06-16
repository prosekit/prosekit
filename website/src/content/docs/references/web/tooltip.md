---
title: prosekit/web/tooltip
sidebar:
  label: web/tooltip
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### TooltipContentElement {#tooltipcontentelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipContentElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TooltipContentElement(): TooltipContentElement;
```

###### Returns

[`TooltipContentElement`](#tooltipcontentelement)

###### Inherited from

```ts
TooltipContentElementBase.constructor
```

#### Properties

##### altBoundary {#altboundary}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.altBoundary
```

##### autoUpdate {#autoupdate}

```ts
autoUpdate: 
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

###### Inherited from

```ts
TooltipContentElementBase.autoUpdate
```

##### boundary {#boundary}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
TooltipContentElementBase.boundary
```

##### elementContext {#elementcontext}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
TooltipContentElementBase.elementContext
```

##### fitViewport {#fitviewport}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.fitViewport
```

##### flip {#flip}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
TooltipContentElementBase.flip
```

##### hide {#hide}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.hide
```

##### hoist {#hoist}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
TooltipContentElementBase.hoist
```

##### inline {#inline}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.inline
```

##### offset? {#offset}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

###### Inherited from

```ts
TooltipContentElementBase.offset
```

##### overflowPadding {#overflowpadding}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
TooltipContentElementBase.overflowPadding
```

##### overlap {#overlap}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.overlap
```

##### placement {#placement}

```ts
placement: Placement;
```

The initial placement of the floating element

###### Default

```ts
"top"
```

###### Inherited from

```ts
TooltipContentElementBase.placement
```

##### rootBoundary {#rootboundary}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
TooltipContentElementBase.rootBoundary
```

##### sameHeight {#sameheight}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.sameHeight
```

##### sameWidth {#samewidth}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.sameWidth
```

##### shift {#shift}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
TooltipContentElementBase.shift
```

##### strategy {#strategy}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
TooltipContentElementBase.strategy
```

##### transform {#transform}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipContentElementBase.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipRootElement {#tooltiprootelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipRootElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TooltipRootElement(): TooltipRootElement;
```

###### Returns

[`TooltipRootElement`](#tooltiprootelement)

###### Inherited from

```ts
TooltipRootElementBase.constructor
```

#### Properties

##### closeDelay {#closedelay}

```ts
closeDelay: number;
```

The delay in milliseconds before the tooltip closes.

###### Default

```ts
300
```

###### Inherited from

```ts
TooltipRootElementBase.closeDelay
```

##### open {#open}

```ts
open: boolean;
```

Whether the popover is open.

###### Default

```ts
false
```

###### Inherited from

```ts
TooltipRootElementBase.open
```

##### openDelay {#opendelay}

```ts
openDelay: number;
```

The delay in milliseconds before the tooltip opens.

###### Default

```ts
700
```

###### Inherited from

```ts
TooltipRootElementBase.openDelay
```

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipTriggerElement {#tooltiptriggerelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipTriggerElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TooltipTriggerElement(): TooltipTriggerElement;
```

###### Returns

[`TooltipTriggerElement`](#tooltiptriggerelement)

###### Inherited from

```ts
TooltipTriggerElementBase.constructor
```

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### TooltipContentEvents {#tooltipcontentevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipContentEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipContentProps {#tooltipcontentprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipContentProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary {#altboundary-1}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.altBoundary
```

##### autoUpdate {#autoupdate-1}

```ts
autoUpdate: 
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

###### Inherited from

```ts
Props.autoUpdate
```

##### boundary {#boundary-1}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
Props.boundary
```

##### elementContext {#elementcontext-1}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
Props.elementContext
```

##### fitViewport {#fitviewport-1}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.fitViewport
```

##### flip {#flip-1}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
Props.flip
```

##### hide {#hide-1}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.hide
```

##### hoist {#hoist-1}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
Props.hoist
```

##### inline {#inline-1}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.inline
```

##### offset? {#offset-1}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

###### Inherited from

```ts
Props.offset
```

##### overflowPadding {#overflowpadding-1}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
Props.overflowPadding
```

##### overlap {#overlap-1}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.overlap
```

##### placement {#placement-1}

```ts
placement: Placement;
```

The initial placement of the floating element

###### Default

```ts
"top"
```

###### Inherited from

```ts
Props.placement
```

##### rootBoundary {#rootboundary-1}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
Props.rootBoundary
```

##### sameHeight {#sameheight-1}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.sameHeight
```

##### sameWidth {#samewidth-1}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.sameWidth
```

##### shift {#shift-1}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
Props.shift
```

##### strategy {#strategy-1}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
Props.strategy
```

##### transform {#transform-1}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipRootEvents {#tooltiprootevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipRootEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### openChange {#openchange}

```ts
openChange: CustomEvent<boolean>;
```

Fired when the open state changes.

###### Inherited from

```ts
Events.openChange
```

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipRootProps {#tooltiprootprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipRootProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### closeDelay {#closedelay-1}

```ts
closeDelay: number;
```

The delay in milliseconds before the tooltip closes.

###### Default

```ts
300
```

###### Inherited from

```ts
Props.closeDelay
```

##### open {#open-1}

```ts
open: boolean;
```

Whether the popover is open.

###### Default

```ts
false
```

###### Inherited from

```ts
Props.open
```

##### openDelay {#opendelay-1}

```ts
openDelay: number;
```

The delay in milliseconds before the tooltip opens.

###### Default

```ts
700
```

###### Inherited from

```ts
Props.openDelay
```

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipTriggerEvents {#tooltiptriggerevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipTriggerEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TooltipTriggerProps {#tooltiptriggerprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TooltipTriggerProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
