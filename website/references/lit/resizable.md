# prosekit/lit/resizable

<a id="Resizable" name="Resizable"></a>

## Resizable

### Extends

- `LightElement`

### Implements

- [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<[`ResizableProps`](resizable.md#ResizableProps)\>

### Properties

<a id="aspectRatio" name="aspectRatio"></a>

#### aspectRatio?

> **aspectRatio**?: `number`

##### Implementation of

`Partial.aspectRatio`

<a id="height" name="height"></a>

#### height?

> **height**?: `string` \| `number`

##### Implementation of

`Partial.height`

<a id="onSizeChange" name="onSizeChange"></a>

#### onSizeChange?

> **onSizeChange**?: (`size`) => `void` \| `Object`

##### Parameters

• **size**: `Object`

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void` \| `Object`

##### Implementation of

`Partial.onSizeChange`

<a id="onSizeChangeEnd" name="onSizeChangeEnd"></a>

#### onSizeChangeEnd?

> **onSizeChangeEnd**?: (`size`) => `void`

##### Parameters

• **size**: `Object`

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

##### Implementation of

`Partial.onSizeChangeEnd`

<a id="onSizeChangeStart" name="onSizeChangeStart"></a>

#### onSizeChangeStart?

> **onSizeChangeStart**?: (`size`) => `void`

##### Parameters

• **size**: `Object`

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

##### Implementation of

`Partial.onSizeChangeStart`

<a id="resizing" name="resizing"></a>

#### resizing?

> **resizing**?: `boolean`

<a id="width" name="width"></a>

#### width?

> **width**?: `string` \| `number`

##### Implementation of

`Partial.width`

### Methods

<a id="createRenderRoot" name="createRenderRoot"></a>

#### createRenderRoot()

> **createRenderRoot**(): [`Resizable`](resizable.md#Resizable)

##### Returns

[`Resizable`](resizable.md#Resizable)

##### Inherited from

`LightElement.createRenderRoot`

<a id="setHidden" name="setHidden"></a>

#### setHidden()

> **setHidden**(`hidden`): `void`

##### Parameters

• **hidden**: `boolean`

##### Returns

`void`

##### Inherited from

`LightElement.setHidden`

***

<a id="ResizableProps" name="ResizableProps"></a>

## ResizableProps

### Properties

<a id="aspectRatio-1" name="aspectRatio-1"></a>

#### aspectRatio?

> **aspectRatio**?: `number`

<a id="height-1" name="height-1"></a>

#### height?

> **height**?: `string` \| `number`

<a id="onSizeChange-1" name="onSizeChange-1"></a>

#### onSizeChange?

> **onSizeChange**?: (`size`) => `void` \| `Object`

##### Parameters

• **size**: `Object`

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void` \| `Object`

<a id="onSizeChangeEnd-1" name="onSizeChangeEnd-1"></a>

#### onSizeChangeEnd?

> **onSizeChangeEnd**?: (`size`) => `void`

##### Parameters

• **size**: `Object`

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

<a id="onSizeChangeStart-1" name="onSizeChangeStart-1"></a>

#### onSizeChangeStart?

> **onSizeChangeStart**?: (`size`) => `void`

##### Parameters

• **size**: `Object`

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

<a id="width-1" name="width-1"></a>

#### width?

> **width**?: `string` \| `number`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
