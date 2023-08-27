# CodeBlock

The `codeBlock` node is a part of the ProseKit extensions and is used to represent blocks of code in the document.

## Usage

To add a `codeBlock` node to your document, you can use the `addCodeBlock` function. This function accepts an optional `hljs` parameter, which is an instance of the `HLJSApi` from the `highlight.js` library. This is used for syntax highlighting of the code block.

```ts
import { addCodeBlock } from 'prosekit/extensions/code-block'
import 'highlight.js/styles/github-dark-dimmed.css'
import hljs from 'highlight.js/lib/common'

function addMyCodeBlock() {
  return addCodeBlock({ hljs })
}
```
