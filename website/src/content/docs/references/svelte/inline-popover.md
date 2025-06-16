---
title: prosekit/svelte/inline-popover
sidebar:
  label: svelte/inline-popover
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### InlinePopoverProps {#inlinepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [InlinePopover](#inlinepopover) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`InlinePopoverProps`](../web/inline-popover.md#inlinepopoverprops), [`InlinePopoverEvents`](../web/inline-popover.md#inlinepopoverevents)\>\>

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

###### Inherited from

```ts
Partial.boundary
```

##### defaultOpen? {#defaultopen}

```ts
optional defaultOpen: boolean;
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
Partial.defaultOpen
```

##### dismissOnEscape? {#dismissonescape}

```ts
optional dismissOnEscape: boolean;
```

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

###### Default

```ts
true
```

###### Inherited from

```ts
Partial.dismissOnEscape
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

###### Inherited from

```ts
Partial.flip
```

##### hide? {#hide}

```ts
optional hide: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
Partial.hide
```

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

###### Inherited from

```ts
Partial.hoist
```

##### inline? {#inline}

```ts
optional inline: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
Partial.inline
```

##### offset? {#offset}

```ts
optional offset: OffsetOptions;
```

###### Default

```ts
12
```

###### Inherited from

```ts
Partial.offset
```

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

###### Inherited from

```ts
Partial.onOpenChange
```

##### open? {#open}

```ts
optional open: boolean;
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
Partial.open
```

##### overflowPadding? {#overflowpadding}

```ts
optional overflowPadding: number;
```

###### Default

```ts
8
```

###### Inherited from

```ts
Partial.overflowPadding
```

##### overlap? {#overlap}

```ts
optional overlap: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
Partial.overlap
```

##### placement? {#placement}

```ts
optional placement: Placement;
```

###### Default

```ts
"top"
```

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

###### Inherited from

```ts
Partial.transform
```

<!-- DEBUG memberWithGroups 10 -->

## Variables

### InlinePopover {#inlinepopover}

```ts
const InlinePopover: typeof SvelteComponent;
```

<!-- DEBUG memberWithGroups 10 -->
