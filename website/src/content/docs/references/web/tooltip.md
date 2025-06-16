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
Props.altBoundary
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
Props.autoUpdate
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
Props.boundary
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
Props.elementContext
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
Props.fitViewport
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
Props.flip
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
Props.hide
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
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**

```ts
true
```

</td>
<td>

```ts
Props.hoist
```

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
Props.inline
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
Props.offset
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
Props.overflowPadding
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
Props.overlap
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

The initial placement of the floating element

**Default**

```ts
"top"
```

</td>
<td>

```ts
Props.placement
```

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
Props.rootBoundary
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
Props.sameHeight
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
Props.sameWidth
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
Props.shift
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
Props.strategy
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
Props.transform
```

</td>
</tr>
</tbody>
</table>

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

<a id="openchange"></a> `openChange`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`boolean`\>

</td>
<td>

Fired when the open state changes.

</td>
<td>

```ts
Events.openChange
```

</td>
</tr>
</tbody>
</table>

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

<a id="closedelay-1"></a> `closeDelay`

</td>
<td>

`number`

</td>
<td>

The delay in milliseconds before the tooltip closes.

**Default**

```ts
300
```

</td>
<td>

```ts
Props.closeDelay
```

</td>
</tr>
<tr>
<td>

<a id="open-1"></a> `open`

</td>
<td>

`boolean`

</td>
<td>

Whether the popover is open.

**Default**

```ts
false
```

</td>
<td>

```ts
Props.open
```

</td>
</tr>
<tr>
<td>

<a id="opendelay-1"></a> `openDelay`

</td>
<td>

`number`

</td>
<td>

The delay in milliseconds before the tooltip opens.

**Default**

```ts
700
```

</td>
<td>

```ts
Props.openDelay
```

</td>
</tr>
</tbody>
</table>

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
