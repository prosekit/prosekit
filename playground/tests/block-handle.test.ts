import {
  expect,
  test,
  type Locator,
} from '@playwright/test'

import {
  emptyEditor,
  getBoundingBox,
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

      await block.hover({ timeout: 4000 })
      await expect(blockHandle).toHaveAttribute('data-state', 'open')

      await waitForAnimationEnd(blockHandleDraggable)

      const box = await getBoundingBox(blockHandleDraggable)

      await editor.hover({ position: { x: 0, y: 0 }, timeout: 4000 })
      await expect(blockHandle).toHaveAttribute('data-state', 'closed')

      await waitForAnimationEnd(blockHandleDraggable)

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
    const h1 = editor.locator('h1', { hasText: 'Foo' })
    const p = editor.locator('p', { hasText: 'Foo' })

    // Insert a heading
    await editor.pressSequentially('# Foo')

    await expect(h1).toBeVisible()
    await expect(p).not.toBeVisible()

    await h1.hover({ timeout: 4000 })
    await expect(blockHandle).toHaveAttribute('data-state', 'open')
    const box1 = (await blockHandle.boundingBox())!

    // Turn the heading into a paragraph
    await editor.press('ArrowLeft')
    await editor.press('ArrowLeft')
    await editor.press('ArrowLeft')
    await editor.press('Backspace')

    await expect(h1).not.toBeVisible()
    await expect(p).toBeVisible()
    const box2 = (await blockHandle.boundingBox())!

    expect(box1).toBeTruthy()
    expect(box2).toBeTruthy()

    const message = `The block handle should not move when changing the hover node type. `
      + `First position: (${Math.round(box1.x)}, ${Math.round(box1.y)}). `
      + `Second position: (${Math.round(box2.x)}, ${Math.round(box2.y)}).`
    expect(Math.abs(box1.x - box2.x), message).toBeLessThan(10)
    expect(Math.abs(box1.y - box2.y), message).toBeLessThan(10)
  })
})
