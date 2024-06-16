import { test } from '@playwright/test'

import { testStory } from './helper'
import { testInlineMenu } from './inline-menu'

testStory('inline-menu', () => {
  test('inline-menu', async ({ page }) => {
    await testInlineMenu(page)
  })
})
