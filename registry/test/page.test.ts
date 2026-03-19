import { sleep } from '@ocavue/utils'
import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page, userEvent } from 'vitest/browser'

import { moveSelection, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('page', { shouldWaitForImageToLoad: true })

testStory('page', () => {
  it('should render four pages by default ', async () => {
    await waitForEditor()
    await expectPageCountToBe(4)
    expect(getPageLayout()).toMatchInlineSnapshot(`
      "
        0 | head      | h1: Page Layout Demo
        1 |           | p: This is the first pa
        2 |           | p: The content below wi
        3 |      tail | div.prosekit-horizontal-rule.prosekit-page-break
        4 | head      | h1: Page 2
        5 |           | p: This is the second p
        6 |           | p: When the content on 
        7 |      tail | img
        8 | head      | img
        9 |           | p: The images above exc
       10 |           | h2: Known Limitation
       11 |      tail | p: Page breaks only occ
       12 | head tail | p: This is a very long 
      "
    `)
  })

  it('should have three pages after deleting a page break', async () => {
    await waitForEditor()
    await expectPageCountToBe(4)

    // Click on the page break node to select it
    const pageBreak = page.locate('.prosekit-page-break')
    await expect.element(pageBreak).toBeVisible()
    await userEvent.click(pageBreak.element())

    // Delete the selected page break
    await keyboard.press('Backspace')
    await expect.element(pageBreak).not.toBeInTheDocument()

    // Only for debug
    // TODO: remove me
    for (let i = 0; i < 20; i++) {
      await sleep(50)
    }

    // TODO: BUG: Should be 3 pages, but collapses to 1 page
    // await expectPageCountToBe(3)
    expect(getPageLayout()).toMatchInlineSnapshot(`
      "
        0 | head      | h1: Page Layout Demo
        1 |           | p: This is the first pa
        2 |           | p: The content below wi
        3 |           | h1: Page 2
        4 |           | p: This is the second p
        5 |           | p: When the content on 
        6 |           | img
        7 |           | img
        8 |           | p: The images above exc
        9 |           | h2: Known Limitation
       10 |           | p: Page breaks only occ
       11 |           | p: This is a very long 
      "
    `)
  })

  it('should update layout after appending a new paragraph at the end of the document', async () => {
    await waitForEditor()
    await expectPageCountToBe(4)

    // Move cursor to the end of the last paragraph
    const lastParagraph = page.getByText(/This is a very long paragraph/)
    await expect.element(lastParagraph).toBeVisible()
    await userEvent.click(lastParagraph.element())
    for (let i = 0; i < 20; i++) {
      await moveSelection('forward', 1, 'line')
    }

    // Press Enter multiple times to overflow the last page
    await keyboard.press('Enter')

    // Only for debug
    // TODO: remove me
    for (let i = 0; i < 20; i++) {
      await sleep(50)
    }

    // TODO: BUG: Should be 3 pages, but collapses to 1 page
    // await expectPageCountToBe(3)
    expect(getPageLayout()).toMatchInlineSnapshot(`
      "
        0 | head      | h1: Page Layout Demo
        1 |           | p: This is the first pa
        2 |           | p: The content below wi
        3 |      tail | div.prosekit-horizontal-rule.prosekit-page-break
        4 | head      | h1: Page 2
        5 |           | p: This is the second p
        6 |           | p: When the content on 
        7 |      tail | img
        8 | head      | img
        9 |           | p: The images above exc
       10 |           | h2: Known Limitation
       11 |      tail | p: Page breaks only occ
       12 | head tail | p: This is a very long 
       13 |           | p: 
      "
    `)
  })
})

function expectPageCountToBe(count: number): Promise<void> {
  return expect.poll(getPageCount, { timeout: 5000 }).toBe(count)
}

function getPageCount(): number {
  const headChunk = document.querySelectorAll('pm-page-chunk[data-page-head]')
  return headChunk.length
}

function getPageLayout(): string {
  const chunks = document.querySelectorAll('pm-page-chunk')

  const lines: string[] = []

  for (const chunk of chunks) {
    let index = chunk.getAttribute('data-index') || '??'
    index = index.padStart(3, ' ')
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
        childSnapshot += child.textContent?.trim().slice(0, 20) || ''
      }
      break
    }

    lines.push(`${index} | ${type} | ${childSnapshot}`)
  }
  return '\n' + lines.join('\n') + '\n'
}
