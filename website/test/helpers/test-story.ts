import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import registry from 'prosekit-registry/registry.gen.json'

import { locateEditor } from './editor'
import { formatHTML } from './format-html'
import { waitForStableElement } from './query'

function getExamples(story: string) {
  const examples = registry.items.filter(item => item.meta.story === story)

  if (examples.length === 0) {
    throw new Error(`No examples found for story "${story}"`)
  }

  return examples.map(item => {
    const { framework, story } = item.meta
    return {
      framework,
      story,
      example: framework + '-' + story,
    }
  })
}

function testSingleStory(
  story: string,
  callback: (options: { framework: string; story: string; example: string }) => void,
) {
  for (const example of getExamples(story)) {
    describe(example.framework + '/' + example.story, () => {
      beforeEach(async () => {
        await renderExample(example.framework, example.story)
      })
      callback(example)
    })
  }
}

async function renderExample(framework: string, story: string) {
  if (framework === 'react') {
    const { renderReactExample } = await import('./render-react')
    return await renderReactExample(story)
  }

  if (framework === 'vue') {
    const { renderVueExample } = await import('./render-vue')
    return await renderVueExample(story)
  }

  if (framework === 'svelte') {
    const { renderSvelteExample } = await import('./render-svelte')
    return await renderSvelteExample(story)
  }

  if (framework === 'solid') {
    const { renderSolidExample } = await import('./render-solid')
    return await renderSolidExample(story)
  }

  if (framework === 'preact') {
    const { renderPreactExample } = await import('./render-preact')
    return await renderPreactExample(story)
  }

  throw new Error(`The ${framework} framework is not supported`)
}

export function testStory(
  story: string | string[],
  callback: (options: { framework: string; story: string; example: string }) => void,
) {
  const stories = Array.isArray(story) ? story : [story]

  for (const story of stories) {
    testSingleStory(story, callback)
  }
}

export function testStoryConsistency(story: string, {
  shouldWaitForEditor = true,
  shouldWaitForShiki = false,
  shouldWaitForImageToLoad = false,
}: {
  shouldWaitForEditor?: boolean
  shouldWaitForShiki?: boolean
  shouldWaitForImageToLoad?: boolean
} = {}) {
  const examples = getExamples(story)

  if (examples.length <= 1) {
    return
  }

  it(`should render the same "${story}" story across ${examples.length} frameworks`, async () => {
    const htmlToExamples = new Map<string, string[]>()
    for (const example of examples) {
      const html = await getStableHTML({
        framework: example.framework,
        story: example.story,
        shouldWaitForShiki,
        shouldWaitForEditor,
        shouldWaitForImageToLoad,
      })
      const group = htmlToExamples.get(html) || []
      group.push(example.example)
      htmlToExamples.set(html, group)
    }

    if (htmlToExamples.size <= 1) {
      return
    }

    const iterator = htmlToExamples.entries()
    const [html1, examples1] = iterator.next().value!
    const [html2, examples2] = iterator.next().value!
    const label1 = examples1.join(', ')
    const label2 = examples2.join(', ')

    let message = `Expected "${label1}" and "${label2}" to render the same HTML.\n`

    const lines1 = html1.split('\n')
    const lines2 = html2.split('\n')
    const size = Math.min(lines1.length, lines2.length)

    for (let i = 0; i < size; i++) {
      const line1 = lines1[i]
      const line2 = lines2[i]
      if (line1 !== line2) {
        message += `The first difference is at line ${i + 1}:\n`
        message += `"${label1}" has:\n`
        message += `${line1.slice(0, 100)}${line1.length > 100 ? '...' : ''}\n`
        message += `"${label2}" has:\n`
        message += `${line2.slice(0, 100)}${line2.length > 100 ? '...' : ''}\n`
        message += `\n`
        break
      }
    }

    // message += '\n'
    // message += '='.repeat(20) + ' HTML from ' + label1 + ' ' + '='.repeat(20) + '\n'
    // message += html1 + '\n'
    // message += '='.repeat(20) + ' END of ' + label1 + ' ' + '='.repeat(20) + '\n'
    // message += '='.repeat(20) + ' HTML from ' + label2 + ' ' + '='.repeat(20) + '\n'
    // message += html2 + '\n'
    // message += '='.repeat(20) + ' END of ' + label2 + ' ' + '='.repeat(20) + '\n'

    expect(html1, message).toEqual(html2)
  })
}

async function getStableHTML(
  {
    framework,
    story,
    shouldWaitForEditor,
    shouldWaitForShiki,
    shouldWaitForImageToLoad,
  }: {
    framework: string
    story: string
    shouldWaitForEditor: boolean
    shouldWaitForShiki: boolean
    shouldWaitForImageToLoad: boolean
  },
): Promise<string> {
  const screen = await renderExample(framework, story)

  if (shouldWaitForEditor) {
    await expect.element(locateEditor().first()).toBeVisible()
  }
  if (shouldWaitForShiki) {
    await waitForShiki(screen.container)
  }
  if (shouldWaitForImageToLoad) {
    await waitForImageToLoad(screen.container)
  }

  await waitForStableElement(() => screen.container)

  // Clone the container so we don't modify the actual DOM
  const clone = screen.container.cloneNode(true) as Element

  removeDisplayContents(clone)
  removeSelectValueAttributes(clone)

  let html = formatHTML(clone.innerHTML)
  // Replace random ids
  html = html.replaceAll(/ id="[\w-]+"/g, ' id="SOME_ID"')
  // Replace random value attributes
  html = html.replaceAll(/ value="[\w-]{21}"/g, ' value="SOME_NANOID_21"')
  // Replace styles with display: none
  html = html.replaceAll(/style="[^"]*display: none[^"]*"/g, 'style="display: none"')

  return html
}

// Remove display: contents divs in the clone, since solid.js v1 needs to
// insert a div for portals. See
// https://github.com/prosekit/prosemirror-adapter/blob/2065ef0986b17971b66f901b86aaeb6ad100df63/packages/solid/src/markView/SolidMarkView.tsx#L47
function removeDisplayContents(element: Element) {
  let found: Element | null
  while ((found = element.querySelector('div[style*="display: contents"]'))) {
    const parent = found.parentNode
    while (found.firstChild) {
      parent?.insertBefore(found.firstChild, found)
    }
    found.remove()
  }
}

/**
 * Vue set <select :value="..."> as a attribute thus it will be rendered in the
 * HTML string. We want to remove the value attribute.
 */
function removeSelectValueAttributes(element: Element) {
  const formElements = Array.from(element.querySelectorAll('select,input'))
  for (const formElement of formElements) {
    formElement.removeAttribute('value')
  }
}

/**
 * Wait for the shiki highlight to be visible
 */
async function waitForShiki(element: Element) {
  const isShikiReady = (): boolean => {
    return !!element.querySelector('span.shiki')
  }
  await expect.poll(isShikiReady, { timeout: 8000 }).toBe(true)
}

/**
 * Find all images in the element and wait for them to load
 */
async function waitForImageToLoad(element: Element) {
  const areImagesLoaded = (): boolean => {
    const images = Array.from(element.querySelectorAll('img'))
    return images.every(img => img.complete && img.naturalWidth > 0)
  }

  await expect.poll(areImagesLoaded, { timeout: 8000 }).toBe(true)
}
