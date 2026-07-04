import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page, userEvent, type Locator } from 'vitest/browser'

import {
  expectLocatorToHaveCount,
  getBoundingBox,
  hover,
  testStory,
  testStoryConsistency,
  unhover,
  waitForAnimationEnd,
  waitForEditor,
} from './helpers'

testStoryConsistency('block-handle')

testStory({ story: 'block-handle', emptyContent: true }, () => {
  it('has enough space for an empty editor', async () => {
    const editor = await waitForEditor()
    const box = await getBoundingBox(editor)
    expect(box.width).toBeGreaterThan(300)
    expect(box.height).toBeGreaterThan(300)
  })

  it('show block handle on hover', async () => {
    const editor = await waitForEditor()
    await editor.click()
    await unhover()

    const blockHandlePositioner = page.locate('prosekit-block-handle-positioner')
    const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

    // Hover over a block and measure the position of the block handle
    const measure = async (block: Locator) => {
      await expect.element(block).toBeVisible()
      await expectLocatorToHaveCount(blockHandlePositioner, 1)
      await hover(block)
      await expectBlockHandleToOpen()
      const box = await getBoundingBox(blockHandleDraggable)
      await closeBlockHandle()
      return box
    }

    // Insert paragraphs
    await userEvent.type(editor, 'Paragraph 1')
    await keyboard.press('Enter')
    await userEvent.type(editor, 'Paragraph 2')
    await keyboard.press('Enter')
    await userEvent.type(editor, 'Paragraph 3')
    await keyboard.press('Enter')

    // Insert a code block
    await userEvent.type(editor, '```javascript')
    await keyboard.press('Enter')
    await userEvent.type(editor, 'code block')
    await keyboard.press('Enter')
    await keyboard.press('Enter')
    await keyboard.press('Enter')

    // Measure the position of the block handle
    const p1 = editor.locate('p', { hasText: 'Paragraph 1' })
    const p2 = editor.locate('p', { hasText: 'Paragraph 2' })
    const p3 = editor.locate('p', { hasText: 'Paragraph 3' })
    const pre = editor.locate('pre', { hasText: 'code block' })

    const boxHandleP1 = await measure(p1)
    const boxHandleP2 = await measure(p2)
    const boxHandleP3 = await measure(p3)
    const boxHandlePre = await measure(pre)
    const boxEditor = await getBoundingBox(editor)
    const boxPre = await getBoundingBox(pre)

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

  it(`position the block handle when hovering over a list node with multiple paragraphs`, async () => {
    const editor = await waitForEditor()
    await editor.click()
    await unhover()

    const blockHandlePositioner = page.locate('prosekit-block-handle-positioner')
    const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

    // Insert a list node with two paragraphs
    await userEvent.type(editor, '- First paragraph')
    await keyboard.press('Enter')
    await keyboard.press('Tab')
    await keyboard.press('Backspace')
    await userEvent.type(editor, 'Second paragraph')

    const listNode = editor.locate('.prosemirror-flat-list')
    await expectLocatorToHaveCount(listNode, 1)
    const p1 = listNode.locate('p', { hasText: 'First paragraph' })
    const p2 = listNode.locate('p', { hasText: 'Second paragraph' })
    await expectLocatorToHaveCount(p1, 1)
    await expectLocatorToHaveCount(p2, 1)

    await hover(p1)
    await expectBlockHandleToOpen()
    const box1 = await getBoundingBox(blockHandlePositioner)
    expect(box1.width).toBeGreaterThan(0)

    await hover(p2)
    await expectBlockHandleToOpen()
    const box2 = await getBoundingBox(blockHandlePositioner)
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
  const blockHandlePositioner = page.locate('prosekit-block-handle-positioner')
  const blockHandlePopup = page.locate('prosekit-block-handle-popup')
  const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

  await expect.element(blockHandlePopup).toHaveAttribute('data-state', 'open')
  await Promise.all([
    waitForAnimationEnd(blockHandlePositioner),
    waitForAnimationEnd(blockHandlePopup),
    waitForAnimationEnd(blockHandleDraggable),
  ])
}

async function expectBlockHandleToClose() {
  const blockHandlePositioner = page.locate('prosekit-block-handle-positioner')
  const blockHandlePopup = page.locate('prosekit-block-handle-popup')
  const blockHandleDraggable = page.locate('prosekit-block-handle-draggable')

  await expect.element(blockHandlePopup).toHaveAttribute('data-state', 'closed')
  await Promise.all([
    waitForAnimationEnd(blockHandlePositioner),
    waitForAnimationEnd(blockHandlePopup),
    waitForAnimationEnd(blockHandleDraggable),
  ])
}

async function closeBlockHandle() {
  await unhover()
  await expectBlockHandleToClose()
}
