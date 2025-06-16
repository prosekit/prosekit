---
title: prosekit/vue/autocomplete
sidebar:
  label: vue/autocomplete
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### AutocompleteEmptyEmits {#autocompleteemptyemits}

<!-- DEBUG memberWithGroups 1 -->

Emits for the [AutocompleteEmpty](#autocompleteempty) component.

#### Extends

- `CreateEmits`\<`Events`\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteEmptyProps {#autocompleteemptyprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteEmpty](#autocompleteempty) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`Props`\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteItemEmits {#autocompleteitememits}

<!-- DEBUG memberWithGroups 1 -->

Emits for the [AutocompleteItem](#autocompleteitem) component.

#### Extends

- `CreateEmits`\<[`AutocompleteItemEvents`](../web/autocomplete.md#autocompleteitemevents)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### select() {#select}

```ts
select: (event: CustomEvent<void>) => void;
```

Fired when the item is selected.

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
CreateEmits.select
```

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteItemProps {#autocompleteitemprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteItem](#autocompleteitem) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`AutocompleteItemProps`](../web/autocomplete.md#autocompleteitemprops)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.value
```

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteListEmits {#autocompletelistemits}

<!-- DEBUG memberWithGroups 1 -->

Emits for the [AutocompleteList](#autocompletelist) component.

#### Extends

- `CreateEmits`\<[`AutocompleteListEvents`](../web/autocomplete.md#autocompletelistevents)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### valueChange() {#valuechange}

```ts
valueChange: (event: string) => void;
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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
CreateEmits.valueChange
```

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteListProps {#autocompletelistprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteList](#autocompletelist) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`AutocompleteListProps`](../web/autocomplete.md#autocompletelistprops)\>

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.filter
```

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompletePopoverEmits {#autocompletepopoveremits}

<!-- DEBUG memberWithGroups 1 -->

Emits for the [AutocompletePopover](#autocompletepopover) component.

#### Extends

- `CreateEmits`\<[`AutocompletePopoverEvents`](../web/autocomplete.md#autocompletepopoverevents)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### openChange() {#openchange}

```ts
openChange: (event: boolean) => void;
```

Fired when the open state changes.

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
CreateEmits.openChange
```

##### queryChange() {#querychange}

```ts
queryChange: (event: string) => void;
```

Fired when the query changes.

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
CreateEmits.queryChange
```

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompletePopoverProps {#autocompletepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompletePopover](#autocompletepopover) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`AutocompletePopoverProps`](../web/autocomplete.md#autocompletepopoverprops)\>

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

###### Default

```ts
"The body element"
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

###### Default

```ts
true
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

###### Default

```ts
true
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

###### Default

```ts
true
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

The distance between the popover and the hovered block.

###### Default

```ts
4
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

###### Default

```ts
8
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

The placement of the popover, relative to the text cursor.

###### Default

```ts
"bottom-start"
```

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

### AutocompleteEmpty {#autocompleteempty}

```ts
const AutocompleteEmpty: DefineSetupFnComponent<AutocompleteEmptyProps & HTMLAttributes, AutocompleteEmptyEmits>;
```

<!-- DEBUG inheritance start -->

***

### AutocompleteItem {#autocompleteitem}

```ts
const AutocompleteItem: DefineSetupFnComponent<AutocompleteItemProps & HTMLAttributes, AutocompleteItemEmits>;
```

<!-- DEBUG inheritance start -->

***

### AutocompleteList {#autocompletelist}

```ts
const AutocompleteList: DefineSetupFnComponent<AutocompleteListProps & HTMLAttributes, AutocompleteListEmits>;
```

<!-- DEBUG inheritance start -->

***

### AutocompletePopover {#autocompletepopover}

```ts
const AutocompletePopover: DefineSetupFnComponent<AutocompletePopoverProps & HTMLAttributes, AutocompletePopoverEmits>;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->
