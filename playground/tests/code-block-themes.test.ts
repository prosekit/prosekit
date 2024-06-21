import { expect, test } from '@playwright/test'

import { testStory } from './helper'

testStory('code-block-themes', () => {
  test('code-block-themes', async ({ page }) => {
    const span = page.locator('span', { hasText: `JavaScript` })

    await page.getByLabel('Theme').selectOption('nord')
    await expect(span).toHaveCSS('color', 'rgb(163, 190, 140)')

    await page.getByLabel('Theme').selectOption('min-dark')
    await expect(span).toHaveCSS('color', 'rgb(255, 171, 112)')

    await page.getByLabel('Theme').selectOption('github-dark')
    await expect(span).toHaveCSS('color', 'rgb(158, 203, 255)')
  })
})
