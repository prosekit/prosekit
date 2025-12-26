import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { setNodeAttrs } from './set-node-attrs'

describe('setNodeAttrs', () => {
  it('should set attributes on a code block node', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('const x = 1')))

    // Get the initial language attribute (should be empty string by default)
    expect(editor.state.doc.firstChild?.attrs.language).toBe('')

    // Set the language attribute
    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    expect(editor.exec(command)).toBe(true)
    expect(editor.state.doc.firstChild?.attrs.language).toBe('typescript')
  })

  it('should set multiple attributes at once', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('const x = 1')))

    // Verify initial state
    expect(editor.state.doc.firstChild?.attrs).toMatchObject({
      language: '',
      lineNumbers: false,
    })

    // Set multiple attributes at once
    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'javascript', lineNumbers: true },
    })

    editor.exec(command)

    // Verify both attributes were set
    expect(editor.state.doc.firstChild?.attrs).toMatchObject({
      language: 'javascript',
      lineNumbers: true,
    })
  })

  it('should return false when node type does not match', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.paragraph('Hello world')))

    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    // Should return false because paragraph is not a codeBlock
    expect(editor.exec(command)).toBe(false)
  })

  it('should set attributes at a specific position', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.codeBlock('first block'),
        n.codeBlock('second block'),
      ),
    )

    // Set attribute on the second code block (position after first block)
    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'python' },
      pos: 14, // Position of second code block
    })

    editor.exec(command)

    // First block should still have default language
    expect(editor.state.doc.child(0).attrs.language).toBe('')
    // Second block should have the new language
    expect(editor.state.doc.child(1).attrs.language).toBe('python')
  })

  it('should set attrs on node at exact position', () => {
    const { editor, n } = setupTest()

    // Create a document with multiple blocks
    editor.set(
      n.doc(
        n.paragraph('First paragraph'),
        n.codeBlock('code here'),
        n.paragraph('Last paragraph'),
      ),
    )

    // Find the position of the codeBlock (second child)
    let codeBlockPos = -1
    editor.state.doc.forEach((node, offset) => {
      if (node.type.name === 'codeBlock') {
        codeBlockPos = offset
      }
    })
    expect(codeBlockPos).toBeGreaterThan(0)

    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      pos: codeBlockPos,
    })

    expect(editor.exec(command)).toBe(true)

    // Verify only the codeBlock at the specific position was modified
    expect(editor.state.doc.child(1).attrs.language).toBe('javascript')

    // Verify other nodes weren't affected
    expect(editor.state.doc.child(0).type.name).toBe('paragraph')
    expect(editor.state.doc.child(2).type.name).toBe('paragraph')
  })

  it('should work with selection spanning multiple nodes', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.codeBlock('<a>first block'),
        n.codeBlock('second block<b>'),
      ),
    )

    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'rust' },
    })

    editor.exec(command)

    // Both blocks should have the new language
    expect(editor.state.doc.child(0).attrs.language).toBe('rust')
    expect(editor.state.doc.child(1).attrs.language).toBe('rust')
  })

  it('should accept node type as string array', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('code')))

    const command = setNodeAttrs({
      type: ['codeBlock', 'paragraph'],
      attrs: { language: 'go' },
    })

    editor.exec(command)

    expect(editor.state.doc.firstChild?.attrs.language).toBe('go')
  })

  it('should accept NodeType object', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('code')))

    const codeBlockType = editor.state.schema.nodes.codeBlock

    const command = setNodeAttrs({
      type: codeBlockType,
      attrs: { language: 'kotlin' },
    })

    editor.exec(command)

    expect(editor.state.doc.firstChild?.attrs.language).toBe('kotlin')
  })

  it('should accept array of NodeType objects', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('code')))

    const codeBlockType = editor.state.schema.nodes.codeBlock
    const paragraphType = editor.state.schema.nodes.paragraph

    const command = setNodeAttrs({
      type: [codeBlockType, paragraphType],
      attrs: { language: 'swift' },
    })

    editor.exec(command)

    expect(editor.state.doc.firstChild?.attrs.language).toBe('swift')
  })

  it('should handle cursor inside a node', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('const<a> x = 1')))

    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    editor.exec(command)

    expect(editor.state.doc.firstChild?.attrs.language).toBe('typescript')
  })

  it('should set attrs on wrapping node containing selection', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.blockquote(
          n.paragraph('Hello<a> world<b>'),
        ),
      ),
    )

    const command1 = setNodeAttrs({
      type: 'blockquote',
      attrs: { variant: 'fancy' },
    })

    const command2 = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    // Should find the blockquote wrapping the selection
    expect(editor.exec(command1)).toBe(true)
    expect(editor.state.doc.firstChild?.attrs.variant).toBe('fancy')

    // Should not find the code block
    expect(editor.exec(command2)).toBe(false)
  })

  it.only('DEBUG 1', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.blockquote(
          { variant: 'variant-a' },
          n.paragraph('Paragraph A'),
          n.blockquote(
            { variant: 'variant-b' },
            n.paragraph('Paragraph B'),
            n.blockquote(
              { variant: 'variant-c' },
              n.paragraph('Paragraph <a>C'),
            ),
          ),
        ),
      ),
    )

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "variant": "variant-a",
            },
            "content": [
              {
                "content": [
                  {
                    "text": "Paragraph A",
                    "type": "text",
                  },
                ],
                "type": "paragraph",
              },
              {
                "attrs": {
                  "variant": "variant-b",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph B",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-c",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph C",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                ],
                "type": "blockquote",
              },
            ],
            "type": "blockquote",
          },
        ],
        "type": "doc",
      }
    `)

    const command = setNodeAttrs({
      type: 'blockquote',
      attrs: { variant: 'fancy' },
    })

    expect(editor.exec(command)).toBe(true)

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "variant": "variant-a",
            },
            "content": [
              {
                "content": [
                  {
                    "text": "Paragraph A",
                    "type": "text",
                  },
                ],
                "type": "paragraph",
              },
              {
                "attrs": {
                  "variant": "variant-b",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph B",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "fancy",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph C",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                ],
                "type": "blockquote",
              },
            ],
            "type": "blockquote",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it.only('DEBUG 2', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.blockquote(
          { variant: 'variant-a' },
          n.paragraph('Paragraph A'),
          n.blockquote(
            { variant: 'variant-b' },
            n.paragraph('Paragraph <a>B'),
            n.blockquote(
              { variant: 'variant-c' },
              n.paragraph('Paragraph <b>C'),
            ),
          ),
        ),
      ),
    )

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "variant": "variant-a",
            },
            "content": [
              {
                "content": [
                  {
                    "text": "Paragraph A",
                    "type": "text",
                  },
                ],
                "type": "paragraph",
              },
              {
                "attrs": {
                  "variant": "variant-b",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph B",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-c",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph C",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                ],
                "type": "blockquote",
              },
            ],
            "type": "blockquote",
          },
        ],
        "type": "doc",
      }
    `)

    const command = setNodeAttrs({
      type: 'blockquote',
      attrs: { variant: 'fancy' },
    })

    expect(editor.exec(command)).toBe(true)

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "variant": "variant-a",
            },
            "content": [
              {
                "content": [
                  {
                    "text": "Paragraph A",
                    "type": "text",
                  },
                ],
                "type": "paragraph",
              },
              {
                "attrs": {
                  "variant": "fancy",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph B",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-c",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph C",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                ],
                "type": "blockquote",
              },
            ],
            "type": "blockquote",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it.only('DEBUG 4', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.blockquote(
          { variant: 'variant-a' },
          n.paragraph('Paragraph A'),
          n.blockquote(
            { variant: 'variant-b' },
            n.paragraph('Paragraph B'),
            n.blockquote(
              { variant: 'variant-c' },
              n.paragraph('Paragraph C'),
            ),
            n.paragraph('Paragraph <a>D'),
          ),
          n.blockquote(
            { variant: 'variant-e' },
            n.paragraph('Paragraph E'),
            n.blockquote(
              { variant: 'variant-f' },
              n.paragraph('Paragraph F'),
            ),
            n.paragraph('Paragraph <b>G'),
            n.blockquote(
              { variant: 'variant-h' },
              n.paragraph('Paragraph h'),
            ),
          ),
        ),
      ),
    )

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "variant": "variant-a",
            },
            "content": [
              {
                "content": [
                  {
                    "text": "Paragraph A",
                    "type": "text",
                  },
                ],
                "type": "paragraph",
              },
              {
                "attrs": {
                  "variant": "variant-b",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph B",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-c",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph C",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                  {
                    "content": [
                      {
                        "text": "Paragraph D",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                ],
                "type": "blockquote",
              },
              {
                "attrs": {
                  "variant": "variant-e",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph E",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-f",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph F",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                  {
                    "content": [
                      {
                        "text": "Paragraph G",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-h",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph h",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                ],
                "type": "blockquote",
              },
            ],
            "type": "blockquote",
          },
        ],
        "type": "doc",
      }
    `)

    const command = setNodeAttrs({
      type: 'blockquote',
      attrs: { variant: 'fancy' },
    })

    expect(editor.exec(command)).toBe(true)

    expect(editor.getDocJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "variant": "variant-a",
            },
            "content": [
              {
                "content": [
                  {
                    "text": "Paragraph A",
                    "type": "text",
                  },
                ],
                "type": "paragraph",
              },
              {
                "attrs": {
                  "variant": "fancy",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph B",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-c",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph C",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                  {
                    "content": [
                      {
                        "text": "Paragraph D",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                ],
                "type": "blockquote",
              },
              {
                "attrs": {
                  "variant": "variant-e",
                },
                "content": [
                  {
                    "content": [
                      {
                        "text": "Paragraph E",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-f",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph F",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                  {
                    "content": [
                      {
                        "text": "Paragraph G",
                        "type": "text",
                      },
                    ],
                    "type": "paragraph",
                  },
                  {
                    "attrs": {
                      "variant": "variant-h",
                    },
                    "content": [
                      {
                        "content": [
                          {
                            "text": "Paragraph h",
                            "type": "text",
                          },
                        ],
                        "type": "paragraph",
                      },
                    ],
                    "type": "blockquote",
                  },
                ],
                "type": "blockquote",
              },
            ],
            "type": "blockquote",
          },
        ],
        "type": "doc",
      }
    `)
  })
})
