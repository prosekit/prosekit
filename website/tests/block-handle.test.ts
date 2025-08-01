import {
  expect,
  test,
  type Locator,
  type Page,
} from '@playwright/test'

import {
  emptyEditor,
  getBoundingBox,
  hover,
  testStory,
  waitForAnimationEnd,
  waitForEditor,
} from './helper'

testStory(['full'], () => {
  test('show block handle on hover', async ({ page }) => {
    const editor = await waitForEditor(page)
    await emptyEditor(page)

    const blockHandle = page.locator('prosekit-block-handle-popover')
    const blockHandleDraggable = page.locator('prosekit-block-handle-draggable')

    // Hover over a block and measure the position of the block handle
    const measure = async (block: Locator) => {
      await expect(block).toBeVisible()
      await expect(blockHandle).toBeAttached()

      await hover(block)
      await expectBlockHandleToOpen(page)

      const box = await getBoundingBox(blockHandleDraggable)

      await closeBlockHandle(page)
      await expectBlockHandleToClose(page)

      return box
    }

    // Insert paragraphs
    await editor.pressSequentially('Paragraph 1')
    await editor.press('Enter')
    await editor.pressSequentially('Paragraph 2')
    await editor.press('Enter')
    await editor.pressSequentially('Paragraph 3')
    await editor.press('Enter')

    // Insert a code block
    await editor.pressSequentially('```javascript')
    await editor.press('Enter')
    await editor.pressSequentially('code block')
    await editor.press('Enter')
    await editor.press('Enter')
    await editor.press('Enter')

    // Measure the position of the block handle
    const p1 = editor.locator('p', { hasText: 'Paragraph 1' })
    const p2 = editor.locator('p', { hasText: 'Paragraph 2' })
    const p3 = editor.locator('p', { hasText: 'Paragraph 3' })
    const pre = editor.locator('pre', { hasText: 'code block' })

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

  test(`position the block handle correctly when changing the hover node type`, async ({ page }) => {
    const editor = await waitForEditor(page)
    await emptyEditor(page)

    const blockHandle = page.locator('prosekit-block-handle-popover')
    const h1 = editor.locator('h1')
    const p = editor.locator('p')

    const check = async (options: { h1: boolean; p: boolean; text: string }) => {
      await expect(editor).toHaveText(options.text)
      await expect(h1).toBeVisible({ visible: options.h1 })
      await expect(p).toBeVisible({ visible: options.p })
    }

    // Insert a heading
    await editor.pressSequentially('# Foo')
    await check({ h1: true, p: false, text: 'Foo' })

    await hover(h1)
    await expectBlockHandleToOpen(page)
    const box1 = (await blockHandle.boundingBox())!

    // Turn the heading into a paragraph
    await check({ h1: true, p: false, text: 'Foo' })
    await editor.press('Backspace')
    await check({ h1: true, p: false, text: 'Fo' })
    await editor.press('Backspace')
    await check({ h1: true, p: false, text: 'F' })
    await editor.press('Backspace')
    await check({ h1: true, p: false, text: '' })
    await editor.press('Backspace')
    await check({ h1: false, p: true, text: '' })

    const box2 = (await blockHandle.boundingBox())!

    expect(box1).toBeTruthy()
    expect(box2).toBeTruthy()

    const message = `The block handle should not move when changing the hover node type. `
      + `First position: (${Math.round(box1.x)}, ${Math.round(box1.y)}). `
      + `Second position: (${Math.round(box2.x)}, ${Math.round(box2.y)}).`
    expect(Math.abs(box1.x - box2.x), message).toBeLessThan(10)
    expect(Math.abs(box1.y - box2.y), message).toBeLessThan(10)
  })

  test(`position the block handle when hovering over a list node with multiple paragraphs`, async ({ page }) => {
    const editor = await waitForEditor(page)
    await emptyEditor(page)
    const blockHandle = page.locator('prosekit-block-handle-popover')
    const blockHandleDraggable = page.locator('prosekit-block-handle-draggable')

    await test.step('insert a list node with two paragraphs', async () => {
      await editor.pressSequentially('- First paragraph')
      await editor.press('Enter')
      await editor.press('Tab')
      await editor.press('Backspace')
      await editor.pressSequentially('Second paragraph')
    })

    const [listNode, p1, p2] = await test.step('check the DOM structure', async () => {
      const listNode = editor.locator('.prosemirror-flat-list')
      await expect(listNode).toHaveCount(1)
      const p1 = listNode.locator('p', { hasText: 'First paragraph' })
      const p2 = listNode.locator('p', { hasText: 'Second paragraph' })
      await expect(p1).toHaveCount(1)
      await expect(p2).toHaveCount(1)
      return [listNode, p1, p2]
    })

    const box1 = await test.step('hover over the first paragraph', async () => {
      await hover(p1)
      await expectBlockHandleToOpen(page)
      const box1 = await blockHandle.boundingBox()
      expect(box1).toBeTruthy()
      return box1!
    })

    const box2 = await test.step('hover over the second paragraph', async () => {
      await hover(p2)
      await expectBlockHandleToOpen(page)
      const box2 = await blockHandle.boundingBox()
      expect(box2).toBeTruthy()
      return box2!
    })

    // box1 should be positioned above box2
    expect(box1.y).toBeLessThan(box2.y)

    // box1 should be positioned to the left of box2
    expect(box1.x).toBeLessThan(box2.x)

    await test.step('hover over the first paragraph', async () => {
      await hover(p1)
      await expectBlockHandleToOpen(page)
      await blockHandleDraggable.click()
    })

    await test.step('expect the list node to be selected', async () => {
      await expect(listNode).toHaveClass(/ProseMirror-selectednode/)
      await expect(p1).not.toHaveClass(/ProseMirror-selectednode/)
      await expect(p2).not.toHaveClass(/ProseMirror-selectednode/)
    })

    await test.step('close the block handle', async () => {
      await closeBlockHandle(page)
      await expectBlockHandleToClose(page)
    })

    await test.step('hover over the second paragraph', async () => {
      await hover(p2)
      await expectBlockHandleToOpen(page)
      await blockHandleDraggable.click({ timeout: 3000 })
    })

    await test.step('expect the list node to be not selected', async () => {
      await expect(listNode).not.toHaveClass(/ProseMirror-selectednode/)
      await expect(p1).not.toHaveClass(/ProseMirror-selectednode/)
      await expect(p2).toHaveClass(/ProseMirror-selectednode/)
    })
  })
})

async function expectBlockHandleToOpen(page: Page) {
  const blockHandle = page.locator('prosekit-block-handle-popover')
  const blockHandleDraggable = page.locator('prosekit-block-handle-draggable')

  await expect(blockHandle).toHaveAttribute('data-state', 'open')
  await waitForAnimationEnd(blockHandle)
  await waitForAnimationEnd(blockHandleDraggable)
}

async function expectBlockHandleToClose(page: Page) {
  const blockHandle = page.locator('prosekit-block-handle-popover')
  const blockHandleDraggable = page.locator('prosekit-block-handle-draggable')

  await expect(blockHandle).toHaveAttribute('data-state', 'closed')
  await waitForAnimationEnd(blockHandle)
  await waitForAnimationEnd(blockHandleDraggable)
}

async function closeBlockHandle(page: Page) {
  await page.mouse.move(0, 0, { steps: 100 })
  await expectBlockHandleToClose(page)
}
