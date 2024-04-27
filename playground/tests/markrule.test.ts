import { expect, test } from '@playwright/test'

import { getExamples, waitForEditor } from './helper'

test.describe('markRule', () => {
  for (const example of getExamples('mark-rule')) {
    test(example, async ({ page }) => {
      await page.goto(example)
      const editor = await waitForEditor(page)

      const getLinkContent = async () => {
        const locators = await editor.locator('a').all()
        return await Promise.all(
          locators.map(async (locator) => {
            return await locator.innerText()
          }),
        )
      }

      await editor.pressSequentially('Fix ')
      expect(await getLinkContent()).toEqual([])

      await editor.pressSequentially('#')
      expect(await getLinkContent()).toEqual([])

      await editor.pressSequentially('1')
      expect(await getLinkContent()).toEqual(['#1'])

      await editor.pressSequentially('2')
      expect(await getLinkContent()).toEqual(['#12'])

      await editor.pressSequentially(' and ')
      expect(await getLinkContent()).toEqual(['#12'])

      await editor.pressSequentially('#')
      expect(await getLinkContent()).toEqual(['#12'])

      await editor.pressSequentially('3')
      expect(await getLinkContent()).toEqual(['#12', '#3'])

      await editor.pressSequentially('4')
      expect(await getLinkContent()).toEqual(['#12', '#34'])

      await editor.pressSequentially('.')
      expect(await getLinkContent()).toEqual(['#12', '#34'])

      await editor.press('Backspace')
      expect(await getLinkContent()).toEqual(['#12', '#34'])

      await editor.press('Backspace')
      expect(await getLinkContent()).toEqual(['#12', '#3'])

      await editor.pressSequentially('5')
      expect(await getLinkContent()).toEqual(['#12', '#35'])
    })
  }
})
