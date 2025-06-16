---
title: prosekit/extensions/gap-cursor
sidebar:
  label: extensions/gap-cursor
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Functions

### defineGapCursor() {#definegapcursor}

```ts
function defineGapCursor(): PlainExtension;
```

Capture clicks near and arrow-key-motion past places that don't have a
normally selectable position nearby, and create a gap cursor selection for
them. The cursor is drawn as an element with class `ProseMirror-gapcursor`.

You can either include `prosekit/extensions/gap-cursor.css` or add your own
styles to make it visible.

See
[prosemirror-gapcursor](https://github.com/ProseMirror/prosemirror-gapcursor)
for more information.

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
