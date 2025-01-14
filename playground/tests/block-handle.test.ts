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

    // Hover over a block and measure the position of the block handle
    const measure = async (block: Locator) => {
      await expect(block).toBeVisible()
      await expect(blockHandle).toBeAttached()

      await block.hover({ timeout: 4000 })
      await expect(blockHandle).toHaveAttribute('data-state', 'open')

      const box = await getBoundingBox(blockHandle)

      await editor.hover({ position: { x: 0, y: 0 }, timeout: 4000 })
      await expect(blockHandle).toHaveAttribute('data-state', 'closed')

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
    const boxP1 = await measure(editor.locator('p', { hasText: 'Paragraph 1' }))
    const boxP2 = await measure(editor.locator('p', { hasText: 'Paragraph 2' }))
    const boxP3 = await measure(editor.locator('p', { hasText: 'Paragraph 3' }))
    const boxPre = await measure(editor.locator('pre', { hasText: 'code block' }))
    const boxEditor = await getBoundingBox(editor)

    // Expect the block handle to be inside the editor
    expect(boxEditor.x).toBeLessThan(boxP1.x)
    expect(boxEditor.y).toBeLessThan(boxP1.y)
    expect(boxEditor.x).toBeLessThan(boxP2.x)
    expect(boxEditor.y).toBeLessThan(boxP2.y)
    expect(boxEditor.x).toBeLessThan(boxP3.x)
    expect(boxEditor.y).toBeLessThan(boxP3.y)
    expect(boxEditor.x).toBeLessThan(boxPre.x)
    expect(boxEditor.y).toBeLessThan(boxPre.y)

    // Expect the block handle moves
    expect(boxP1.y).toBeLessThan(boxP2.y)
    expect(boxP1.x).toBeCloseTo(boxP2.x, 0)
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

async function getBoundingBox(locator: Locator) {
  return (await locator.boundingBox()) || { x: 0, y: 0, width: 0, height: 0 }
}
