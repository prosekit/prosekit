import {
  expect,
  test,
  type Locator,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory(['full'], () => {
  test('show block handle on hover', async ({ page }) => {
    const editor = await waitForEditor(page)
    await emptyEditor(page)

    const blockHandle = page.locator('prosekit-block-handle-popover')

    await editor.pressSequentially('Paragraph 1')
    await editor.press('Enter')
    await editor.pressSequentially('Paragraph 2')
    await editor.press('Enter')
    await editor.pressSequentially('Paragraph 3')

    const boxes: { x: number; y: number }[] = []

    const measure = async (p: Locator) => {
      await expect(p).toBeVisible()
      await expect(blockHandle).toBeAttached()

      await p.hover({ timeout: 4000 })
      await expect(blockHandle).toHaveAttribute('data-state', 'open')

      const box = await blockHandle.boundingBox()
      boxes.push(box || { x: 0, y: 0, width: 0, height: 0 })

      await editor.hover({ position: { x: 0, y: 0 }, timeout: 4000 })
      await expect(blockHandle).toHaveAttribute('data-state', 'closed')
    }

    await measure(editor.locator('p', { hasText: 'Paragraph 1' }))
    await measure(editor.locator('p', { hasText: 'Paragraph 2' }))
    await measure(editor.locator('p', { hasText: 'Paragraph 3' }))

    const editorBox = (await editor.boundingBox()) || { x: 0, y: 0 }
    expect(editorBox.y).toBeLessThan(boxes[0].y)
    expect(editorBox.x).toBeLessThan(boxes[0].x)
    expect(boxes[0].y).toBeLessThan(boxes[1].y)
    expect(boxes[1].y).toBeLessThan(boxes[2].y)
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
