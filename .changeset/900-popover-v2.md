---
"@prosekit/web": major
"@prosekit/react": major
"@prosekit/vue": major
"@prosekit/svelte": major
"@prosekit/solid": major
"@prosekit/preact": major
"prosekit": major
---

**Breaking:** Redesign the Popover component to separate positioning from content.

`PopoverContent` has been removed and replaced by two new components: `PopoverPositioner` (handles floating positioning) and `PopoverPopup` (the dialog content).

Before:

```html
<PopoverRoot>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Hello</PopoverContent>
</PopoverRoot>
```

After:

```html
<PopoverRoot>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverPositioner>
    <PopoverPopup>Hello</PopoverPopup>
  </PopoverPositioner>
</PopoverRoot>
```

This change aligns Popover with the Tooltip component structure and gives users separate control over positioning and content styling.

Positioning-related props (e.g. `placement`, `offset`, `flip`, `shift`, `strategy`) now go on `PopoverPositioner` instead of `PopoverContent`.

**Breaking:** The `onOpenChange` event handler signature has changed for React, Vue, Solid, Preact, and Svelte users.

The handler now receives an `OpenChangeEvent` object instead of the unwrapped detail value.

Before (React example):

```tsx
<PopoverRoot onOpenChange={(open) => {
  // `open` was a boolean (auto-unwrapped from CustomEvent.detail)
  console.log(open)
}}>
```

After:

```tsx
<PopoverRoot onOpenChange={(event) => {
  // `event` is an OpenChangeEvent with `.open` property
  console.log(event.open)
}}>
```

This also applies to the Tooltip component (already shipped in a prior release).
