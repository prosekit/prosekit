<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import BlockHandle from './block-handle.svelte'
import DropIndicator from './drop-indicator.svelte'
import { defineExtension } from './extension'

const defaultContent = `
<h1>Heading Level 1</h1>
<p>This is a paragraph under heading level 1. Markdown allows you to write text easily with simple syntax.</p>
<h2>Heading Level 2</h2>
<p>Here's a paragraph under heading level 2 with <strong>bold text</strong>, <em>italic text</em>, and a <a href="https://www.openai.com">link to OpenAI</a>.</p>
<h3>Heading Level 3</h3>
<p>This paragraph is under heading level 3. You can also include <code>inline code</code> for small snippets of code.</p>
<blockquote>
  <p>Blockquote: This is a blockquote example.</p>
  <blockquote>
    <p>Nested Blockquote: You can nest blockquotes to represent different levels of quoted text.</p>
  </blockquote>
</blockquote>
<p>Another paragraph after the blockquote to demonstrate spacing.</p>
<h3>Lists</h3>
<h4>Unordered List</h4>
<ul>
  <li>Item 1</li>
  <li>Item 2
    <ul>
      <li>Subitem 2.1</li>
      <li>Subitem 2.2</li>
    </ul>
  </li>
</ul>
<h4>Ordered List</h4>
<ol>
  <li>First item</li>
  <li>Second item
    <ol>
      <li>Subitem 2.1</li>
      <li>Subitem 2.2</li>
    </ol>
  </li>
</ol>
<h3>Code Block</h3>
<p>You can also include code blocks:</p>
<pre data-language="python"><code>def hello_world():
    print("Hello, world!")
</code></pre>
<p>This is a paragraph after a horizontal rule.</p>

`

const editor = createEditor({ extension: defineExtension(), defaultContent })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div use:mount class="CSS_EDITOR_CONTENT"></div>
      <BlockHandle />
      <DropIndicator />
    </div>
  </div>
</ProseKit>
