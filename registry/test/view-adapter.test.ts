import {
  expect,
  it,
} from 'vitest'

import {
  expectLocatorToHaveCount,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('view-adapter')

testStory('view-adapter', () => {
  it('renders atom block with custom node view', async () => {
    const editor = await waitForEditor()
    const atomBlock = editor.locate('[data-atom-block-view="true"]')

    await expectLocatorToHaveCount(atomBlock, 1)

    // Check label
    const label = atomBlock.getByTestId('atom-block-view-label')
    await expect.element(label).toHaveTextContent('Atom Block View')

    // Check position (should be a number)
    const pos = atomBlock.getByTestId('atom-block-view-pos')
    await expect.element(pos).toBeVisible()
    const posText = pos.element().textContent
    expect(Number(posText)).toBeGreaterThan(0)

    // Check context (should contain JSON)
    const context = atomBlock.getByTestId('atom-block-view-context')
    await expect.element(context).toBeVisible()
    const pre = context.locate('pre')
    await expect.element(pre).toBeVisible()

    // Verify the pre contains valid JSON with expected structure
    const jsonText = pre.element().textContent
    const docJSON = JSON.parse(jsonText)
    expect(docJSON).toHaveProperty('type', 'doc')
    expect(docJSON).toHaveProperty('content')
    expect(Array.isArray(docJSON.content)).toBe(true)
  })
})
