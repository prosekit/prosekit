---
title: prosekit/preact/autocomplete
sidebar:
  label: preact/autocomplete
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### AutocompleteEmptyProps {#autocompleteemptyprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteEmpty](#autocompleteempty) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<`Props`, `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteItemProps {#autocompleteitemprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteItem](#autocompleteitem) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`AutocompleteItemProps`](../web/autocomplete.md#autocompleteitemprops), [`AutocompleteItemEvents`](../web/autocomplete.md#autocompleteitemevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### onSelect()? {#onselect}

```ts
optional onSelect: (event: CustomEvent<void>) => void;
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

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Partial.onSelect
```

##### value? {#value}

```ts
optional value: string;
```

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

```ts
""
```

###### Inherited from

```ts
Partial.value
```

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteListProps {#autocompletelistprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteList](#autocompletelist) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`AutocompleteListProps`](../web/autocomplete.md#autocompletelistprops), [`AutocompleteListEvents`](../web/autocomplete.md#autocompletelistevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### filter? {#filter}

```ts
optional filter: null | ItemFilter;
```

The filter function to determine if an item should be shown in the listbox.
By default, a simple case-insensitive substring match is used. You can
provide a custom filter function to match against a more complex pattern.
You can also pass `null` to disable filtering and allow all items to be
shown.

###### Default

```ts
defaultItemFilter
```

###### Inherited from

```ts
Partial.filter
```

##### onValueChange()? {#onvaluechange}

```ts
optional onValueChange: (event: string) => void;
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

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Partial.onValueChange
```

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompletePopoverProps {#autocompletepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompletePopover](#autocompletepopover) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`AutocompletePopoverProps`](../web/autocomplete.md#autocompletepopoverprops), [`AutocompletePopoverEvents`](../web/autocomplete.md#autocompletepopoverevents)\>\>

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

###### Default

```ts
"The body element"
```

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

###### Inherited from

```ts
Partial.elementContext
```

##### fitViewport? {#fitviewport}

```ts
optional fitViewport: boolean;
```

###### Default

```ts
true
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

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
Partial.hide
```

##### hoist? {#hoist}

```ts
optional hoist: boolean;
```

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

The distance between the popover and the hovered block.

###### Default

```ts
4
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

##### onQueryChange()? {#onquerychange}

```ts
optional onQueryChange: (event: string) => void;
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

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Partial.onQueryChange
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

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
Partial.overlap
```

##### placement? {#placement}

```ts
optional placement: Placement;
```

The placement of the popover, relative to the text cursor.

###### Default

```ts
"bottom-start"
```

###### Inherited from

```ts
Partial.placement
```

##### regex? {#regex}

```ts
optional regex: 
  | null
  | RegExp;
```

The regular expression to match the query text to autocomplete.

###### Default

```ts
null
```

###### Inherited from

```ts
Partial.regex
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

### AutocompleteEmpty {#autocompleteempty}

```ts
const AutocompleteEmpty: ForwardRefExoticComponent<Partial<AutocompleteEmptyProps> & RefAttributes<AutocompleteEmptyElement> & HTMLAttributes<AutocompleteEmptyElement>>;
```

***

### AutocompleteItem {#autocompleteitem}

```ts
const AutocompleteItem: ForwardRefExoticComponent<Partial<AutocompleteItemProps> & RefAttributes<AutocompleteItemElement> & HTMLAttributes<AutocompleteItemElement>>;
```

***

### AutocompleteList {#autocompletelist}

```ts
const AutocompleteList: ForwardRefExoticComponent<Partial<AutocompleteListProps> & RefAttributes<AutocompleteListElement> & HTMLAttributes<AutocompleteListElement>>;
```

***

### AutocompletePopover {#autocompletepopover}

```ts
const AutocompletePopover: ForwardRefExoticComponent<Partial<AutocompletePopoverProps> & RefAttributes<AutocompletePopoverElement> & HTMLAttributes<AutocompletePopoverElement>>;
```

<!-- DEBUG memberWithGroups 10 -->
