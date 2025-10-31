import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
  type Locator,
} from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToHaveCount,
  getBoundingBox,
  hover,
  testStory,
  testStoryConsistency,
  unhover,
  waitForAnimationEnd,
  waitForEditor,
} from './helpers'

testStoryConsistency('full')

testStory(['full'], () => {
  it('show block handle on hover', async () => {
    const editor = await waitForEditor()
    await emptyEditor()

    const blockHandle = page.locate('prosekit-block-handle-popover')
    const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

    // Hover over a block and measure the position of the block handle
    const measure = async (block: Locator) => {
      await expect.element(block).toBeVisible()
      await expectLocatorToHaveCount(blockHandle, 1)
      await hover(block)
      await expectBlockHandleToOpen()
      const box = getBoundingBox(blockHandleDraggable)
      await closeBlockHandle()
      return box
    }

    // Insert paragraphs
    await userEvent.type(editor, 'Paragraph 1')
    await userEvent.keyboard('{Enter}')
    await userEvent.type(editor, 'Paragraph 2')
    await userEvent.keyboard('{Enter}')
    await userEvent.type(editor, 'Paragraph 3')
    await userEvent.keyboard('{Enter}')

    // Insert a code block
    await userEvent.type(editor, '```javascript')
    await userEvent.keyboard('{Enter}')
    await userEvent.type(editor, 'code block')
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{Enter}')

    // Measure the position of the block handle
    const p1 = editor.locate('p', { hasText: 'Paragraph 1' })
    const p2 = editor.locate('p', { hasText: 'Paragraph 2' })
    const p3 = editor.locate('p', { hasText: 'Paragraph 3' })
    const pre = editor.locate('pre', { hasText: 'code block' })

    const boxHandleP1 = await measure(p1)
    const boxHandleP2 = await measure(p2)
    const boxHandleP3 = await measure(p3)
    const boxHandlePre = await measure(pre)
    const boxEditor = getBoundingBox(editor)
    const boxPre = getBoundingBox(pre)

    // Expect the block handle to be inside the editor
    expect(boxEditor.x).toBeLessThan(boxHandleP1.x)
    expect(boxEditor.y).toBeLessThan(boxHandleP1.y)
    expect(boxEditor.x).toBeLessThan(boxHandleP2.x)
    expect(boxEditor.y).toBeLessThan(boxHandleP2.y)
    expect(boxEditor.x).toBeLessThan(boxHandleP3.x)
    expect(boxEditor.y).toBeLessThan(boxHandleP3.y)
    expect(boxEditor.x).toBeLessThan(boxHandlePre.x)
    expect(boxEditor.y).toBeLessThan(boxHandlePre.y)

    // Expect the block handle moves
    expect(boxHandleP1.y).toBeLessThan(boxHandleP2.y)
    expect(boxHandleP1.x).toBeCloseTo(boxHandleP2.x, 0)

    // Expect the block handle aligns with the code block
    expect(boxPre.y).toBeCloseTo(boxHandlePre.y, 0)
    expect(boxPre.x).toBeGreaterThan(boxHandlePre.x)
  })

  it(`position the block handle correctly when changing the hover node type`, async () => {
    const editor = await waitForEditor()
    await emptyEditor()

    const blockHandle = page.locate('prosekit-block-handle-popover')
    const h1 = editor.locate('h1')
    const p = editor.locate('p')

    const check = async (options: { h1: boolean; p: boolean; text: string }) => {
      await expect.element(editor).toHaveTextContent(options.text)
      await expectLocatorToHaveCount(h1, options.h1 ? 1 : 0)
      await expectLocatorToHaveCount(p, options.p ? 1 : 0)
    }

    // Insert a heading
    await userEvent.type(editor, '# Foo')
    await check({ h1: true, p: false, text: 'Foo' })

    await hover(h1)
    await expectBlockHandleToOpen()
    const box1 = getBoundingBox(blockHandle)
    expect(box1.width).toBeGreaterThan(0)

    // Turn the heading into a paragraph
    await check({ h1: true, p: false, text: 'Foo' })
    await userEvent.keyboard('{Backspace}')
    await check({ h1: true, p: false, text: 'Fo' })
    await userEvent.keyboard('{Backspace}')
    await check({ h1: true, p: false, text: 'F' })
    await userEvent.keyboard('{Backspace}')
    await check({ h1: true, p: false, text: '' })
    await userEvent.keyboard('{Backspace}')
    await check({ h1: false, p: true, text: '' })

    const box2 = getBoundingBox(blockHandle)
    expect(box2.width).toBeGreaterThan(0)

    const message = `The block handle should not move when changing the hover node type. `
      + `First position: (${Math.round(box1.x)}, ${Math.round(box1.y)}). `
      + `Second position: (${Math.round(box2.x)}, ${Math.round(box2.y)}).`
    expect(Math.abs(box1.x - box2.x), message).toBeLessThan(10)
    expect(Math.abs(box1.y - box2.y), message).toBeLessThan(10)
  })

  it(`position the block handle when hovering over a list node with multiple paragraphs`, async () => {
    const editor = await waitForEditor()
    await emptyEditor()
    const blockHandle = page.locate('prosekit-block-handle-popover')
    const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

    // Insert a list node with two paragraphs
    await userEvent.type(editor, '- First paragraph')
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{Tab}')
    await userEvent.keyboard('{Backspace}')
    await userEvent.type(editor, 'Second paragraph')

    const listNode = editor.locate('.prosemirror-flat-list')
    await expectLocatorToHaveCount(listNode, 1)
    const p1 = listNode.locate('p', { hasText: 'First paragraph' })
    const p2 = listNode.locate('p', { hasText: 'Second paragraph' })
    await expectLocatorToHaveCount(p1, 1)
    await expectLocatorToHaveCount(p2, 1)

    await hover(p1)
    await expectBlockHandleToOpen()
    const box1 = getBoundingBox(blockHandle)
    expect(box1.width).toBeGreaterThan(0)

    await hover(p2)
    await expectBlockHandleToOpen()
    const box2 = getBoundingBox(blockHandle)
    expect(box2.width).toBeGreaterThan(0)

    // box1 should be positioned above box2
    expect(box1.y).toBeLessThan(box2.y)

    // box1 should be positioned to the left of box2
    expect(box1.x).toBeLessThan(box2.x)

    await hover(p1)
    await expectBlockHandleToOpen()
    await blockHandleDraggable.click()

    await expect.element(listNode).toHaveClass(/ProseMirror-selectednode/)
    await expect.element(p1).not.toHaveClass(/ProseMirror-selectednode/)
    await expect.element(p2).not.toHaveClass(/ProseMirror-selectednode/)

    await closeBlockHandle()
  })
})

async function expectBlockHandleToOpen() {
  const blockHandle = page.locate('prosekit-block-handle-popover')
  const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

  await expect.poll(() => blockHandle.query()?.getAttribute('data-state')).toBe('open')
  await waitForAnimationEnd(blockHandle)
  await waitForAnimationEnd(blockHandleDraggable)
}

async function expectBlockHandleToClose() {
  const blockHandle = page.locate('prosekit-block-handle-popover')
  const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

  await expect.poll(() => blockHandle.query()?.getAttribute('data-state')).toBe('closed')
  await waitForAnimationEnd(blockHandle)
  await waitForAnimationEnd(blockHandleDraggable)
}

async function closeBlockHandle() {
  await unhover()
  await expectBlockHandleToClose()
}
