---
title: prosekit/basic
sidebar:
  label: basic
---


## defineBasicExtension {#define-basic-extension}

```ts
function defineBasicExtension(): BasicExtension
```

Define a basic extension that includes some common functionality. You can
copy this function and customize it to your needs.

It's a combination of the following extension functions:

* [defineDoc](extensions/doc.md#define-doc-1)
* [defineText](extensions/text.md#define-text-1)
* [defineParagraph](extensions/paragraph.md#define-paragraph-1)
* [defineHeading](extensions/heading.md#define-heading)
* [defineList](extensions/list.md#define-list)
* [defineBlockquote](extensions/blockquote.md#define-blockquote)
* [defineImage](extensions/image.md#define-image)
* [defineHorizontalRule](extensions/horizontal-rule.md#define-horizontal-rule)
* [defineHardBreak](extensions/hard-break.md#define-hard-break)
* [defineTable](extensions/table.md#define-table)
* [defineCodeBlock](extensions/code-block.md#define-code-block)
* [defineItalic](extensions/italic.md#define-italic)
* [defineBold](extensions/bold.md#define-bold)
* [defineUnderline](extensions/underline.md#define-underline)
* [defineStrike](extensions/strike.md#define-strike)
* [defineCode](extensions/code.md#define-code)
* [defineLink](extensions/link.md#define-link)
* [defineBaseKeymap](core.md#define-base-keymap)
* [defineBaseCommands](core.md#define-base-commands)
* [defineHistory](core.md#define-history)
* [defineDropCursor](extensions/drop-cursor.md#define-drop-cursor)
* [defineGapCursor](extensions/gap-cursor.md#define-gap-cursor)
* [defineVirtualSelection](extensions/virtual-selection.md#define-virtual-selection)
* [defineModClickPrevention](extensions/mod-click-prevention.md#define-mod-click-prevention)
