---
title: prosekit/basic
sidebar:
  label: basic
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Functions

### defineBasicExtension() {#definebasicextension}

```ts
function defineBasicExtension(): BasicExtension;
```

Define a basic extension that includes some common functionality. You can
copy this function and customize it to your needs.

It's a combination of the following extension functions:

- [defineDoc](extensions/doc.md#definedoc)
- [defineText](extensions/text.md#definetext)
- [defineParagraph](extensions/paragraph.md#defineparagraph)
- [defineHeading](extensions/heading.md#defineheading)
- [defineList](extensions/list.md#definelist)
- [defineBlockquote](extensions/blockquote.md#defineblockquote)
- [defineImage](extensions/image.md#defineimage)
- [defineHorizontalRule](extensions/horizontal-rule.md#definehorizontalrule)
- [defineHardBreak](extensions/hard-break.md#definehardbreak)
- [defineTable](extensions/table.md#definetable)
- [defineCodeBlock](extensions/code-block.md#definecodeblock)
- [defineItalic](extensions/italic.md#defineitalic)
- [defineBold](extensions/bold.md#definebold)
- [defineUnderline](extensions/underline.md#defineunderline)
- [defineStrike](extensions/strike.md#definestrike)
- [defineCode](extensions/code.md#definecode)
- [defineLink](extensions/link.md#definelink)
- [defineBaseKeymap](core.md#definebasekeymap)
- [defineBaseCommands](core.md#definebasecommands)
- [defineHistory](core.md#definehistory)
- [defineDropCursor](extensions/drop-cursor.md#definedropcursor)
- [defineGapCursor](extensions/gap-cursor.md#definegapcursor)
- [defineVirtualSelection](extensions/virtual-selection.md#definevirtualselection)
- [defineModClickPrevention](extensions/mod-click-prevention.md#definemodclickprevention)

#### Returns

`BasicExtension`

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->
