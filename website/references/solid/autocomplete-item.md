# prosekit/solid/autocomplete-item

<a id="autocompleteitemprops" name="autocompleteitemprops"></a>

## AutocompleteItemProps

```ts
type AutocompleteItemProps: object & AutocompleteItemProps;
```

### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `children` | `JSXElement` | - |
| `class` | `string` | - |

***

<a id="autocompleteitem" name="autocompleteitem"></a>

## AutocompleteItem()

```ts
AutocompleteItem(props): Element
```

A general `Component` has no implicit `children` prop.  If desired, you can
specify one as in `Component<{name: String, children: JSX.Element}>`.

### Parameters

▪ **props**: [`AutocompleteItemProps`](autocomplete-item.md#autocompleteitemprops)

### Returns

`Element`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
