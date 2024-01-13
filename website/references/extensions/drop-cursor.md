# prosekit/extensions/drop-cursor

<a id="DropCursorOptions" name="DropCursorOptions"></a>

## DropCursorOptions

### Properties

<a id="class" name="class"></a>

#### class?

> **class**?: `string`

A CSS class name to add to the cursor element.

<a id="color" name="color"></a>

#### color?

> **color**?: `string` \| `false`

The color of the cursor.  Use `false` to apply no color and rely only on class.

##### Default

```ts
'black'
```

<a id="width" name="width"></a>

#### width?

> **width**?: `number`

The precise width of the cursor in pixels.

##### Default

```ts
1
```

***

<a id="defineDropCursor" name="defineDropCursor"></a>

## defineDropCursor()

> **defineDropCursor**(`options`?): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Show up a decoration at the drop position when something is dragged over the editor.

See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.

### Parameters

• **options?**: [`DropCursorOptions`](drop-cursor.md#DropCursorOptions)

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
