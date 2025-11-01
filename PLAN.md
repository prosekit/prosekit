# Example Refactoring Plan

## Overview

Based on existing React examples, implement all examples for other frameworks (Preact, Solid, Svelte, Vue).

Migrate one example at a time.

## General Steps

The following is steps to migrate a single example.

1. Pick an example from "registry/src/react/examples/", for example "word-counter"
2. Implement the example in "registry/src/preact/"

   You need to implement exactly the same example, but using another framework instead of React.

   The three most important dirs are:

   - `src/{framework}/examples/`: The code that is specific to the example.
   - `src/{framework}/ui/`: UI components that can be used in multiple examples. I expected users will reuse these components in their own project.
   - `src/{framework}/sample/`: Sample code and data that can be used in multiple examples. I expected users will want to replace the code and data with their own implementations and data. In multiple frameworks, the sample dir should be exactly the same.

3. Run `pnpm -w wip_lint`. Make sure no errors or warnings
4. Run `pnpm test:run test/{story}` to run the test. Replace the `{story}` with the name of the example, for example `word-counter`.
5. Update PLAN.md to reflect the progress.
6. Run `git add -A` and `git commit -m "feat: add {story} example for {framework}"` to commit the changes.

If everything is successful, continue to the next example.
If you have any trouble, please revert the changes for this example, leave a note in the PLAN.md, and continue to the next example.

## Progress

- preact
  - [ ] code-block *(blocked: highlight output differs from React; revisit)*
  - [x] block-handle
  - [x] blockquote
  - [x] change-tracking
  - [ ] code-block-themes *(blocked: highlight output differs from React; revisit alongside code-block)*
  - [x] full
  - [x] gap-cursor
  - [x] heading
  - [x] horizontal-rule
  - [x] image-view
  - [x] inline-menu
  - [x] keymap
  - [x] link
  - [x] link-mark-view
  - [x] list
  - [x] list-custom-checkbox
  - [ ] loro
  - [x] mark-rule
  - [x] minimal
  - [x] placeholder
  - [x] readonly
  - [x] save-html
  - [x] save-json
  - [x] save-markdown
  - [ ] search
  - [ ] slash-menu
  - [ ] table
  - [x] toolbar
  - [ ] typography
  - [ ] unmount
  - [ ] user-menu
  - [ ] user-menu-dynamic
  - [ ] word-counter
  - [ ] yjs
- solid
  - [x] full
  - [x] heading
  - [ ] horizontal-rule
- svelte
  - [x] full
  - [ ] heading
  - [ ] horizontal-rule
- vue
  - [ ] heading
  - [ ] horizontal-rule
