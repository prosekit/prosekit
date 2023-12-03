import { test, expect } from '@playwright/test'

import { getExamples } from './helper'

test.describe('heading', () => {
  for (const { url, name } of getExamples('heading'))
    test(name, async ({ page }) => {
      await page.goto(url)

      await page.locator('.ProseMirror').click()

      expect(await page.locator('h1').isVisible()).toBe(false)

      await page.keyboard.press('#')
      await page.keyboard.press(' ')
      await page.keyboard.type('Heading Level 1')

      expect(await page.locator('h1').isVisible()).toBe(true)
      expect(await page.locator('h1').textContent()).toEqual('Heading Level 1')

      await page.keyboard.press('Enter')
      await page.keyboard.type('## Heading Level 2')

      expect(await page.locator('h2').isVisible()).toBe(true)
      expect(await page.locator('h2').textContent()).toEqual('Heading Level 2')
    })
})
