---
title: prosekit/solid/autocomplete
sidebar:
  label: solid/autocomplete
---

## Anatomy

```jsx
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/solid/autocomplete'

<AutocompleteRoot>
  <AutocompletePositioner>
    <AutocompletePopup>
      <AutocompleteItem>...</AutocompleteItem>
      <AutocompleteEmpty>...</AutocompleteEmpty>
    </AutocompletePopup>
  </AutocompletePositioner>
</AutocompleteRoot>
```

## Interfaces

### AutocompleteEmptyProps {#autocompleteemptyprops}

Props for the [AutocompleteEmpty](#autocompleteempty) Solid component.

***

### AutocompleteItemProps {#autocompleteitemprops}

Props for the [AutocompleteItem](#autocompleteitem) Solid component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a><i>?</i>: `string`</code>

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled" href="#disabled">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether this option is disabled.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onselect" href="#onselect">onSelect</a><i>?</i>: (`event`: [`SelectEvent`](../web/autocomplete.md#selectevent)) => `void`</code>

</dt>

<dd>

Emitted when the the item is selected.

</dd>

</dl>

***

### AutocompletePopupProps {#autocompletepopupprops}

Props for the [AutocompletePopup](#autocompletepopup) Solid component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="onvaluechange" href="#onvaluechange">onValueChange</a><i>?</i>: (`event`: [`ValueChangeEvent`](../web/autocomplete.md#valuechangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the selected value changes. Only available when multiple is
false.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onvalueschange" href="#onvalueschange">onValuesChange</a><i>?</i>: (`event`: [`ValuesChangeEvent`](../web/autocomplete.md#valueschangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the selected values change. Only available when multiple is
true.

</dd>

</dl>

***

### AutocompletePositionerProps {#autocompletepositionerprops}

Props for the [AutocompletePositioner](#autocompletepositioner) Solid component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the text cursor.

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the popover and the hovered block.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

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

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

***

### AutocompleteRootProps {#autocompleterootprops}

Props for the [AutocompleteRoot](#autocompleteroot) Solid component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="regex" href="#regex">regex</a><i>?</i>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| `null`</code>

</dt>

<dd>

The regular expression to match the query text to autocomplete.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filter" href="#filter">filter</a><i>?</i>: `ItemFilter` \| `null`</code>

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

<code data-typedoc-code><a id="onopenchange" href="#onopenchange">onOpenChange</a><i>?</i>: (`event`: [`OpenChangeEvent`](../web/autocomplete.md#openchangeevent)) => `void`</code>

</dt>

<dd>

Fired when the open state changes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onquerychange" href="#onquerychange">onQueryChange</a><i>?</i>: (`event`: [`QueryChangeEvent`](../web/autocomplete.md#querychangeevent)) => `void`</code>

</dt>

<dd>

Fired when the query changes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onvaluechange-1" href="#onvaluechange-1">onValueChange</a><i>?</i>: (`event`: [`ValueChangeEvent`](../web/autocomplete.md#valuechangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the selected value changes. Only available when multiple is
false.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onvalueschange-1" href="#onvalueschange-1">onValuesChange</a><i>?</i>: (`event`: [`ValuesChangeEvent`](../web/autocomplete.md#valueschangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the selected values change. Only available when multiple is
true.

</dd>

</dl>

## Variables

### AutocompleteEmpty {#autocompleteempty}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompleteempty" href="#autocompleteempty">AutocompleteEmpty</a>: `Component`\<[`AutocompleteEmptyProps`](#autocompleteemptyprops) & `JSX.HTMLAttributes`\<[`AutocompleteEmptyElement`](../web/autocomplete.md#autocompleteemptyelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-autocomplete-empty` custom element.

</dd>

</dl>

***

### AutocompleteItem {#autocompleteitem}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompleteitem" href="#autocompleteitem">AutocompleteItem</a>: `Component`\<[`AutocompleteItemProps`](#autocompleteitemprops) & `JSX.HTMLAttributes`\<[`AutocompleteItemElement`](../web/autocomplete.md#autocompleteitemelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-autocomplete-item` custom element.

</dd>

</dl>

***

### AutocompletePopup {#autocompletepopup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompletepopup" href="#autocompletepopup">AutocompletePopup</a>: `Component`\<[`AutocompletePopupProps`](#autocompletepopupprops) & `JSX.HTMLAttributes`\<[`AutocompletePopupElement`](../web/autocomplete.md#autocompletepopupelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-autocomplete-popup` custom element.

</dd>

</dl>

***

### AutocompletePositioner {#autocompletepositioner}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompletepositioner" href="#autocompletepositioner">AutocompletePositioner</a>: `Component`\<[`AutocompletePositionerProps`](#autocompletepositionerprops) & `JSX.HTMLAttributes`\<[`AutocompletePositionerElement`](../web/autocomplete.md#autocompletepositionerelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-autocomplete-positioner` custom element.

</dd>

</dl>

***

### AutocompleteRoot {#autocompleteroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompleteroot" href="#autocompleteroot">AutocompleteRoot</a>: `Component`\<[`AutocompleteRootProps`](#autocompleterootprops) & `JSX.HTMLAttributes`\<[`AutocompleteRootElement`](../web/autocomplete.md#autocompleterootelement)\>\></code>

</dt>

<dd>

A Solid component that renders an `prosekit-autocomplete-root` custom element.

</dd>

</dl>
