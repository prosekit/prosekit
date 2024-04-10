# prosekit/lit/resizable

<a id="Resizable" name="Resizable"></a>

## Resizable

### Extends

- `LightElement`

### Implements

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizableProps`](resizable.md#ResizableProps)\>

### Properties

<a id="aspectRatio" name="aspectRatio"></a>

#### aspectRatio?

> **`optional`** **aspectRatio**: `number`

##### Implementation of

`Partial.aspectRatio`

<a id="height" name="height"></a>

#### height?

> **`optional`** **height**: `string` \| `number`

##### Implementation of

`Partial.height`

<a id="onSizeChange" name="onSizeChange"></a>

#### onSizeChange()?

> **`optional`** **onSizeChange**: (`size`) => `void` \| `Object`

##### Parameters

• **size**

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void` \| `Object`

##### Implementation of

`Partial.onSizeChange`

<a id="onSizeChangeEnd" name="onSizeChangeEnd"></a>

#### onSizeChangeEnd()?

> **`optional`** **onSizeChangeEnd**: (`size`) => `void`

##### Parameters

• **size**

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

##### Implementation of

`Partial.onSizeChangeEnd`

<a id="onSizeChangeStart" name="onSizeChangeStart"></a>

#### onSizeChangeStart()?

> **`optional`** **onSizeChangeStart**: (`size`) => `void`

##### Parameters

• **size**

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

##### Implementation of

`Partial.onSizeChangeStart`

<a id="resizing" name="resizing"></a>

#### resizing?

> **`optional`** **resizing**: `boolean`

<a id="width" name="width"></a>

#### width?

> **`optional`** **width**: `string` \| `number`

##### Implementation of

`Partial.width`

***

<a id="ResizableProps" name="ResizableProps"></a>

## ResizableProps

### Properties

<a id="aspectRatio-1" name="aspectRatio-1"></a>

#### aspectRatio?

> **`optional`** **aspectRatio**: `number`

<a id="height-1" name="height-1"></a>

#### height?

> **`optional`** **height**: `string` \| `number`

<a id="onSizeChange-1" name="onSizeChange-1"></a>

#### onSizeChange()?

> **`optional`** **onSizeChange**: (`size`) => `void` \| `Object`

##### Parameters

• **size**

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void` \| `Object`

<a id="onSizeChangeEnd-1" name="onSizeChangeEnd-1"></a>

#### onSizeChangeEnd()?

> **`optional`** **onSizeChangeEnd**: (`size`) => `void`

##### Parameters

• **size**

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

<a id="onSizeChangeStart-1" name="onSizeChangeStart-1"></a>

#### onSizeChangeStart()?

> **`optional`** **onSizeChangeStart**: (`size`) => `void`

##### Parameters

• **size**

• **size\.height**: `number`

• **size\.width**: `number`

##### Returns

`void`

<a id="width-1" name="width-1"></a>

#### width?

> **`optional`** **width**: `string` \| `number`
