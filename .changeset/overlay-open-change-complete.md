---
"@prosekit/web": minor
"@prosekit/react": minor
"@prosekit/preact": minor
"@prosekit/solid": minor
"@prosekit/vue": minor
"@prosekit/svelte": minor
"prosekit": minor
---

Remove `onOpenChange` from `MenuTrigger`, `MenuSubmenuTrigger`, `PopoverTrigger`, `TooltipTrigger`, `TableHandleColumnMenuTrigger`, and `TableHandleRowMenuTrigger`. Use `onOpenChange` on the root instead. Add `onOpenChangeComplete` to the menu, submenu, popover, tooltip, and table handle menu roots.
