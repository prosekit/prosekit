/// keep-sorted { "keys": ["name"] }
const stories: ReadonlyArray<{ name: string; description: string; hidden?: boolean }> = [
  {
    name: 'block-handle',
    description: 'A handle that appears on hover, allowing you to drag and re-order blocks.',
  },
  {
    name: 'blockquote',
    description: 'Example for blockquote node.',
  },
  {
    name: 'bold',
    description: 'Example for bold mark.',
  },
  {
    name: 'change-tracking',
    description: 'Track and commit document changes with version history.',
  },
  {
    name: 'code-block-themes',
    description: 'Code block with multiple syntax highlighting themes.',
  },
  {
    name: 'code-block',
    description: 'Example for code block node with syntax highlighting.',
  },
  {
    name: 'code',
    description: 'Example for inline code mark.',
  },
  {
    name: 'drop-cursor',
    description: 'Visual cursor indicator during drag-and-drop operations.',
  },
  {
    name: 'emoji-rules',
    description: 'Auto-convert text shortcuts to emojis using input rules.',
  },
  {
    name: 'full',
    description: 'Full-featured editor with most available features enabled.',
  },
  {
    name: 'gap-cursor',
    description: 'Cursor navigation between non-text block elements.',
  },
  {
    name: 'hard-break',
    description: 'Example for hard line break node.',
  },
  {
    name: 'heading',
    description: 'Example for heading node with multiple levels.',
  },
  {
    name: 'horizontal-rule',
    description: 'Example for horizontal rule node.',
  },
  {
    name: 'image-view',
    description: 'Custom image node views with resize support.',
  },
  {
    name: 'inline-menu',
    description: 'Inline formatting menu that appears on text selection.',
  },
  {
    name: 'italic',
    description: 'Example for italic mark.',
  },
  {
    name: 'katex',
    description: 'Math equation rendering using the KaTeX library.',
  },
  {
    name: 'keymap',
    description: 'Custom keyboard shortcuts and key bindings.',
  },
  {
    name: 'link-mark-view',
    description: 'An example showing how to render a mark as a custom component.',
  },
  {
    name: 'link',
    description: 'Example for link mark with URL input.',
  },
  {
    name: 'list-custom-checkbox',
    description: 'Custom checkbox styling for task lists.',
  },
  {
    name: 'list',
    description: 'Example for list node.',
  },
  {
    name: 'loro',
    description: 'Real-time collaboration using Loro CRDT library.',
  },
  {
    name: 'mark-rule',
    description: 'Input rules for automatic mark formatting.',
  },
  {
    name: 'minimal',
    description: 'Minimal editor setup with basic functionality.',
  },
  {
    name: 'notion',
    description: 'Notion-style editor with block-based editing.',
    hidden: true,
  },
  {
    name: 'page',
    description: 'Page layout with configurable paper settings.',
  },
  {
    name: 'placeholder',
    description: 'Placeholder text displayed.',
  },
  {
    name: 'readonly',
    description: 'Toggle between read-only and editable mode.',
  },
  {
    name: 'rtl',
    description: 'Right-to-left text direction support.',
  },
  {
    name: 'save-html',
    description: 'Save and load documents as HTML format.',
  },
  {
    name: 'save-json',
    description: 'Save and load documents as JSON format.',
  },
  {
    name: 'save-markdown',
    description: 'Save and load documents as Markdown format.',
  },
  {
    name: 'search',
    description: 'Search and highlight text with navigation.',
  },
  {
    name: 'slash-menu',
    description: 'Command menu triggered by typing slash (/).',
  },
  {
    name: 'strike',
    description: 'Example for strikethrough mark.',
  },
  {
    name: 'table',
    description: 'Table node with row and column operations.',
  },
  {
    name: 'temml',
    description: 'Math equation rendering using the Temml library.',
  },
  {
    name: 'text-align',
    description: 'Text alignment options (left, center, right, justify).',
  },
  {
    name: 'text-color',
    description: 'Change text and background color.',
  },
  {
    name: 'toolbar',
    description: 'Formatting toolbar with common editing actions.',
  },
  {
    name: 'tweet',
    description: 'Embed and display Twitter tweets.',
  },
  {
    name: 'typography',
    description: 'Typography enhancements like smart quotes and dashes.',
  },
  {
    name: 'underline',
    description: 'Example for underline mark.',
  },
  {
    name: 'unmount',
    description: 'Properly unmount and remount editor instances.',
  },
  {
    name: 'user-menu-dynamic',
    description: 'Dynamic autocomplete menu with async data loading.',
  },
  {
    name: 'user-menu',
    description: 'Autocomplete menu for @mentions and #hashtag',
  },
  {
    name: 'view-adapter',
    description: 'Custom node and mark views using view adapters.',
    hidden: true,
  },
  {
    name: 'word-counter',
    description: 'Display word and character count statistics.',
  },
  {
    name: 'yjs',
    description: 'Real-time collaboration using Yjs CRDT library.',
  },
]

export { stories }
