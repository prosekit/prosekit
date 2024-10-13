# Commit

Track changes in the editor and display them in a diff view. This is built on top of [prosemirror-changeset](https://github.com/ProseMirror/prosemirror-changeset).

<!-- @include: @/examples/change-tracking.md -->

## Usage

To record changes, first create a `CommitRecorder` instance. Then, pass it to the `defineCommitRecorder` function.

```ts twoslash
import {
  CommitRecorder,
  defineCommitRecorder,
} from 'prosekit/extensions/commit'

const commitRecorder = new CommitRecorder()
const extension = defineCommitRecorder(commitRecorder)
```

When you want to save the changes, call the `commit` method. This will return a JSON `Commit` object if there are any changes. You can then serialize and save this object to your database.

```ts twoslash
import { CommitRecorder } from 'prosekit/extensions/commit'

const commitRecorder = new CommitRecorder()

// ---cut---
import type { Commit } from 'prosekit/extensions/commit'

const commit = commitRecorder.commit()
```

To display the changes, create another editor instance and call `defineCommitViewer` with the `Commit` object.

```ts twoslash
import { CommitRecorder, type Commit } from 'prosekit/extensions/commit'

const commitRecorder = new CommitRecorder()
const commit: Commit = commitRecorder.commit()!

// ---cut---
import { defineCommitViewer } from 'prosekit/extensions/commit'

const extension = defineCommitViewer(commit)
```

To highlight the changes, you must load the `style.css` file or define your own styles for the `.prosekit-commit-addition` and `.prosekit-commit-deletion` classes.

```ts twoslash
import 'prosekit/extensions/commit/style.css'
```

## API Reference

- [prosekit/extensions/commit](/references/extensions/commit)
