# prosekit/lit/popover

## PopoverOptions

Re-exports [PopoverOptions](autocomplete-popover.md#popoveroptions)

## Popover

A custom element that displays a popover anchored to a reference element.

### Extends

- `LightElement`

### Implements

- `Partial`\<[`PopoverProps`](popover.md#popoverprops)\>

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `active` | `boolean` | Controls the visibility of the popover element. When set to `true`, the popover is displayed and positioned<br />relative to its reference element. When set to `false`, the popover is hidden and its positioning logic is<br />deactivated. |
| `autoUpdate` | `boolean` | Controls whether the popover position is automatically updated when the reference element changes position. When<br />set to `true`, the popover position is updated automatically. When set to `false`, the popover position is only<br />updated when the given properties are changed.<br /><br />**Default**<br /><br />` false ` |
| `autoUpdateOptions`? | `Partial`\<`object`\> | The options that are passed to the `autoUpdate` function from Floating UI. These options are used to configure the<br />automatic update behavior of the popover position. For more information on the available options, please refer to<br />the Floating UI documentation. This property is only used when the `autoUpdate` property is set to `true`. |
| `options`? | `object` | The options that are passed to the `computePosition` function from Floating UI. These options are used to<br />configure the positioning of the popover element relative to its reference element. For more information on the<br />available options, please refer to the Floating UI documentation. |
| `reference`? | [`Element`]( https://developer.mozilla.org/en-US/docs/Web/API/Element ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements ) | The element that the popover is anchored to. This can be either a DOM element or an object that implements the<br />virtual element interface from Floating UI. |

### Methods

#### createRenderRoot()

```ts
createRenderRoot(): Popover
```

##### Returns

[`Popover`](popover.md#popover)

##### Inherited from

LightElement.createRenderRoot

#### handleDocumentKeyDown()

```ts
private handleDocumentKeyDown(event): void
```

##### Parameters

▪ **event**: [`KeyboardEvent`]( https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent )

##### Returns

`void`

#### handleDocumentMouseDown()

```ts
private handleDocumentMouseDown(event): void
```

##### Parameters

▪ **event**: [`MouseEvent`]( https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent )

##### Returns

`void`

#### setHidden()

```ts
setHidden(hidden): void
```

##### Parameters

▪ **hidden**: `boolean`

##### Returns

`void`

##### Inherited from

LightElement.setHidden

***

## PopoverProps

### Extended By

- [`ComboBoxProps`](combo-box.md#comboboxprops)

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `active` | `boolean` | - |
| `autoUpdate`? | `boolean` | - |
| `autoUpdateOptions`? | `Partial`\<`object`\> | - |
| `options`? | `object` | - |
| `reference`? | [`Element`]( https://developer.mozilla.org/en-US/docs/Web/API/Element ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements ) | - |

***

## propNames

```ts
const propNames: readonly ["active", "reference", "options", "autoUpdate", "autoUpdateOptions"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
