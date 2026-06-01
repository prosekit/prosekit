import { defineBaseKeymap, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { columnsPluginKey, getColumnsRuntimeState } from './columns-plugin.ts'
import type { ColumnDragState } from './columns-types.ts'
import { findParentColumn } from './columns-utils.ts'
import { defineColumns } from './columns.ts'

function setup(options?: Parameters<typeof defineColumns>[0]) {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineColumns(options),
  )
  return setupTestFromExtension(extension)
}

function setupWithKeymap(options?: Parameters<typeof defineColumns>[0]) {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineColumns(options),
    defineBaseKeymap(),
  )
  return setupTestFromExtension(extension)
}

describe('columns spec', () => {
  it('should be defined', () => {
    const extension = union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineColumns(),
    )

    const nodes = extension.schema?.spec.nodes.toObject() || {}
    const pickedNodes = {
      column: nodes.column,
      columns: nodes.columns,
    }

    expect(pickedNodes).toMatchInlineSnapshot(`
      {
        "column": {
          "attrs": {
            "width": {
              "default": null,
            },
          },
          "content": "block+",
          "isolating": true,
          "parseDOM": [
            {
              "getAttrs": [Function],
              "tag": "div.prosekit-column",
            },
          ],
          "toDOM": [Function],
        },
        "columns": {
          "attrs": {
            "gap": {
              "default": null,
            },
          },
          "content": "column+",
          "group": "block",
          "parseDOM": [
            {
              "getAttrs": [Function],
              "tag": "div.prosekit-columns",
            },
          ],
          "toDOM": [Function],
        },
      }
    `)
  })

  it('should render column width as a flex share', () => {
    const extension = union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineColumns(),
    )

    const columnType = extension.schema?.nodes.column
    expect(columnType).toBeTruthy()

    const dom = columnType!.spec.toDOM?.(columnType!.create({ width: 25 }))
    expect(dom).toEqual([
      'div',
      {
        class: 'prosekit-column',
        style: '--prosekit-column-width:25;',
      },
      0,
    ])
  })
})

describe('columns commands', () => {
  it('should insert two columns', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))
    editor.commands.insertColumns({ count: 2 })
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column(n.paragraph()),
          n.column(n.paragraph()),
        ),
      ).toJSON(),
    )
  })

  it('should apply default width and gap when inserting columns', () => {
    const { editor, n } = setup({
      defaultColumnWidth: 25,
      defaultGap: 16,
    })
    editor.set(n.doc(n.paragraph('<a>')))
    editor.commands.insertColumns({ count: 3 })
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          { gap: 16 },
          n.column({ width: 25 }, n.paragraph()),
          n.column({ width: 25 }, n.paragraph()),
          n.column({ width: 25 }, n.paragraph()),
        ),
      ).toJSON(),
    )
  })

  it('should add a column before the current one', () => {
    const { editor, n } = setup({
      defaultColumnWidth: 25,
    })
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('one')),
        n.column(n.paragraph('tw<a>o')),
      ),
    ))
    editor.commands.addColumnBefore()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column(n.paragraph('one')),
          n.column({ width: 25 }, n.paragraph()),
          n.column({ width: 25 }, n.paragraph('two')),
        ),
      ).toJSON(),
    )
  })

  it('should add a column after the current one', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('one<a>')),
        n.column(n.paragraph('two')),
      ),
    ))
    editor.commands.addColumnAfter()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column({ width: 25 }, n.paragraph('one')),
          n.column({ width: 25 }, n.paragraph()),
          n.column(n.paragraph('two')),
        ),
      ).toJSON(),
    )
  })

  it('should respect maxColumns when adding a column', () => {
    const { editor, n } = setup({
      maxColumns: 2,
    })
    const doc = n.doc(
      n.columns(
        n.column(n.paragraph('one<a>')),
        n.column(n.paragraph('two')),
      ),
    )
    editor.set(doc)
    expect(editor.commands.addColumnAfter.canExec()).toBe(false)
    expect(editor.commands.addColumnAfter()).toBe(false)
    expect(editor.view.state.doc.toJSON()).toEqual(doc.toJSON())
  })

  it('should allow adding columns by default without an explicit maxColumns limit', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('one<a>')),
        n.column(n.paragraph('two')),
      ),
    ))

    expect(editor.commands.addColumnAfter.canExec()).toBe(true)
    expect(editor.commands.addColumnAfter()).toBe(true)
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column({ width: 25 }, n.paragraph('one')),
          n.column({ width: 25 }, n.paragraph()),
          n.column(n.paragraph('two')),
        ),
      ).toJSON(),
    )
  })

  it('should unwrap when removing down to one column', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('left<a>')),
        n.column(n.paragraph('right')),
      ),
    ))
    editor.commands.removeColumn()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph('right')).toJSON(),
    )
  })

  it('should update column width and container gap', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('left<a>')),
        n.column(n.paragraph('right')),
      ),
    ))
    editor.commands.setColumnWidth(40)
    editor.commands.setColumnsGap(24)
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          { gap: 24 },
          n.column({ width: 40 }, n.paragraph('left')),
          n.column(n.paragraph('right')),
        ),
      ).toJSON(),
    )
  })

  it('should reject invalid column width values', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('left<a>')),
        n.column(n.paragraph('right')),
      ),
    ))

    expect(editor.commands.setColumnWidth(-1)).toBe(false)
    expect(editor.commands.setColumnWidth(Number.NaN)).toBe(false)

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column(n.paragraph('left')),
          n.column(n.paragraph('right')),
        ),
      ).toJSON(),
    )
  })

  it('should reject invalid column gap values', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('left<a>')),
        n.column(n.paragraph('right')),
      ),
    ))

    expect(editor.commands.setColumnsGap(-1)).toBe(false)
    expect(editor.commands.setColumnsGap(Number.POSITIVE_INFINITY)).toBe(false)

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column(n.paragraph('left')),
          n.column(n.paragraph('right')),
        ),
      ).toJSON(),
    )
  })

  it('should distribute columns to equal percentage widths', () => {
    const { editor, n } = setup({
      minColumnWidth: 160,
      defaultColumnWidth: 30,
    })
    editor.set(n.doc(
      n.columns(
        n.column({ width: 10 }, n.paragraph('o<a>ne')),
        n.column(n.paragraph('two')),
        n.column({ width: 50 }, n.paragraph('three')),
      ),
    ))
    editor.commands.distributeColumns()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column({ width: 33.333 }, n.paragraph('one')),
          n.column({ width: 33.333 }, n.paragraph('two')),
          n.column({ width: 33.334 }, n.paragraph('three')),
        ),
      ).toJSON(),
    )
  })

  it('should normalize columns to percentage widths', () => {
    const { editor, n } = setup({
      minColumnWidth: 160,
    })
    editor.set(n.doc(
      n.columns(
        n.column({ width: 25 }, n.paragraph('o<a>ne')),
        n.column(n.paragraph('two')),
      ),
    ))
    editor.commands.normalizeColumns()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(
        n.columns(
          n.column({ width: 33.333 }, n.paragraph('one')),
          n.column({ width: 66.667 }, n.paragraph('two')),
        ),
      ).toJSON(),
    )
  })
})

describe('columns keymap', () => {
  it('should not exit column after pressing Enter twice at end', async () => {
    const { editor, n } = setupWithKeymap()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('hello<a>')),
        n.column(n.paragraph('world')),
      ),
    ))

    await keyboard.press('Enter')
    await keyboard.press('Enter')

    // Cursor should still be inside a column
    const stillInColumn = findParentColumn(editor.state.selection.$from)
    expect(stillInColumn).toBeTruthy()

    // The columns container should still exist with 2 columns
    const firstNode = editor.view.state.doc.firstChild
    expect(firstNode?.type.name).toBe('columns')
    expect(firstNode?.childCount).toBe(2)
  })
})

describe('columns plugin state', () => {
  it('should resize columns by dragging a column boundary', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('left')),
        n.column(n.paragraph('right')),
      ),
    ))

    const found = findParentColumn(editor.state.doc.resolve(2))
    expect(found).toBeTruthy()

    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'setActiveHandle',
        pos: found!.pos,
      }),
    )

    const handle = editor.view.dom.querySelector('.prosekit-column-resize-handle')
    expect(handle).toBeInstanceOf(HTMLElement)

    const container = editor.view.dom.querySelector('.prosekit-columns')
    const columns = Array.from(editor.view.dom.querySelectorAll('.prosekit-column'))

    expect(container).toBeInstanceOf(HTMLElement)
    expect(columns).toHaveLength(2)

    const makeRect = (left: number, width: number): DOMRect => DOMRect.fromRect({ x: left, y: 0, width, height: 100 })

    Object.defineProperty(container as HTMLElement, 'getBoundingClientRect', {
      configurable: true,
      value: () => makeRect(0, 200),
    })
    Object.defineProperty(columns[0] as HTMLElement, 'getBoundingClientRect', {
      configurable: true,
      value: () => makeRect(0, 100),
    })
    Object.defineProperty(columns[1] as HTMLElement, 'getBoundingClientRect', {
      configurable: true,
      value: () => makeRect(100, 100),
    })

    const dragX = 100
    const dragY = 50
    ;(handle as HTMLElement).dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true,
        clientX: dragX,
        clientY: dragY,
      }),
    )

    expect(getColumnsRuntimeState(editor.state)?.dragging).not.toBeNull()

    window.dispatchEvent(
      new MouseEvent('mousemove', {
        bubbles: true,
        clientX: dragX + 40,
        clientY: dragY,
      }),
    )
    window.dispatchEvent(
      new MouseEvent('mouseup', {
        bubbles: true,
        clientX: dragX + 40,
        clientY: dragY,
      }),
    )

    const columnsNode = editor.view.state.doc.firstChild
    expect(columnsNode?.type.name).toBe('columns')

    const getNumericWidth = (index: number): number | undefined => {
      const width: unknown = columnsNode?.child(index).attrs.width
      return typeof width === 'number' ? width : undefined
    }

    const leftWidth = getNumericWidth(0)
    const rightWidth = getNumericWidth(1)

    expect(leftWidth).toBeTypeOf('number')
    expect(rightWidth).toBeTypeOf('number')
    expect(leftWidth).toBeGreaterThan(50)
    expect(rightWidth).toBeLessThan(50)
    expect(Number(((leftWidth as number) + (rightWidth as number)).toFixed(3))).toBe(100)
  })

  it('should remap active handle when the document changes', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('o<a>ne')),
        n.column(n.paragraph('two')),
      ),
    ))

    const found = findParentColumn(editor.state.selection.$from)
    expect(found).toBeTruthy()

    const columnPos = found!.pos
    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'setActiveHandle',
        pos: columnPos,
      }),
    )

    expect(getColumnsRuntimeState(editor.state)?.activeHandle).toBe(columnPos)

    // Insert text inside the column. The column node itself is still at the
    // same document position, so the handle shouldn't move.
    editor.view.dispatch(editor.state.tr.insertText('X', found!.start + 1))
    expect(getColumnsRuntimeState(editor.state)?.activeHandle).toBe(columnPos)
  })

  it('should clear active handle when the referenced column is deleted', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('o<a>ne')),
        n.column(n.paragraph('two')),
      ),
    ))

    const found = findParentColumn(editor.state.selection.$from)
    expect(found).toBeTruthy()

    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'setActiveHandle',
        pos: found!.pos,
      }),
    )

    expect(getColumnsRuntimeState(editor.state)?.activeHandle).toBe(found!.pos)

    editor.commands.removeColumn()
    expect(getColumnsRuntimeState(editor.state)?.activeHandle).toBeNull()
  })

  it('should remap active handle when columns shift', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.paragraph('before'),
      n.columns(
        n.column(n.paragraph('left<a>')),
        n.column(n.paragraph('right')),
      ),
    ))

    const found = findParentColumn(editor.state.selection.$from)
    expect(found).toBeTruthy()

    const columnPos = found!.pos
    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'setActiveHandle',
        pos: columnPos,
      }),
    )

    expect(getColumnsRuntimeState(editor.state)?.activeHandle).toBe(columnPos)

    // Insert text before the columns container. The column should shift.
    editor.view.dispatch(editor.state.tr.insertText('X', 1))
    expect(getColumnsRuntimeState(editor.state)?.activeHandle).toBe(columnPos + 1)
  })

  it('should set and clear dragging state', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('o<a>ne')),
        n.column(n.paragraph('two')),
      ),
    ))

    const dragState: ColumnDragState = {
      startX: 100,
      columns: [{ width: 250 }, { width: 250 }],
      totalWidth: 500,
      leftIndex: 0,
      minPercent: 4,
    }
    const found = findParentColumn(editor.state.selection.$from)
    expect(found).toBeTruthy()

    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'startDragging',
        pos: found!.pos,
        state: dragState,
      }),
    )

    expect(getColumnsRuntimeState(editor.state)?.dragging).toEqual(dragState)

    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'stopDragging',
      }),
    )

    expect(getColumnsRuntimeState(editor.state)?.dragging).toBeNull()
  })

  it('should cancel dragging when the document changes during drag', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('o<a>ne')),
        n.column(n.paragraph('two')),
      ),
    ))

    const found = findParentColumn(editor.state.selection.$from)
    expect(found).toBeTruthy()

    const dragState: ColumnDragState = {
      startX: 100,
      columns: [{ width: 250 }, { width: 250 }],
      totalWidth: 500,
      leftIndex: 0,
      minPercent: 4,
    }

    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'startDragging',
        pos: found!.pos,
        state: dragState,
      }),
    )

    expect(getColumnsRuntimeState(editor.state)?.dragging).toEqual(dragState)

    // A document change during a drag should cancel the drag.
    editor.view.dispatch(editor.state.tr.insertText('X', found!.start + 1))
    expect(getColumnsRuntimeState(editor.state)?.dragging).toBeNull()
  })

  it('should keep activeHandle during drag', () => {
    const { editor, n } = setup()
    editor.set(n.doc(
      n.columns(
        n.column(n.paragraph('o<a>ne')),
        n.column(n.paragraph('two')),
      ),
    ))

    const found = findParentColumn(editor.state.selection.$from)
    expect(found).toBeTruthy()

    const columnPos = found!.pos

    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'setActiveHandle',
        pos: columnPos,
      }),
    )

    const dragState: ColumnDragState = {
      startX: 100,
      columns: [{ width: 250 }, { width: 250 }],
      totalWidth: 500,
      leftIndex: 0,
      minPercent: 4,
    }

    editor.view.dispatch(
      editor.state.tr.setMeta(columnsPluginKey, {
        type: 'startDragging',
        pos: columnPos,
        state: dragState,
      }),
    )

    // activeHandle should be preserved during drag.
    expect(getColumnsRuntimeState(editor.state)?.activeHandle).toBe(columnPos)
    expect(getColumnsRuntimeState(editor.state)?.dragging).toEqual(dragState)
  })
})
