# Search

Search and replace text within the editor. This is built on top of [prosemirror-search](https://github.com/ProseMirror/prosemirror-search).

<!-- @include: @/examples/search.md -->

## Usage

To highlight search matches, you must load the `style.css` file or define your own styles for the `.ProseMirror-search-match` (search match) and `.ProseMirror-active-search-match` (active match) classes.

```ts twoslash
import 'prosekit/extensions/search/style.css'
```

Call `defineSearchCommands()` to define related commands.

```ts twoslash
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
```

In your search component, when the search text and replace text change, you should create a new extension with the specified text. Typically, you will need to call the `useExtension()` function from various framework bindings.

```ts twoslash
import { defineSearchQuery } from 'prosekit/extensions/search'

const extension = defineSearchQuery({ search: 'foo', replace: 'bar' })
```

## Commands

### `findNext`

Find the next instance of the search query after the current selection and move the selection to it.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.findNext()
```

### `findPrev`

Find the previous instance of the search query and move the selection to it.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.findPrev()
```

### `findNextNoWrap`

Find the next instance of the search query and move the selection to it. Don't wrap around at the end of document or search range.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.findNextNoWrap()
```

### `findPrevNoWrap`

Find the previous instance of the search query and move the selection to it. Don't wrap at the start of the document or search range.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.findPrevNoWrap()
```

### `replaceNext`

Replace the currently selected instance of the search query, and move to the next one. Or select the next match, if none is already selected.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.replaceNext()
```

### `replaceNextNoWrap`

Replace the next instance of the search query. Don't wrap around at the end of the document.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.replaceNextNoWrap()
```

### `replaceCurrent`

Replace the currently selected instance of the search query, if any, and keep it selected.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.replaceCurrent()
```

### `replaceAll`

Replace all instances of the search query.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

const extension = defineSearchCommands()
const editor = createEditor({ extension })

// ---cut---
editor.commands.replaceAll()
```

## API Reference

- [prosekit/extensions/search](/references/extensions/search)
