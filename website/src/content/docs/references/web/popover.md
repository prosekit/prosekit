---
title: prosekit/web/popover
sidebar:
  label: web/popover
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### PopoverContentElement {#popovercontentelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverContentElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new PopoverContentElement(): PopoverContentElement;
```

###### Returns

[`PopoverContentElement`](#popovercontentelement)

<!-- DEBUG inheritance start kind=16384 -->

###### Inherited from

```ts
PopoverContentElementBase.constructor
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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### placement {#placement}

```ts
placement: Placement;
```

The initial placement of the floating element

###### Default

```ts
"top"
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### shift {#shift}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy {#strategy}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverRootElement {#popoverrootelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverRootElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new PopoverRootElement(): PopoverRootElement;
```

###### Returns

[`PopoverRootElement`](#popoverrootelement)

<!-- DEBUG inheritance start kind=16384 -->

###### Inherited from

```ts
PopoverRootElementBase.constructor
```

#### Properties

##### defaultOpen {#defaultopen}

```ts
defaultOpen: boolean;
```

Whether the popover is open by default.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### open {#open}

```ts
open: boolean;
```

Whether the popover is open.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverTriggerElement {#popovertriggerelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverTriggerElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new PopoverTriggerElement(): PopoverTriggerElement;
```

###### Returns

[`PopoverTriggerElement`](#popovertriggerelement)

<!-- DEBUG inheritance start kind=16384 -->

###### Inherited from

```ts
PopoverTriggerElementBase.constructor
```

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### PopoverContentEvents {#popovercontentevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverContentEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### escapeKeyDown {#escapekeydown}

```ts
escapeKeyDown: EscapeKeyDownEvent;
```

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

<!-- DEBUG inheritance start kind=1024 -->

##### focusOutside {#focusoutside}

```ts
focusOutside: FocusOutsideEvent;
```

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

<!-- DEBUG inheritance start kind=1024 -->

##### interactOutside {#interactoutside}

```ts
interactOutside: InteractOutsideEvent;
```

Fired when an interaction (pointer or focus) happens outside the
component.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

<!-- DEBUG inheritance start kind=1024 -->

##### pointerDownOutside {#pointerdownoutside}

```ts
pointerDownOutside: PointerDownOutsideEvent;
```

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverContentProps {#popovercontentprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverContentProps`

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### offset? {#offset-1}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### placement {#placement-1}

```ts
placement: Placement;
```

The initial placement of the floating element

###### Default

```ts
"top"
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### shift {#shift-1}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy {#strategy-1}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverRootEvents {#popoverrootevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverRootEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### openChange {#openchange}

```ts
openChange: CustomEvent<boolean>;
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverRootProps {#popoverrootprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverRootProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### defaultOpen {#defaultopen-1}

```ts
defaultOpen: boolean;
```

Whether the popover is open by default.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### open {#open-1}

```ts
open: boolean;
```

Whether the popover is open.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverTriggerEvents {#popovertriggerevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverTriggerEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverTriggerProps {#popovertriggerprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `PopoverTriggerProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

## PopoverContent

### popoverRootEvents {#popoverrootevents-1}

```ts
const popoverRootEvents: EventDeclarations<PopoverRootEvents>;
```

<!-- DEBUG inheritance start kind=32 -->

<!-- DEBUG memberWithGroups 10 -->
