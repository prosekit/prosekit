import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('save-html', () => {
  test('save-html', async ({ page }) => {
    const editor = await waitForEditor(page)

    const saveButtonEnabled = page.getByRole('button', {
      name: 'Save',
      exact: true,
    })
    const saveButtonDisabled = page.getByRole('button', {
      name: 'No changes to save',
      exact: true,
    })
    const loadButton = page.getByRole('button', {
      name: 'Load',
      exact: true,
    })
    const pre = page.locator('ul').locator('li').locator('pre')
    const expectSaveButtonEnabled = async () => {
      await expect(saveButtonEnabled).toBeVisible()
      await expect(saveButtonDisabled).toBeHidden()
    }
    const expectSaveButtonDisabled = async () => {
      await expect(saveButtonDisabled).toBeVisible()
      await expect(saveButtonEnabled).toBeHidden()
    }
    const clickSaveButton = async () => {
      await expect(saveButtonEnabled).toBeVisible()
      await saveButtonEnabled.click()
    }

    // Initial state
    await expectSaveButtonDisabled()

    // Type something
    await editor.focus()
    await editor.press('ControlOrMeta+b')
    await editor.pressSequentially('Foo')
    await expectSaveButtonEnabled()
    expect(await editor.innerText()).toBe('Foo')

    // Save content
    await expect(loadButton).toHaveCount(0)
    await clickSaveButton()
    await expect(loadButton).toHaveCount(1)
    expect(await pre.nth(0).innerText()).toContain(`<strong>Foo</strong>`)

    // Type something
    await editor.focus()
    await editor.pressSequentially('Bar')
    await expectSaveButtonEnabled()
    expect(await editor.innerText()).toBe('FooBar')

    // Save content
    await expect(loadButton).toHaveCount(1)
    await clickSaveButton()
    await expect(loadButton).toHaveCount(2)
    expect(await pre.nth(0).innerText()).toContain(`<strong>Foo</strong>`)
    expect(await pre.nth(1).innerText()).toContain(`<strong>FooBar</strong>`)

    // Load content
    expect(await editor.innerText()).toBe('FooBar')
    await loadButton.nth(0).click()
    expect(await editor.innerText()).toBe('Foo')
    await loadButton.nth(1).click()
    expect(await editor.innerText()).toBe('FooBar')
    await loadButton.nth(0).click()
    expect(await editor.innerText()).toBe('Foo')

    // Type something
    await editor.focus()
    await editor.pressSequentially('Baz')
    await expectSaveButtonEnabled()
    expect(await editor.innerText()).toBe('BazFoo')
  })
})
