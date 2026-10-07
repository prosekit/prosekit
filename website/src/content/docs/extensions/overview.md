---
title: Extensions overview
description: Every official extension, grouped by what it adds to the editor (nodes, marks, editing, or collaboration)
sidebar:
  order: 1
---

ProseKit ships an extension for every common editor feature. Each one lives at `prosekit/extensions/<name>` and exposes a `define<Name>()` factory you compose with [`union(...)`](/concepts/extensions). Open a page to see its commands, keyboard shortcuts, and usage example.

## Nodes

| Extension                                      | Description                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| [Blockquote](/extensions/blockquote)           | Quote blocks for citing or highlighting passages                  |
| [CodeBlock](/extensions/code-block)            | Code blocks with optional syntax highlighting                     |
| [Doc](/extensions/doc)                         | The top-level document node every editor needs                    |
| [Hard Break](/extensions/hard-break)           | Inline line break, rendered as `<br>`                             |
| [Heading](/extensions/heading)                 | Heading nodes h1 through h6 with Markdown-style input rules       |
| [Horizontal Rule](/extensions/horizontal-rule) | Horizontal divider lines for content separation                   |
| [Image](/extensions/image)                     | Embed images with optional dimension attributes                   |
| [List](/extensions/list)                       | Bullet, ordered, task, and toggle lists                           |
| [Math](/extensions/math)                       | Inline and block math expressions rendered with a custom function |
| [Mention](/extensions/mention)                 | Mention nodes triggered by characters like `@` or `#`             |
| [Page](/extensions/page)                       | Page-break-aware container that paginates content for printing    |
| [Paragraph](/extensions/paragraph)             | The default block node for body text                              |
| [Table](/extensions/table)                     | Editable tables with row, column, and cell selection              |
| [Text](/extensions/text)                       | The text node every schema requires                               |

## Marks

| Extension                                        | Description                                                     |
| ------------------------------------------------ | --------------------------------------------------------------- |
| [Background Color](/extensions/background-color) | Apply a background color to a text selection                    |
| [Bold](/extensions/bold)                         | Bold text formatting backed by the standard `<strong>` mark     |
| [Code](/extensions/code)                         | Inline code formatting backed by the standard `<code>` mark     |
| [Italic](/extensions/italic)                     | Italic text formatting backed by the standard `<em>` mark       |
| [Link](/extensions/link)                         | Hyperlink mark with optional auto-detection from typed URLs     |
| [Strike](/extensions/strike)                     | Strikethrough text formatting backed by the standard `<s>` mark |
| [Text Color](/extensions/text-color)             | Apply a foreground color to a text selection                    |
| [Underline](/extensions/underline)               | Underline text formatting backed by the standard `<u>` mark     |

## Editing

| Extension                              | Description                                                       |
| -------------------------------------- | ----------------------------------------------------------------- |
| [Commit](/extensions/commit)           | Track and visualize document changes between commits              |
| [Drop Cursor](/extensions/drop-cursor) | Visual cursor indicator during drag-and-drop operations           |
| [Enter Rule](/extensions/enter-rule)   | Run handlers when the Enter key matches a regex pattern           |
| [File](/extensions/file)               | Handle file drops and pastes with custom upload logic             |
| [Gap Cursor](/extensions/gap-cursor)   | Cursor that lets you select positions between non-editable blocks |
| [Input Rule](/extensions/input-rule)   | Transform typed text using regex-driven input rules               |
| [Placeholder](/extensions/placeholder) | Show placeholder text in empty blocks                             |
| [Readonly](/extensions/readonly)       | Make the editor read-only and prevent edits                       |
| [Search](/extensions/search)           | In-document search and replace functionality                      |
| [Text Align](/extensions/text-align)   | Add text alignment attributes to block nodes                      |

## Collaboration

| Extension                | Description                                |
| ------------------------ | ------------------------------------------ |
| [Loro](/extensions/loro) | Real-time collaboration with the Loro CRDT |
| [Yjs](/extensions/yjs)   | Real-time collaboration with the Yjs CRDT  |
