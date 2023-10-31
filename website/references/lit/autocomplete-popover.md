# prosekit/lit/autocomplete-popover

<a id="autocompletepopover" name="autocompletepopover"></a>

## AutocompletePopover

A custom element that displays a popover anchored to a reference element.

### Extends

- [`Popover`](popover.md#popover)

### Implements

- `Partial`\<[`AutocompletePopoverProps`](autocomplete-popover.md#autocompletepopoverprops)\>

### Properties

| Property | Type | Description | Inheritance |
| :------ | :------ | :------ | :------ |
| `active` | `boolean` | Controls the visibility of the popover element. When set to `true`, the popover is displayed and positioned<br />relative to its reference element. When set to `false`, the popover is hidden and its positioning logic is<br />deactivated. | [`Popover`](popover.md#popover).`active` |
| `autoUpdate` | `boolean` | Controls whether the popover position is automatically updated when the reference element changes position. When<br />set to `true`, the popover position is updated automatically. When set to `false`, the popover position is only<br />updated when the given properties are changed.<br /><br />**Default**<br /><br />` false ` | [`Popover`](popover.md#popover).`autoUpdate` |
| `autoUpdateOptions`? | `Partial`\<`object`\> | The options that are passed to the `autoUpdate` function from Floating UI. These options are used to configure the<br />automatic update behavior of the popover position. For more information on the available options, please refer to<br />the Floating UI documentation. This property is only used when the `autoUpdate` property is set to `true`. | [`Popover`](popover.md#popover).`autoUpdateOptions` |
| `context` | `AutocompletePopoverContext` | - | - |
| `editor`? | [`Editor`](../core.md#editore)\<`any`\> | - | Partial.editor |
| `options`? | `object` | The options that are passed to the `computePosition` function from Floating UI. These options are used to<br />configure the positioning of the popover element relative to its reference element. For more information on the<br />available options, please refer to the Floating UI documentation. | [`Popover`](popover.md#popover).`options` |
| `popoverOptions` | `object` | - | Partial.popoverOptions |
| `reference`? | [`Element`]( https://developer.mozilla.org/en-US/docs/Web/API/Element ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements ) | The element that the popover is anchored to. This can be either a DOM element or an object that implements the<br />virtual element interface from Floating UI. | [`Popover`](popover.md#popover).`reference` |
| `regex`? | [`RegExp`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp ) | - | Partial.regex |

### Accessors

<a id="list" name="list"></a>

#### list

```ts
get private list(): null | AutocompleteList
```

##### Returns

`null` \| [`AutocompleteList`](autocomplete-list.md#autocompletelist)

### Methods

<a id="createrenderroot" name="createrenderroot"></a>

#### createRenderRoot()

```ts
createRenderRoot(): AutocompletePopover
```

##### Returns

[`AutocompletePopover`](autocomplete-popover.md#autocompletepopover)

##### Inherited from

[`Popover`](popover.md#popover).[`createRenderRoot`](popover.md#createrenderroot)

<a id="sethidden" name="sethidden"></a>

#### setHidden()

```ts
setHidden(hidden): void
```

##### Parameters

▪ **hidden**: `boolean`

##### Returns

`void`

##### Inherited from

[`Popover`](popover.md#popover).[`setHidden`](popover.md#sethidden)

<a id="updatecontext" name="updatecontext"></a>

#### updateContext()

```ts
private updateContext(query, active): void
```

##### Parameters

▪ **query**: `string`

▪ **active**: `boolean`

##### Returns

`void`

***

<a id="autocompletepopoverprops" name="autocompletepopoverprops"></a>

## AutocompletePopoverProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `editor` | [`Editor`](../core.md#editore)\<`any`\> | - |
| `popoverOptions`? | `object` | - |
| `regex` | [`RegExp`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp ) | - |

***

<a id="popoveroptions" name="popoveroptions"></a>

## PopoverOptions

```ts
type PopoverOptions: ComputePositionConfig;
```

The `PopoverOptions` interface defines the options that can be passed to the
`computePosition` function from Floating UI. These options are used to
configure the positioning of the popover element relative to its reference
element. For more information on the available options, please refer to the
Floating UI documentation.

https://floating-ui.com/docs/computeposition#options

***

<a id="propnames" name="propnames"></a>

## propNames

```ts
const propNames: readonly ["editor", "regex", "popoverOptions"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
