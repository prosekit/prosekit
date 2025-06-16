---
title: prosekit/web/inline-popover
sidebar:
  label: web/inline-popover
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### InlinePopoverElement {#inlinepopoverelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `InlinePopoverElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new InlinePopoverElement(): InlinePopoverElement;
```

###### Returns

[`InlinePopoverElement`](#inlinepopoverelement)

###### Inherited from

```ts
InlinePopoverElementBase.constructor
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
InlinePopoverElementBase.altBoundary
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
InlinePopoverElementBase.autoUpdate
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
InlinePopoverElementBase.boundary
```

##### defaultOpen {#defaultopen}

```ts
defaultOpen: boolean;
```

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

###### Default

```ts
true
```

###### Inherited from

```ts
InlinePopoverElementBase.defaultOpen
```

##### dismissOnEscape {#dismissonescape}

```ts
dismissOnEscape: boolean;
```

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

###### Default

```ts
true
```

###### Inherited from

```ts
InlinePopoverElementBase.dismissOnEscape
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
InlinePopoverElementBase.elementContext
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
InlinePopoverElementBase.fitViewport
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
InlinePopoverElementBase.flip
```

##### hide {#hide}

```ts
hide: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
InlinePopoverElementBase.hide
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
InlinePopoverElementBase.hoist
```

##### inline {#inline}

```ts
inline: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
InlinePopoverElementBase.inline
```

##### offset {#offset}

```ts
offset: undefined | OffsetOptions;
```

###### Default

```ts
12
```

###### Inherited from

```ts
InlinePopoverElementBase.offset
```

##### open {#open}

```ts
open: boolean;
```

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is
empty.

###### Default

```ts
false
```

###### Inherited from

```ts
InlinePopoverElementBase.open
```

##### overflowPadding {#overflowpadding}

```ts
overflowPadding: number;
```

###### Default

```ts
8
```

###### Inherited from

```ts
InlinePopoverElementBase.overflowPadding
```

##### overlap {#overlap}

```ts
overlap: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
InlinePopoverElementBase.overlap
```

##### placement {#placement}

```ts
placement: Placement;
```

###### Default

```ts
"top"
```

###### Inherited from

```ts
InlinePopoverElementBase.placement
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
InlinePopoverElementBase.rootBoundary
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
InlinePopoverElementBase.sameHeight
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
InlinePopoverElementBase.sameWidth
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
InlinePopoverElementBase.shift
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
InlinePopoverElementBase.strategy
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
InlinePopoverElementBase.transform
```

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### InlinePopoverEvents {#inlinepopoverevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `OverlayPositionerEvents`

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
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### InlinePopoverProps {#inlinepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, 
  \| `"placement"`
  \| `"offset"`
  \| `"hide"`
  \| `"overlap"`
  \| `"inline"`
  \| `"overflowPadding"`\>

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

<a id="defaultopen-1"></a> `defaultOpen`

</td>
<td>

`boolean`

</td>
<td>

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

**Default**

```ts
true
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="dismissonescape-1"></a> `dismissOnEscape`

</td>
<td>

`boolean`

</td>
<td>

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

**Default**

```ts
true
```

</td>
<td>

&hyphen;

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

**Default**

```ts
true
```

</td>
<td>

&hyphen;

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
Omit.hoist
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

**Default**

```ts
true
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="offset-1"></a> `offset`

</td>
<td>

`undefined` \| `OffsetOptions`

</td>
<td>

**Default**

```ts
12
```

</td>
<td>

&hyphen;

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

Notice that the popover will be always hidden if the inline selection is
empty.

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

<a id="overflowpadding-1"></a> `overflowPadding`

</td>
<td>

`number`

</td>
<td>

**Default**

```ts
8
```

</td>
<td>

&hyphen;

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

**Default**

```ts
true
```

</td>
<td>

&hyphen;

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

**Default**

```ts
"top"
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
