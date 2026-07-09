---
title: prosekit/web/autocomplete
sidebar:
  label: web/autocomplete
---

## Anatomy

```html
<prosekit-autocomplete-root>
  <prosekit-autocomplete-positioner>
    <prosekit-autocomplete-popup>
      <prosekit-autocomplete-item>...</prosekit-autocomplete-item>
      <prosekit-autocomplete-empty>...</prosekit-autocomplete-empty>
    </prosekit-autocomplete-popup>
  </prosekit-autocomplete-positioner>
</prosekit-autocomplete-root>
```

## Classes

### SelectEvent {#selectevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">SelectEvent</a>(): [`SelectEvent`](#selectevent)</code>

</dt>

</dl>

***

### ValueChangeEvent {#valuechangeevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">ValueChangeEvent</a>(`value`: `string`): [`ValueChangeEvent`](#valuechangeevent)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="detail" href="#detail">detail</a>: `string`</code>

</dt>

<dd>

The newly selected value.

</dd>

</dl>

***

### ValuesChangeEvent {#valueschangeevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">ValuesChangeEvent</a>(`values`: `string`[]): [`ValuesChangeEvent`](#valueschangeevent)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="detail-1" href="#detail-1">detail</a>: `string`[]</code>

</dt>

<dd>

The newly selected values.

</dd>

</dl>

***

### OpenChangeEvent {#openchangeevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">OpenChangeEvent</a>(`open`: `boolean`): [`OpenChangeEvent`](#openchangeevent)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="detail-2" href="#detail-2">detail</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is open.

</dd>

</dl>

***

### AutocompleteEmptyElement {#autocompleteemptyelement}

`<prosekit-autocomplete-empty>` custom element.

Properties: [AutocompleteEmptyProps](#autocompleteemptyprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-4" href="#constructor-4">AutocompleteEmptyElement</a>(): [`AutocompleteEmptyElement`](#autocompleteemptyelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller" href="#addcontroller">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller" href="#removecontroller">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback" href="#connectedcallback">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback" href="#disconnectedcallback">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### AutocompleteItemElement {#autocompleteitemelement}

`<prosekit-autocomplete-item>` custom element.

Properties: [AutocompleteItemProps](#autocompleteitemprops)

Events: [AutocompleteItemEvents](#autocompleteitemevents)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-highlighted` | Present when the item is the currently highlighted option |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-5" href="#constructor-5">AutocompleteItemElement</a>(): [`AutocompleteItemElement`](#autocompleteitemelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="disabled-1" href="#disabled-1">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether this option is disabled.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="value-1" href="#value-1">value</a>: `string`</code>

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

`""`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-1" href="#addcontroller-1">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-1" href="#removecontroller-1">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-1" href="#connectedcallback-1">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-1" href="#disconnectedcallback-1">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### AutocompletePopupElement {#autocompletepopupelement}

`<prosekit-autocomplete-popup>` custom element.

Properties: [AutocompletePopupProps](#autocompletepopupprops)

Events: [AutocompletePopupEvents](#autocompletepopupevents)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when the autocomplete is visible, `"closed"` otherwise |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-6" href="#constructor-6">AutocompletePopupElement</a>(): [`AutocompletePopupElement`](#autocompletepopupelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-2" href="#addcontroller-2">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-2" href="#removecontroller-2">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-2" href="#connectedcallback-2">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-2" href="#disconnectedcallback-2">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### AutocompletePositionerElement {#autocompletepositionerelement}

`<prosekit-autocomplete-positioner>` custom element.

Properties: [AutocompletePositionerProps](#autocompletepositionerprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when the autocomplete is visible, `"closed"` otherwise |
| `data-side` | The side of the anchor element the positioner is on |
| `data-align` | The alignment of the positioner relative to the anchor element |

CSS variables:

| Variable | Description |
| --- | --- |
| `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-7" href="#constructor-7">AutocompletePositionerElement</a>(): [`AutocompletePositionerElement`](#autocompletepositionerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-1" href="#strategy-1">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip-1" href="#flip-1">flip</a>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shift-1" href="#shift-1">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-1" href="#overlap-1">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-1" href="#samewidth-1">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-1" href="#sameheight-1">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-1" href="#elementcontext-1">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-1" href="#altboundary-1">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the text cursor.

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-1" href="#offset-1">offset</a>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the popover and the text selection.

###### Default

```ts
{ mainAxis: 8, crossAxis: -4 }
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide-1" href="#hide-1">hide</a>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-1" href="#inline-1">inline</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-1" href="#fitviewport-1">fitViewport</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-1" href="#boundary-1">boundary</a>: `Boundary`</code>

</dt>

<dd>

###### Default

```ts
"The body element"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-3" href="#addcontroller-3">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-3" href="#removecontroller-3">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-3" href="#connectedcallback-3">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-3" href="#disconnectedcallback-3">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### QueryChangeEvent {#querychangeevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-8" href="#constructor-8">QueryChangeEvent</a>(`query`: `string`): [`QueryChangeEvent`](#querychangeevent)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="detail-3" href="#detail-3">detail</a>: `string`</code>

</dt>

<dd>

The current query string.

</dd>

</dl>

***

### AutocompleteRootElement {#autocompleterootelement}

`<prosekit-autocomplete-root>` custom element.

Properties: [AutocompleteRootProps](#autocompleterootprops)

Events: [AutocompleteRootEvents](#autocompleterootevents)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-9" href="#constructor-9">AutocompleteRootElement</a>(): [`AutocompleteRootElement`](#autocompleterootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="regex-1" href="#regex-1">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| `null`</code>

</dt>

<dd>

The regular expression to match the query text to autocomplete.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filter-1" href="#filter-1">filter</a>: `ItemFilter` \| `null`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the
listbox.

###### Default

`defaultItemFilter`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="querybuilder-1" href="#querybuilder-1">queryBuilder</a>: [`QueryBuilder`](#querybuilder-2)</code>

</dt>

<dd>

Builds the query string from the regex match found before the cursor. The
query is exposed via the `queryChange` event and used by the built-in item
filter. The default builder lowercases the match and strips punctuation.
Provide a custom builder to control the query, for example to preserve the
casing and punctuation the user typed.

###### Default

`defaultQueryBuilder`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="anchor-1" href="#anchor-1">anchor</a>: `AnchorReference`</code>

</dt>

<dd>

The reference to position the popup against. This can be a DOM element, a
Floating UI virtual element, or a function that returns either of them.
By default, the popup will be positioned against the text content that
triggers the autocomplete.

###### Default

`null`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-4" href="#addcontroller-4">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-4" href="#removecontroller-4">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-4" href="#connectedcallback-4">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-4" href="#disconnectedcallback-4">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

## Interfaces

### AutocompleteEmptyProps {#autocompleteemptyprops}

***

### AutocompleteItemProps {#autocompleteitemprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="disabled" href="#disabled">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether this option is disabled.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a>: `string`</code>

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

`""`

</dd>

</dl>

***

### AutocompleteItemEvents {#autocompleteitemevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="select" href="#select">select</a>: [`SelectEvent`](#selectevent)</code>

</dt>

<dd>

Emitted when the the item is selected.

</dd>

</dl>

***

### AutocompletePopupProps {#autocompletepopupprops}

***

### AutocompletePopupEvents {#autocompletepopupevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="valuechange" href="#valuechange">valueChange</a>: [`ValueChangeEvent`](#valuechangeevent)</code>

</dt>

<dd>

Emitted when the selected value changes. Only available when multiple is
false.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="valueschange" href="#valueschange">valuesChange</a>: [`ValuesChangeEvent`](#valueschangeevent)</code>

</dt>

<dd>

Emitted when the selected values change. Only available when multiple is
true.

</dd>

</dl>

***

### AutocompletePositionerProps {#autocompletepositionerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip" href="#flip">flip</a>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shift" href="#shift">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the text cursor.

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the popover and the text selection.

###### Default

```ts
{ mainAxis: 8, crossAxis: -4 }
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide" href="#hide">hide</a>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a>: `Boundary`</code>

</dt>

<dd>

###### Default

```ts
"The body element"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

***

### AutocompleteRootProps {#autocompleterootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="regex" href="#regex">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| `null`</code>

</dt>

<dd>

The regular expression to match the query text to autocomplete.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filter" href="#filter">filter</a>: `ItemFilter` \| `null`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the
listbox.

###### Default

`defaultItemFilter`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="querybuilder" href="#querybuilder">queryBuilder</a>: [`QueryBuilder`](#querybuilder-2)</code>

</dt>

<dd>

Builds the query string from the regex match found before the cursor. The
query is exposed via the `queryChange` event and used by the built-in item
filter. The default builder lowercases the match and strips punctuation.
Provide a custom builder to control the query, for example to preserve the
casing and punctuation the user typed.

###### Default

`defaultQueryBuilder`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="anchor" href="#anchor">anchor</a>: `AnchorReference`</code>

</dt>

<dd>

The reference to position the popup against. This can be a DOM element, a
Floating UI virtual element, or a function that returns either of them.
By default, the popup will be positioned against the text content that
triggers the autocomplete.

###### Default

`null`

</dd>

</dl>

***

### AutocompleteRootEvents {#autocompleterootevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="valuechange-1" href="#valuechange-1">valueChange</a>: [`ValueChangeEvent`](#valuechangeevent)</code>

</dt>

<dd>

Emitted when the selected value changes. Only available when multiple is
false.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="valueschange-1" href="#valueschange-1">valuesChange</a>: [`ValuesChangeEvent`](#valueschangeevent)</code>

</dt>

<dd>

Emitted when the selected values change. Only available when multiple is
true.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="openchange" href="#openchange">openChange</a>: [`OpenChangeEvent`](#openchangeevent)</code>

</dt>

<dd>

Fired when the open state changes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="querychange" href="#querychange">queryChange</a>: [`QueryChangeEvent`](#querychangeevent)</code>

</dt>

<dd>

Fired when the query changes.

</dd>

</dl>

## Type Aliases

### QueryBuilder {#querybuilder-2}

<dl>

<dt>

<code data-typedoc-code>type <a id="querybuilder-2" href="#querybuilder-2">QueryBuilder</a> = (`match`: `RegExpExecArray`) => `string`</code>

</dt>

<dd>

Builds the query string from the regex match found before the cursor. The
returned query is exposed via the `queryChange` event and used by the
built-in item filter.

</dd>

</dl>

## Functions

### defaultQueryBuilder() {#defaultquerybuilder}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defaultquerybuilder" href="#defaultquerybuilder">defaultQueryBuilder</a>(`match`: `RegExpExecArray`): `string`</code>

</dt>

</dl>
