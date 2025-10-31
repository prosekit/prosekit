import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  expectLocatorToHaveCount,
  expectLocatorToNotExist,
  focusEditor,
  MOD_KEY,
  moveSelection,
  testStory,
  waitForEditor,
} from './helpers'

testStoryConsistency('save-html')

testStory('save-html', () => {
  it('save-html', async () => {
    const editor = await waitForEditor()

    const saveButtonEnabled = page.getByRole('button', { name: 'Save', exact: true })
    const saveButtonDisabled = page.getByRole('button', { name: 'No changes to save', exact: true })
    const loadButton = page.getByRole('button', { name: 'Load', exact: true })
    const savedContent = page.locate('ul').locate('li').locate('pre')

    const expectSaveButtonEnabled = async () => {
      await expect.element(saveButtonEnabled).toBeVisible()
      await expectLocatorToNotExist(saveButtonDisabled)
    }

    const expectSaveButtonDisabled = async () => {
      await expect.element(saveButtonDisabled).toBeVisible()
      await expectLocatorToNotExist(saveButtonEnabled)
    }

    const clickSaveButton = async () => {
      await expect.element(saveButtonEnabled).toBeVisible()
      await saveButtonEnabled.click()
    }

    const editorText = () => editor.element().textContent ?? ''
    const savedText = (index: number) => savedContent.nth(index).element().textContent ?? ''

    // Initial state
    await expectSaveButtonDisabled()

    // Type something
    await focusEditor()
    await userEvent.keyboard(`{${MOD_KEY}>}b{/${MOD_KEY}}`)
    await userEvent.type(editor, 'Foo')
    await expectSaveButtonEnabled()
    expect(editorText()).toBe('Foo')

    // Save content
    await expectLocatorToHaveCount(loadButton, 0)
    await clickSaveButton()
    await expectLocatorToHaveCount(loadButton, 1)
    await expect.poll(() => savedText(0)).toContain('<strong>Foo</strong>')

    // Type something
    await focusEditor()
    await userEvent.type(editor, 'Bar')
    await expectSaveButtonEnabled()
    expect(editorText()).toBe('FooBar')

    // Save content
    await expectLocatorToHaveCount(loadButton, 1)
    await clickSaveButton()
    await expectLocatorToHaveCount(loadButton, 2)
    await expect.poll(() => savedText(0)).toContain('<strong>Foo</strong>')
    await expect.poll(() => savedText(1)).toContain('<strong>FooBar</strong>')

    // Load content
    expect(editorText()).toBe('FooBar')
    await loadButton.nth(0).click()
    await expect.poll(editorText).toBe('Foo')
    await loadButton.nth(1).click()
    await expect.poll(editorText).toBe('FooBar')
    await loadButton.nth(0).click()
    await expect.poll(editorText).toBe('Foo')

    // Type something
    await focusEditor()
    await moveSelection('backward', 1, 'line')
    await userEvent.type(editor, 'Baz')
    await expectSaveButtonEnabled()
    expect(editorText()).toBe('BazFoo')
  })
})
