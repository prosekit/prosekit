import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helpers'

async function setup() {
  const editor = await waitForEditor()
  return {
    editor,
    bulletBtn: page.getByRole('button', { name: 'Bullet' }),
    orderedBtn: page.getByRole('button', { name: 'Ordered' }),
    taskBtn: page.getByRole('button', { name: 'Task' }),
    toggleBtn: page.getByRole('button', { name: 'Toggle' }),
    bulletList: editor.locate('.prosemirror-flat-list[data-list-kind="bullet"]'),
    orderedList: editor.locate('.prosemirror-flat-list[data-list-kind="ordered"]'),
    taskList: editor.locate('.prosemirror-flat-list[data-list-kind="task"]'),
    toggleList: editor.locate('.prosemirror-flat-list[data-list-kind="toggle"]'),
  }
}

testStory('list', () => {
  it('toggle bullet list', async () => {
    const { editor, bulletBtn, bulletList } = await setup()

    await emptyEditor()
    await userEvent.type(editor, 'Item')

    await expect.element(bulletBtn).toBeVisible()
    await bulletBtn.click()
    await expect.element(bulletList.locate('p', { hasText: 'Item' })).toBeVisible()

    await expect.element(bulletBtn).toBeVisible()
    await bulletBtn.click()
    expect(bulletList).not.toBeInTheDocument()
  })

  it('toggle ordered list', async () => {
    const { editor, orderedBtn, orderedList } = await setup()

    await emptyEditor()
    await userEvent.type(editor, 'Item')

    await expect.element(orderedBtn).toBeVisible()
    await orderedBtn.click()
    await expect.element(orderedList.locate('p', { hasText: 'Item' })).toBeVisible()

    await expect.element(orderedBtn).toBeVisible()
    await orderedBtn.click()
    expect(orderedList).not.toBeInTheDocument()
  })

  it('toggle task list', async () => {
    const { editor, taskBtn, taskList } = await setup()

    await emptyEditor()
    await userEvent.type(editor, 'Task')

    await taskBtn.click()
    await expect.element(taskList).toBeVisible()
    await expect.element(taskList.locate('input[type="checkbox"]').first()).toBeVisible()

    await taskBtn.click()
    expect(taskList).not.toBeInTheDocument()
  })

  it('toggle toggle-list', async () => {
    const { editor, toggleBtn, toggleList } = await setup()

    await emptyEditor()
    await userEvent.type(editor, 'Toggle')

    await toggleBtn.click()
    await expect.element(toggleList.locate('p', { hasText: 'Toggle' })).toBeVisible()

    await toggleBtn.click()
    expect(toggleList).not.toBeInTheDocument()
  })
})
