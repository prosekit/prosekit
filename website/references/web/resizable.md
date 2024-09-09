# prosekit/web/resizable

<a id="ResizableHandleElement" name="ResizableHandleElement"></a>

## ResizableHandleElement

Renames and re-exports [ResizableHandle](../lit/resizable.md#ResizableHandle)

<a id="ResizableRootElement" name="ResizableRootElement"></a>

## ResizableRootElement

Renames and re-exports [ResizableRoot](../lit/resizable.md#ResizableRoot)

<a id="ResizableHandleProps" name="ResizableHandleProps"></a>

## ResizableHandleProps

### Properties

<a id="position" name="position"></a>

#### position

> **position**: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`

The position of the handle.

##### Default

```ts
"bottom-right"
```

***

<a id="ResizableRootProps" name="ResizableRootProps"></a>

## ResizableRootProps

### Properties

<a id="aspectRatio" name="aspectRatio"></a>

#### aspectRatio

> **aspectRatio**: `null` \| `number`

<a id="height" name="height"></a>

#### height

> **height**: `null` \| `number`

<a id="onSizeChange" name="onSizeChange"></a>

#### onSizeChange

> **onSizeChange**: `null` \| (`size`) => `void`

<a id="onSizeChangeEnd" name="onSizeChangeEnd"></a>

#### onSizeChangeEnd

> **onSizeChangeEnd**: `null` \| (`size`) => `void`

<a id="onSizeChangeStart" name="onSizeChangeStart"></a>

#### onSizeChangeStart

> **onSizeChangeStart**: `null` \| (`size`) => `void`

<a id="width" name="width"></a>

#### width

> **width**: `null` \| `number`

***

<a id="defaultResizableHandleProps" name="defaultResizableHandleProps"></a>

## defaultResizableHandleProps

> `const` **defaultResizableHandleProps**: `object`

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `position` | `"bottom-right"` | 'bottom-right' |

***

<a id="defaultResizableRootProps" name="defaultResizableRootProps"></a>

## defaultResizableRootProps

> `const` **defaultResizableRootProps**: `object`

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `aspectRatio` | `null` | null |
| `height` | `null` | null |
| `onSizeChange` | `null` | null |
| `onSizeChangeEnd` | `null` | null |
| `onSizeChangeStart` | `null` | null |
| `width` | `null` | null |
