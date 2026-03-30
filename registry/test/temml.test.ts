import { expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('temml')

testStory('temml', () => {
  it('should render content correctly', async () => {
    const editor = await waitForEditor()

    const mathInline = editor.locate('.prosemirror-math-inline').first()
    const mathBlock = editor.locate('.prosemirror-math-block').first()

    await expect.element(mathInline).toBeVisible()
    await expect.element(mathBlock).toBeVisible()

    // Each math node has a source element (the LaTeX code editor) and a
    // display element (the rendered output).
    const mathInlineSource = mathInline.locate('.prosemirror-math-source')
    const mathInlineDisplay = mathInline.locate('.prosemirror-math-display')
    const mathBlockSource = mathBlock.locate('.prosemirror-math-source')
    const mathBlockDisplay = mathBlock.locate('.prosemirror-math-display')

    await expect.element(mathInlineSource).toBeInTheDocument()
    await expect.element(mathInlineDisplay).toBeInTheDocument()
    await expect.element(mathBlockSource).toBeInTheDocument()
    await expect.element(mathBlockDisplay).toBeInTheDocument()

    const mathInlineSourceHTML = mathInlineSource.element().innerHTML
    const mathBlockSourceHTML = mathBlockSource.element().innerHTML
    const mathInlineDisplayHTML = mathInlineDisplay.element().innerHTML
    const mathBlockDisplayHTML = mathBlockDisplay.element().innerHTML

    // Verify that the source contains the expected LaTeX.
    expect(mathInlineSourceHTML).toContain(String.raw`e^{i\pi}`)
    expect(mathBlockSourceHTML).toContain(String.raw`\sqrt{\pi}`)

    // Verify that the display contains Temml-rendered MathML.
    expect(mathInlineDisplayHTML).toContain(`<math`)
    expect(mathInlineDisplayHTML).toContain(`<annotation encoding="application/x-tex">`)
    expect(mathBlockDisplayHTML).toContain(`<math`)
    expect(mathBlockDisplayHTML).toContain(`<annotation encoding="application/x-tex">`)
  })

  it('should show and hide source and display based on cursor position', async () => {
    const editor = await waitForEditor()

    const mathInline = editor.locate('.prosemirror-math-inline').first()
    const mathBlock = editor.locate('.prosemirror-math-block').first()

    const mathInlineSource = mathInline.locate('.prosemirror-math-source')
    const mathInlineDisplay = mathInline.locate('.prosemirror-math-display')
    const mathBlockSource = mathBlock.locate('.prosemirror-math-source')
    const mathBlockDisplay = mathBlock.locate('.prosemirror-math-display')

    // Initially, no math node is focused — source is hidden, display is shown.
    await expect.element(mathInlineSource).not.toBeVisible()
    await expect.element(mathInlineDisplay).toBeVisible()
    await expect.element(mathBlockSource).not.toBeVisible()
    await expect.element(mathBlockDisplay).toBeVisible()

    await vi.waitFor(async () => {
      // Click the block math display to focus it.
      await userEvent.click(mathBlock, { force: true })

      // The block math now shows its source; inline math remains unchanged.
      expect(mathInlineSource).not.toBeVisible()
      expect(mathInlineDisplay).toBeVisible()
      expect(mathBlockSource).toBeVisible()
      expect(mathBlockDisplay).not.toBeVisible()
    }, { timeout: 4000 })

    // Click the inline math display to move focus there.
    await vi.waitFor(async () => {
      await userEvent.click(mathInline, { force: true })

      // The inline math now shows its source; block math reverts to display.
      expect(mathInlineSource).toBeVisible()
      expect(mathInlineDisplay).not.toBeVisible()
      expect(mathBlockSource).not.toBeVisible()
      expect(mathBlockDisplay).toBeVisible()
    }, { timeout: 4000 })

    // Click outside both math nodes (on a heading).
    await vi.waitFor(async () => {
      await userEvent.click(editor.locate('h2').first(), { force: true })

      // Both math nodes revert to showing only the rendered display.
      expect(mathInlineSource).not.toBeVisible()
      expect(mathInlineDisplay).toBeVisible()
      expect(mathBlockSource).not.toBeVisible()
      expect(mathBlockDisplay).toBeVisible()
    }, { timeout: 4000 })
  })
})
