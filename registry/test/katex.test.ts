import { expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('katex')

testStory('katex', () => {
  it('should render content correctly', async () => {
    const editor = await waitForEditor()

    const mathInline = editor.locate('.prosekit-math-inline').first()
    const mathBlock = editor.locate('.prosekit-math-block').first()

    await expect.element(mathInline).toBeVisible()
    await expect.element(mathBlock).toBeVisible()

    // Each math node has a source element (the LaTeX code editor) and a
    // display element (the rendered output).
    const mathInlineSource = mathInline.locate('.prosekit-math-source')
    const mathInlineDisplay = mathInline.locate('.prosekit-math-display')
    const mathBlockSource = mathBlock.locate('.prosekit-math-source')
    const mathBlockDisplay = mathBlock.locate('.prosekit-math-display')

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

    // Verify that the display contains KaTeX-rendered output.
    expect(mathInlineDisplayHTML).toContain(`class="katex"`)
    expect(mathInlineDisplayHTML).toContain(`class="katex-html"`)
    expect(mathInlineDisplayHTML).toContain(`<annotation encoding="application/x-tex">`)
    expect(mathBlockDisplayHTML).toContain(`class="katex"`)
    expect(mathBlockDisplayHTML).toContain(`class="katex-html"`)
    expect(mathBlockDisplayHTML).toContain(`<annotation encoding="application/x-tex">`)
  })

  it('should show and hide source and display based on cursor position', async () => {
    const editor = await waitForEditor()

    const mathInline = editor.locate('.prosekit-math-inline').first()
    const mathBlock = editor.locate('.prosekit-math-block').first()

    const mathInlineSource = mathInline.locate('.prosekit-math-source')
    const mathInlineDisplay = mathInline.locate('.prosekit-math-display')
    const mathBlockSource = mathBlock.locate('.prosekit-math-source')
    const mathBlockDisplay = mathBlock.locate('.prosekit-math-display')

    // Initially, no math node is focused — source is hidden, display is shown.
    await expect.element(mathInlineSource).not.toBeVisible()
    await expect.element(mathInlineDisplay).toBeVisible()
    await expect.element(mathBlockSource).not.toBeVisible()
    await expect.element(mathBlockDisplay).toBeVisible()

    // Click the block math display to focus it.
    await userEvent.click(mathBlockDisplay, { force: true })

    // The block math now shows its source; inline math remains unchanged.
    await expect.element(mathInlineSource).not.toBeVisible()
    await expect.element(mathInlineDisplay).toBeVisible()
    await expect.element(mathBlockSource).toBeVisible()
    await expect.element(mathBlockDisplay).not.toBeVisible()

    // Click the inline math display to move focus there.
    await userEvent.click(mathInlineDisplay, { force: true })

    // The inline math now shows its source; block math reverts to display.
    await expect.element(mathInlineSource).toBeVisible()
    await expect.element(mathInlineDisplay).not.toBeVisible()
    await expect.element(mathBlockSource).not.toBeVisible()
    await expect.element(mathBlockDisplay).toBeVisible()

    // Click outside both math nodes (on a heading).
    await userEvent.click(editor.locate('h2').first(), { force: true })

    // Both math nodes revert to showing only the rendered display.
    await expect.element(mathInlineSource).not.toBeVisible()
    await expect.element(mathInlineDisplay).toBeVisible()
    await expect.element(mathBlockSource).not.toBeVisible()
    await expect.element(mathBlockDisplay).toBeVisible()
  })
})
