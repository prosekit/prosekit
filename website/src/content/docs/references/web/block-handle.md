---
title: prosekit/web/block-handle
sidebar:
  label: web/block-handle
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### BlockHandleAddElement {#blockhandleaddelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `BlockHandleAddElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new BlockHandleAddElement(): BlockHandleAddElement;
```

###### Returns

[`BlockHandleAddElement`](#blockhandleaddelement)

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandleAddElementBase.constructor
```

<!-- DEBUG memberWithGroups 10 -->

***

### BlockHandleDraggableElement {#blockhandledraggableelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `BlockHandleDraggableElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new BlockHandleDraggableElement(): BlockHandleDraggableElement;
```

###### Returns

[`BlockHandleDraggableElement`](#blockhandledraggableelement)

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandleDraggableElementBase.constructor
```

<!-- DEBUG memberWithGroups 10 -->

***

### BlockHandlePopoverElement {#blockhandlepopoverelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `BlockHandlePopoverElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new BlockHandlePopoverElement(): BlockHandlePopoverElement;
```

###### Returns

[`BlockHandlePopoverElement`](#blockhandlepopoverelement)

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.constructor
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.altBoundary
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.autoUpdate
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.boundary
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.elementContext
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.fitViewport
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.flip
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.hide
```

##### hoist {#hoist}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

```ts
false
```

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.hoist
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.inline
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.offset
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.overflowPadding
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.overlap
```

##### placement {#placement}

```ts
placement: Placement;
```

The placement of the popover, relative to the hovered block.

###### Default

```ts
"left"
```

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.placement
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.rootBoundary
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.sameHeight
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.sameWidth
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.shift
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.strategy
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
BlockHandlePopoverElementBase.transform
```

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### BlockHandleAddProps {#blockhandleaddprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### BlockHandleDraggableProps {#blockhandledraggableprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### BlockHandlePopoverProps {#blockhandlepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"` \| `"hoist"`\>

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.altBoundary
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.autoUpdate
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.boundary
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.elementContext
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.fitViewport
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.flip
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.hide
```

##### hoist {#hoist-1}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

```ts
false
```

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.inline
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.offset
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.overflowPadding
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.overlap
```

##### placement {#placement-1}

```ts
placement: Placement;
```

The placement of the popover, relative to the hovered block.

###### Default

```ts
"left"
```

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.rootBoundary
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.sameHeight
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.sameWidth
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.shift
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.strategy
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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Omit.transform
```

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
