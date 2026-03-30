import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page, userEvent } from 'vitest/browser'

import { moveSelectionToEnd, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('page', { shouldWaitForImageToLoad: true })

testStory('page', () => {
  it('should render four pages by default', async () => {
    await waitForEditor()
    await expectPageCountToBe(4)
    await expectChunkCountToBe(13)
    expect(await getStablePageLayout()).toMatchInlineSnapshot(`
      "
       13 | head      | h1: Page Layout Demo
          |           | p: This is the first pa
          |           | p: The content below wi
          |      tail | div.prosekit-horizontal-rule.prosekit-page-break
          | head      | h1: Page 2
          |           | p: This is the second p
          |           | p: When the content on
          |      tail | img
          | head      | img
          |           | p: The images above exc
          |           | h2: Known Limitation
          |      tail | p: Page breaks only occ
          | head tail | p: This is a very long
      "
    `)
  })

  it('should update layout after deleting a page break', async () => {
    await waitForEditor()
    await expectPageCountToBe(4)
    await expectChunkCountToBe(13)

    // Click on the page break node to select it
    const pageBreak = page.locate('.prosekit-page-break')
    await expect.element(pageBreak).toBeVisible()
    await userEvent.click(pageBreak.element())

    // Delete the selected page break
    await keyboard.press('Backspace')
    await expect.element(pageBreak).not.toBeInTheDocument()

    await expectPageCountToBe(3)
    await expectChunkCountToBe(12)

    expect(await getStablePageLayout()).toMatchInlineSnapshot(`
      "
       12 | head      | h1: Page Layout Demo
          |           | p: This is the first pa
          |           | p: The content below wi
          |           | h1: Page 2
          |           | p: This is the second p
          |           | p: When the content on
          |      tail | img
          | head      | img
          |           | p: The images above exc
          |           | h2: Known Limitation
          |      tail | p: Page breaks only occ
          | head tail | p: This is a very long
      "
    `)
  })

  it('should update layout after appending a new paragraph at the end of the document', async () => {
    await waitForEditor()
    await expectPageCountToBe(4)
    await expectChunkCountToBe(13)

    // Move cursor to the end of the document
    const lastParagraph = page.getByText(/This is a very long paragraph/)
    await expect.element(lastParagraph).toBeVisible()
    await userEvent.click(lastParagraph.element())
    await moveSelectionToEnd()

    // Press Enter to create a new paragraph
    await keyboard.press('Enter')

    await expectPageCountToBe(4)
    await expectChunkCountToBe(14)

    expect(await getStablePageLayout()).toMatchInlineSnapshot(`
      "
       14 | head      | h1: Page Layout Demo
          |           | p: This is the first pa
          |           | p: The content below wi
          |      tail | div.prosekit-horizontal-rule.prosekit-page-break
          | head      | h1: Page 2
          |           | p: This is the second p
          |           | p: When the content on
          |      tail | img
          | head      | img
          |           | p: The images above exc
          |           | h2: Known Limitation
          |      tail | p: Page breaks only occ
          | head      | p: This is a very long
          |      tail | p: 
      "
    `)
  })
})

function getPageCount(): number {
  const headChunk = document.querySelectorAll('pm-page-chunk[data-page-head]')
  return headChunk.length
}

function expectPageCountToBe(count: number): Promise<void> {
  return expect.poll(getPageCount, { timeout: 5000 }).toBe(count)
}

function getChunkCount(): number {
  const chunks = document.querySelectorAll('pm-page-chunk')
  return chunks.length
}

function expectChunkCountToBe(count: number): Promise<void> {
  return expect.poll(getChunkCount, { timeout: 5000 }).toBe(count)
}

function getPageLayout(): string {
  const chunks = document.querySelectorAll('pm-page-chunk')

  const lines: string[] = []

  for (const chunk of chunks) {
    const size = chunk.getAttribute('data-size') || ''
    const sizeInfo = size.padStart(3)

    let type = ''
    if (chunk.hasAttribute('data-page-head')) {
      type += 'head '
    } else {
      type += '     '
    }
    if (chunk.hasAttribute('data-page-tail')) {
      type += 'tail'
    } else {
      type += '    '
    }

    let childSnapshot = ''
    for (const child of chunk.children) {
      const nodeName = child.nodeName.toLowerCase()
      const classNames = Array.from(child.classList || [])
      const classSelector = classNames.sort().map((x) => `.${x}`).join('')
      childSnapshot = `${nodeName}${classSelector}`
      if (nodeName === 'p' || /^h\d$/.test(nodeName)) {
        childSnapshot += ': '
        childSnapshot += child.textContent?.trim().slice(0, 20).trim() || ''
      }
      break
    }

    lines.push(`${sizeInfo} | ${type} | ${childSnapshot}`)
  }
  return '\n' + lines.join('\n') + '\n'
}

async function getStablePageLayout(): Promise<string> {
  let previous = ''
  let current = getPageLayout()

  await expect.poll(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve))
    previous = current
    current = getPageLayout()
    return previous === current && current !== ''
  }, { timeout: 5000 }).toBe(true)

  return current
}
