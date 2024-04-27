import { expect, test } from '@playwright/test'

import { getExamples, waitForEditor } from './helper'

test.describe('markRule', () => {
  for (const example of getExamples('mark-rule')) {
    test(example, async ({ page }) => {
      await page.goto(example)
      const editor = await waitForEditor(page)

      await editor.pressSequentially('Fix ')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially('#')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially('1')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially('2')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially(' and ')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially('#')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially('3')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially('4')
      expect(await editor.innerHTML()).toMatchSnapshot()

      await editor.pressSequentially('.')
      expect(await editor.innerHTML()).toMatchSnapshot()
    })
  }
})
