---
title: prosekit/react/block-handle
sidebar:
  label: react/block-handle
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### BlockHandleAddProps {#blockhandleaddprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [BlockHandleAdd](#blockhandleadd) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`BlockHandleAddProps`](../web/block-handle.md#blockhandleaddprops), `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### BlockHandleDraggableProps {#blockhandledraggableprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [BlockHandleDraggable](#blockhandledraggable) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`BlockHandleDraggableProps`](../web/block-handle.md#blockhandledraggableprops), `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### BlockHandlePopoverProps {#blockhandlepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [BlockHandlePopover](#blockhandlepopover) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`BlockHandlePopoverProps`](../web/block-handle.md#blockhandlepopoverprops), `Events`\>\>

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.altBoundary
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.autoUpdate
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.boundary
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.elementContext
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.fitViewport
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.flip
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.hide
```

##### hoist? {#hoist}

```ts
optional hoist: boolean;
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
Partial.hoist
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.inline
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
Partial.offset
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.overflowPadding
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.overlap
```

##### placement? {#placement}

```ts
optional placement: Placement;
```

The placement of the popover, relative to the hovered block.

###### Default

```ts
"left"
```

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.placement
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.rootBoundary
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.sameHeight
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.sameWidth
```

##### shift? {#shift}

```ts
optional shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.shift
```

##### strategy? {#strategy}

```ts
optional strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.strategy
```

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.transform
```

<!-- DEBUG memberWithGroups 10 -->

## Variables

### BlockHandleAdd {#blockhandleadd}

```ts
const BlockHandleAdd: ForwardRefExoticComponent<BlockHandleAddProps & RefAttributes<BlockHandleAddElement> & HTMLAttributes<BlockHandleAddElement>>;
```

<!-- DEBUG inheritance start -->

***

### BlockHandleDraggable {#blockhandledraggable}

```ts
const BlockHandleDraggable: ForwardRefExoticComponent<BlockHandleDraggableProps & RefAttributes<BlockHandleDraggableElement> & HTMLAttributes<BlockHandleDraggableElement>>;
```

<!-- DEBUG inheritance start -->

***

### BlockHandlePopover {#blockhandlepopover}

```ts
const BlockHandlePopover: ForwardRefExoticComponent<BlockHandlePopoverProps & RefAttributes<BlockHandlePopoverElement> & HTMLAttributes<BlockHandlePopoverElement>>;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->
