import {
  expect,
  test,
} from '@playwright/test'

import {
  getSelectedText,
  testStory,
  waitForEditor,
} from './helper'

testStory('text-color', () => {
  test('change and clear text color via inline menu', async ({ page }) => {
    const editor = await waitForEditor(page)

    // Programmatically select the exact word "some" inside its span for stability
    const selectWord = async (word: string) => {
      await page.evaluate((w) => {
        const root = document.querySelector('div.ProseMirror')!
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        let textNode: Text | null = null
        while (walker.nextNode()) {
          const n = walker.currentNode as Text
          if (n.nodeValue?.trim() === w) {
            textNode = n
            break
          }
        }
        if (!textNode) return
        const range = document.createRange()
        range.setStart(textNode, 0)
        range.setEnd(textNode, textNode.nodeValue!.length)
        const sel = window.getSelection()!
        sel.removeAllRanges()
        sel.addRange(range)
      }, word)
    }

    await selectWord('some')
    expect(await getSelectedText(page)).toBe('some')

    // Inline color menu should appear; change to blue
    const blueBtn = page.getByRole('button', { name: 'blue' })
    await expect(blueBtn).toBeVisible()
    await blueBtn.click()

    // Assert the selected text now renders with blue color
    const someSpan = editor.locator('span', { hasText: 'some' }).first()
    await expect(someSpan).toBeVisible()
    await expect(someSpan).toHaveCSS('color', 'rgb(59, 130, 246)')

    // Select again and clear color using "default"
    await selectWord('some')
    expect(await getSelectedText(page)).toBe('some')
    const defaultBtn = page.getByRole('button', { name: 'default' })
    await expect(defaultBtn).toBeVisible()
    await defaultBtn.click()

    // Expect no colored span wraps the word "some"
    await expect(editor.locator('span[style*="color:"]', { hasText: 'some' })).toHaveCount(0)
  })
})
