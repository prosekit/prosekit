# Styling

ProseKit is headless, giving you full control over your editor's appearance. However, to help you in getting started, we offers two basic stylesheets.

```js
import 'prosekit/basic/style.css'
```

```js
import 'prosekit/basic/typograph.css'
```

The `basic/style.css` file provides essential styles to ensure the editor displays correctly.
The `basic/typograph.css` file offers basic typographic styles for the editor, like margins, paddings, and font sizes. This is optional, and you can exclude it if you wish to use your own styles.

## Customizing Styles

To apply your own styles, utilize the `.ProseMirror` class. This class is linked to the root element of the editable content area.

```css
.ProseMirror blockquote {
  border-left: 2px solid #eee;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
}
```

## Tailwind CSS Integration

ProseKit is fully compatible with Tailwind CSS. For inspiration and guidance, check out our [Examples](/examples) section.
