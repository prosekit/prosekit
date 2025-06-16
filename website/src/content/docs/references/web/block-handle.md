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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="altboundary-1"></a> `altBoundary`

</td>
<td>

`boolean`

</td>
<td>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.altBoundary
```

</td>
</tr>
<tr>
<td>

<a id="autoupdate-1"></a> `autoUpdate`

</td>
<td>

 \| `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)

</td>
<td>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.autoUpdate
```

</td>
</tr>
<tr>
<td>

<a id="boundary-1"></a> `boundary`

</td>
<td>

`Boundary`

</td>
<td>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**

```ts
'clippingAncestors'
```

</td>
<td>

```ts
Omit.boundary
```

</td>
</tr>
<tr>
<td>

<a id="elementcontext-1"></a> `elementContext`

</td>
<td>

`ElementContext`

</td>
<td>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**

```ts
'floating'
```

</td>
<td>

```ts
Omit.elementContext
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport-1"></a> `fitViewport`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.fitViewport
```

</td>
</tr>
<tr>
<td>

<a id="flip-1"></a> `flip`

</td>
<td>

`boolean` \| `Placement`[]

</td>
<td>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.flip
```

</td>
</tr>
<tr>
<td>

<a id="hide-1"></a> `hide`

</td>
<td>

`boolean`

</td>
<td>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.hide
```

</td>
</tr>
<tr>
<td>

<a id="hoist-1"></a> `hoist`

</td>
<td>

`boolean`

</td>
<td>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

**Default**

```ts
false
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="inline-1"></a> `inline`

</td>
<td>

`boolean`

</td>
<td>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.inline
```

</td>
</tr>
<tr>
<td>

<a id="offset-1"></a> `offset?`

</td>
<td>

`OffsetOptions`

</td>
<td>

The distance between the reference and floating element.

**Default**

```ts
6
```

</td>
<td>

```ts
Omit.offset
```

</td>
</tr>
<tr>
<td>

<a id="overflowpadding-1"></a> `overflowPadding`

</td>
<td>

`number`

</td>
<td>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**

```ts
4
```

</td>
<td>

```ts
Omit.overflowPadding
```

</td>
</tr>
<tr>
<td>

<a id="overlap-1"></a> `overlap`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.overlap
```

</td>
</tr>
<tr>
<td>

<a id="placement-1"></a> `placement`

</td>
<td>

`Placement`

</td>
<td>

The placement of the popover, relative to the hovered block.

**Default**

```ts
"left"
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="rootboundary-1"></a> `rootBoundary`

</td>
<td>

`RootBoundary`

</td>
<td>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**

```ts
'viewport'
```

</td>
<td>

```ts
Omit.rootBoundary
```

</td>
</tr>
<tr>
<td>

<a id="sameheight-1"></a> `sameHeight`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameHeight
```

</td>
</tr>
<tr>
<td>

<a id="samewidth-1"></a> `sameWidth`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameWidth
```

</td>
</tr>
<tr>
<td>

<a id="shift-1"></a> `shift`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element should shift to keep it in view.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.shift
```

</td>
</tr>
<tr>
<td>

<a id="strategy-1"></a> `strategy`

</td>
<td>

`"fixed"` \| `"absolute"`

</td>
<td>

The strategy to use for positioning

**Default**

```ts
"absolute"
```

</td>
<td>

```ts
Omit.strategy
```

</td>
</tr>
<tr>
<td>

<a id="transform-1"></a> `transform`

</td>
<td>

`boolean`

</td>
<td>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.transform
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
