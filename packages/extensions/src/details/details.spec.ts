import { nodeFromHTML, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'
import { Selection, TextSelection } from '@prosekit/pm/state'

import { defineDoc } from '../doc/index.ts'
import { defineGapCursor } from '../gap-cursor/index.ts'
import { defineHorizontalRule } from '../horizontal-rule/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineDetails } from './details.ts'
import { defineDetailsNodeView } from './details-node-view.ts'

describe('defineDetails', () => {
  const extension = union(
    defineDetails(),
    defineDoc(),
    defineText(),
    defineParagraph(),
  )

  const { editor, n } = setupTestFromExtension(extension)
  const schema = editor.schema

  it('registers details, detailsSummary, and detailsContent node types', () => {
    const nodeNames = Object.keys(schema.nodes)
    expect(nodeNames).toContain('details')
    expect(nodeNames).toContain('detailsSummary')
    expect(nodeNames).toContain('detailsContent')
  })

  it('details has correct content expression', () => {
    const detailsType = schema.nodes.details
    expect(detailsType).toBeDefined()
    expect(detailsType.spec.content).toBe('detailsSummary detailsContent')
    expect(detailsType.spec.group).toBe('block')
    expect(detailsType.spec.defining).toBe(true)
    expect(detailsType.spec.isolating).toBe(true)
  })

  it('detailsSummary is not in the block group', () => {
    const summaryType = schema.nodes.detailsSummary
    expect(summaryType.spec.group).toBeUndefined()
  })

  it('detailsContent requires block children', () => {
    const contentType = schema.nodes.detailsContent
    expect(contentType.spec.content).toBe('block+')
  })

  it('parses native HTML details element', () => {
    const doc = nodeFromHTML(
      '<details open><summary>Title</summary><p>Content</p></details>',
      { schema },
    ).toJSON()

    expect(doc).toEqual(
      n.doc(
        n.details(
          { open: true },
          n.detailsSummary('Title'),
          n.detailsContent(
            n.paragraph('Content'),
          ),
        ),
      ).toJSON(),
    )
  })

  it('parses details without open attribute', () => {
    const doc = nodeFromHTML(
      '<details><summary>Title</summary><p>Content</p></details>',
      { schema },
    ).toJSON()

    expect(doc).toEqual(
      n.doc(
        n.details(
          { open: false },
          n.detailsSummary('Title'),
          n.detailsContent(
            n.paragraph('Content'),
          ),
        ),
      ).toJSON(),
    )
  })

  it('serializes to native HTML details element', () => {
    const doc = n.doc(
      n.details(
        { open: true },
        n.detailsSummary('Title'),
        n.detailsContent(
          n.paragraph('Content'),
        ),
      ),
    )
    editor.set(doc)
    const html = editor.getDocHTML()

    expect(html).toContain('<details')
    expect(html).toContain('open')
    expect(html).toContain('<summary>')
    expect(html).toContain('Title')
    expect(html).toContain('</summary>')
    expect(html).toContain('data-type="detailsContent"')
    expect(html).toContain('<p>')
    expect(html).toContain('Content')
    expect(html).toContain('</p>')
    expect(html).toContain('</details>')
  })

  it('inserts a details node with summary and default block', () => {
    const doc = n.doc(n.paragraph('<a>'))
    editor.set(doc)

    editor.commands.insertDetails()
    const json = editor.view.state.doc.toJSON()

    // Should have a details node with summary and content wrapper
    expect(json.content).toHaveLength(1)
    expect(json.content[0].type).toBe('details')
    expect(json.content[0].content).toBeDefined()
    expect(json.content[0].content[0].type).toBe('detailsSummary')
    expect(json.content[0].content[1].type).toBe('detailsContent')
    expect(json.content[0].content[1].content[0].type).toBe('paragraph')
  })

  it('sets the current block selection as details', () => {
    editor.set(
      n.doc(
        n.paragraph('Before'),
        n.paragraph('<a>Wrapped'),
        n.paragraph('After'),
      ),
    )

    editor.commands.setDetails({ open: true })

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.paragraph('Before'),
        n.details(
          { open: true },
          n.detailsSummary(),
          n.detailsContent(
            n.paragraph('Wrapped'),
          ),
        ),
        n.paragraph('After'),
      ).toJSON(),
    )
  })

  it('toggles details wrapping on the current block', () => {
    editor.set(
      n.doc(
        n.paragraph('<a>Wrapped'),
      ),
    )

    editor.commands.toggleDetails()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.details(
          { open: false },
          n.detailsSummary(),
          n.detailsContent(
            n.paragraph('Wrapped'),
          ),
        ),
      ).toJSON(),
    )

    editor.commands.toggleDetails()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.paragraph('Wrapped'),
      ).toJSON(),
    )
  })

  it('unsets details explicitly', () => {
    editor.set(
      n.doc(
        n.details(
          { open: true },
          n.detailsSummary('Title'),
          n.detailsContent(
            n.paragraph('Body<a>'),
          ),
        ),
      ),
    )

    editor.commands.unsetDetails()

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.paragraph('Title'),
        n.paragraph('Body'),
      ).toJSON(),
    )
  })

  it('toggles the open attribute', () => {
    const doc = n.doc(
      n.details(
        { open: false },
        n.detailsSummary('Title'),
        n.detailsContent(
          n.paragraph('Content<a>'),
        ),
      ),
    )
    editor.set(doc)

    editor.commands.toggleDetailsOpen()
    let json = editor.view.state.doc.toJSON()
    expect(json.content[0].attrs.open).toBe(true)

    editor.commands.toggleDetailsOpen()
    json = editor.view.state.doc.toJSON()
    expect(json.content[0].attrs.open).toBe(false)
  })

  it('sets the open attribute explicitly', () => {
    const doc = n.doc(
      n.details(
        { open: false },
        n.detailsSummary('Title<a>'),
        n.detailsContent(
          n.paragraph('Content'),
        ),
      ),
    )
    editor.set(doc)

    editor.commands.setDetailsOpen({ open: true })
    const json = editor.view.state.doc.toJSON()
    expect(json.content[0].attrs.open).toBe(true)
  })

  it('unwraps details, converting summary to paragraph', () => {
    const doc = n.doc(
      n.details(
        { open: false },
        n.detailsSummary('Title'),
        n.detailsContent(
          n.paragraph('Content<a>'),
        ),
      ),
    )
    editor.set(doc)

    editor.commands.unwrapDetails()
    const json = editor.view.state.doc.toJSON()

    // Should have two paragraphs: former summary and former content
    expect(json.content).toHaveLength(2)
    expect(json.content[0].type).toBe('paragraph')
    expect(json.content[1].type).toBe('paragraph')
  })

  it('enforces detailsSummary as first child via createChecked', () => {
    const detailsType = schema.nodes.details
    const summaryType = schema.nodes.detailsSummary
    const contentType = schema.nodes.detailsContent
    const paragraph = n.paragraph()

    // Creating details without summary as first child should throw
    expect(() => {
      detailsType.createChecked(null, [paragraph, summaryType.create()])
    }).toThrow()

    expect(() => {
      detailsType.createChecked(null, [summaryType.create(), paragraph])
    }).toThrow()

    expect(() => {
      detailsType.createChecked(null, [summaryType.create(), contentType.createChecked(null, paragraph)])
    }).not.toThrow()
  })

  it('syncs native details toggle through the optional node view', () => {
    const extensionWithNodeView = union(extension, defineDetailsNodeView())
    const { editor: nodeViewEditor, n: nodeViewNodes } = setupTestFromExtension(extensionWithNodeView)

    nodeViewEditor.set(
      nodeViewNodes.doc(
        nodeViewNodes.details(
          { open: false },
          nodeViewNodes.detailsSummary('Title'),
          nodeViewNodes.detailsContent(
            nodeViewNodes.paragraph('Content'),
          ),
        ),
      ),
    )

    const details = nodeViewEditor.view.dom.querySelector('details')
    expect(details).not.toBeNull()

    details!.open = true
    details!.dispatchEvent(new Event('toggle'))

    expect(nodeViewEditor.view.state.doc.toJSON()).toEqual(
      nodeViewNodes.doc(
        nodeViewNodes.details(
          { open: true },
          nodeViewNodes.detailsSummary('Title'),
          nodeViewNodes.detailsContent(
            nodeViewNodes.paragraph('Content'),
          ),
        ),
      ).toJSON(),
    )
  })

  it('moves the cursor out of hidden details content when collapsing', () => {
    editor.set(
      n.doc(
        n.details(
          { open: true },
          n.detailsSummary('Title'),
          n.detailsContent(
            n.paragraph('Body<a>'),
          ),
        ),
      ),
    )

    editor.commands.setDetailsOpen({ open: false })

    const { selection } = editor.view.state
    expect(selection.empty).toBe(true)
    expect(selection.$from.parent.type.name).toBe('detailsSummary')
    expect(selection.$from.parentOffset).toBe(selection.$from.parent.content.size)
  })

  it('moves a hidden details content selection back to the summary', () => {
    editor.set(
      n.doc(
        n.details(
          { open: false },
          n.detailsSummary('Title'),
          n.detailsContent(
            n.paragraph('Body'),
          ),
        ),
      ),
    )

    const detailsPos = 0
    const summaryNode = editor.view.state.doc.nodeAt(detailsPos + 1)
    expect(summaryNode?.type.name).toBe('detailsSummary')

    const hiddenTextPos = detailsPos + 1 + summaryNode!.nodeSize + 2
    const tr = editor.view.state.tr.setSelection(
      TextSelection.create(editor.view.state.doc, hiddenTextPos),
    )
    editor.view.dispatch(tr)

    const { selection } = editor.view.state
    expect(selection.$from.parent.type.name).toBe('detailsSummary')
    expect(selection.$from.parentOffset).toBe(selection.$from.parent.content.size)
  })

  it('moves a hidden gap cursor selection back to the summary', () => {
    const gapExtension = union(
      defineDetails(),
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineHorizontalRule(),
      defineGapCursor(),
    )
    const { editor: gapEditor, n: gapNodes } = setupTestFromExtension(gapExtension)

    gapEditor.set(
      gapNodes.doc(
        gapNodes.details(
          { open: false },
          gapNodes.detailsSummary('Title'),
          gapNodes.detailsContent(
            gapNodes.horizontalRule(),
          ),
        ),
      ),
    )

    let hiddenGapPos: number | null = null
    for (let pos = 0; pos <= gapEditor.view.state.doc.content.size; pos++) {
      const $pos = gapEditor.view.state.doc.resolve(pos)

      for (let depth = $pos.depth; depth >= 1; depth--) {
        if (
          $pos.node(depth).type.name === 'detailsContent'
          && $pos.node(depth - 1).type.name === 'details'
          && !$pos.node(depth - 1).attrs.open
        ) {
          hiddenGapPos = pos
          break
        }
      }

      if (hiddenGapPos != null) break
    }

    expect(hiddenGapPos).not.toBeNull()

    gapEditor.view.dispatch(
      gapEditor.view.state.tr.setSelection(
        Selection.fromJSON(gapEditor.view.state.doc, { type: 'gapcursor', pos: hiddenGapPos! }),
      ),
    )

    const { selection } = gapEditor.view.state
    expect(selection.$from.parent.type.name).toBe('detailsSummary')
    expect(selection.$from.parentOffset).toBe(selection.$from.parent.content.size)
  })

  it('toggles details from summary marker clicks through the optional node view', () => {
    const extensionWithNodeView = union(extension, defineDetailsNodeView())
    const { editor: nodeViewEditor, n: nodeViewNodes } = setupTestFromExtension(extensionWithNodeView)

    nodeViewEditor.set(
      nodeViewNodes.doc(
        nodeViewNodes.details(
          { open: false },
          nodeViewNodes.detailsSummary('Title'),
          nodeViewNodes.detailsContent(
            nodeViewNodes.paragraph('Content'),
          ),
        ),
      ),
    )

    const summary = nodeViewEditor.view.dom.querySelector('summary') as HTMLElement | null
    expect(summary).not.toBeNull()

    summary!.getBoundingClientRect = () => ({
      x: 10,
      y: 10,
      width: 120,
      height: 24,
      top: 10,
      left: 10,
      right: 130,
      bottom: 34,
      toJSON: () => ({}),
    })

    summary!.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 16 }))

    expect(nodeViewEditor.view.state.doc.toJSON()).toEqual(
      nodeViewNodes.doc(
        nodeViewNodes.details(
          { open: true },
          nodeViewNodes.detailsSummary('Title'),
          nodeViewNodes.detailsContent(
            nodeViewNodes.paragraph('Content'),
          ),
        ),
      ).toJSON(),
    )
  })
})
