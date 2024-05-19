import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('text-color', ({ example }) => {
  test('text-color', async ({ page }) => {
    await page.goto(example)
    const editor = await waitForEditor(page)
    const menu = page.locator('prosekit-inline-popover')
    const btnPeru = menu.getByText('peru')
    const btnGold = menu.getByText('gold')
    const btnPlum = menu.getByText('plum')

    const checkColor = async (colors: {
      peru?: boolean
      gold?: boolean
      plum?: boolean
    }) => {
      for (const [color, visible] of Object.entries(colors)) {
        const span = editor.locator(`span[style='color: ${color};']`).filter({
          hasText: /^Select$/,
        })
        if (visible) {
          await expect(span).toBeVisible()
        } else {
          await expect(span).toBeHidden()
        }
      }
    }

    await editor.focus()

    await expect(menu).toBeHidden()

    // Select the first word "Select" and open the inline menu
    await page.keyboard.down('Shift')
    for (const _ of 'Select') {
      await page.keyboard.press('ArrowRight', { delay: 10 })
    }
    await page.keyboard.up('Shift')
    await expect(menu).toBeVisible()

    await btnPeru.click()
    await checkColor({ peru: true })

    await btnGold.click()
    await checkColor({ gold: true })

    await btnPlum.click()
    await checkColor({ plum: true })

    // Close the inline menu
    await expect(menu).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await expect(menu).toBeHidden()
  })
})
