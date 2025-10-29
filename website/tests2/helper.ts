import '../src/styles/global.css'

import diffableHtml from 'diffable-html'
import {
  beforeEach,
  describe,
  expect,
  it,
  type ExpectPollOptions,
} from 'vitest'
import { mouse } from 'vitest-browser-commands/playwright'
import {
  locators,
  page,
  userEvent,
  type Locator,
  type LocatorOptions,
} from 'vitest/browser'

import exampleMeta from '../example.meta.json' with { type: 'json' }

const IS_APPLE = window.navigator.userAgent.includes('Mac')
export const MOD_KEY = IS_APPLE ? 'Meta' : 'Control'

declare module 'vitest/browser' {
  interface LocatorSelectors {
    locate(selector: string, options?: LocatorOptions): Locator
  }
}

locators.extend({
  locate(selector: string, options?: LocatorOptions): Locator | string {
    if (!options) {
      return selector
    }
    const locator = page.locate(selector)
    return locator.filter(options)
  },
})

function getExamples(story: string) {
  const examples = exampleMeta.examples.filter(
    (example) => example.story === story,
  )

  if (examples.length === 0) {
    throw new Error(`No examples found for story "${story}"`)
  }

  return examples
}

interface TestStoryCallbackOptions {
  example: string
}

interface TestStoryOptions {
  /**
   * Whether to check for uncaught errors.
   *
   * If `true`, the test will fail if there are uncaught runtime errors.
   *
   * @default true
   */
  checkUncaughtErrors?: boolean

  /**
   * Whether to check for console errors.
   *
   * If `true`, the test will fail if there are console errors.
   *
   * @default true
   */
  checkConsoleErrors?: boolean

  /**
   * Whether to check for console warnings.
   *
   * If `true`, the test will fail if there are console warnings.
   *
   * @default true
   */
  checkConsoleWarnings?: boolean
}

const cleanupFunctions: Record<string, () => void | Promise<void>> = {}

function registerCleanupFunction(name: string, cleanupFunction: () => void | Promise<void>) {
  if (cleanupFunctions[name]) {
    return
  }
  cleanupFunctions[name] = cleanupFunction
}

async function runCleanupFunctions() {
  for (const cleanupFunction of Object.values(cleanupFunctions)) {
    await cleanupFunction()
  }
}

function testSingleStory(
  story: string,
  callback: (options: TestStoryCallbackOptions) => void,
  // TODO: the following options are not used yet. Don't implement them yet. We
  // might or might not need to remove them in the future.
  {}: TestStoryOptions = {},
) {
  for (const example of getExamples(story)) {
    describe(example.framework + '/' + example.story, () => {
      beforeEach(async () => {
        await runCleanupFunctions()
      })

      if (example.framework === 'react') {
        beforeEach(async () => {
          const pure = await import('vitest-browser-react/pure')
          const { ReactExample } = await import('../src/examples/react/example')
          const React = await import('react')
          registerCleanupFunction(example.framework, pure.cleanup)
          await pure.render(React.createElement(ReactExample, { story: example.story }))
        })
        callback({ example: example.name })
      } else if (example.framework === 'vue') {
        beforeEach(async () => {
          const pure = await import('vitest-browser-vue/pure')
          const { VueExample } = await import('../src/examples/vue/example')
          registerCleanupFunction(example.framework, pure.cleanup)
          pure.render(VueExample, { props: { story: example.story } })
        })
        callback({ example: example.name })
      } else if (example.framework === 'svelte') {
        beforeEach(async () => {
          const pure = await import('vitest-browser-svelte/pure')
          const { SvelteExample } = await import('../src/examples/svelte/example')
          registerCleanupFunction(example.framework, pure.cleanup)
          pure.render(SvelteExample, { story: example.story })
        })
        callback({ example: example.name })
      } else if (example.framework === 'solid') {
        beforeEach(async () => {
          const pure = await import('vitest-browser-solid/pure')
          const { SolidExample } = await import('../src/examples/solid/example')
          const { default: h } = await import('solid-js/h')
          registerCleanupFunction(example.framework, pure.cleanup)
          pure.render(h(SolidExample, { story: example.story }))
        })
        callback({ example: example.name })
      } else if (example.framework === 'preact') {
        beforeEach(async () => {
          const pure = await import('vitest-browser-preact/pure')
          const { PreactExample } = await import('../src/examples/preact/example')
          const Preact = await import('preact')
          registerCleanupFunction(example.framework, pure.cleanup)
          pure.render(Preact.createElement(PreactExample, { story: example.story }))
        })
        callback({ example: example.name })
      } else {
        it.skip(`The ${example.framework} framework is not supported yet for vitest browser tests`, () => {
          expect(1 + 1).toBe(2)
        })
      }
    })
  }
}

export function testStory(
  story: string | string[],
  callback: (options: TestStoryCallbackOptions) => void,
  options?: TestStoryOptions,
) {
  const stories = Array.isArray(story) ? story : [story]

  for (const story of stories) {
    testSingleStory(story, callback, options)
  }
}

export function locateEditor(): Locator {
  return page.locate('div.ProseMirror')
}

export function locateFocusedEditor(): Locator {
  return page.locate('div.ProseMirror.ProseMirror-focused')
}

export async function waitForEditor(): Promise<Locator> {
  const locator = locateEditor()
  await expect.element(locator).toBeVisible()
  return locator
}

export async function expectEditorToBeFocused(): Promise<void> {
  await waitForEditor()
  await expect.element(locateFocusedEditor()).toBeVisible()
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function collapseSelection(direction: 'start' | 'end'): Promise<void> {
  const selection = getSelection()
  if (direction === 'start') {
    selection.collapseToStart()
  } else {
    selection.collapseToEnd()
  }

  // Wait for the selection to be updated
  await sleep(1)
}

export async function moveSelection(direction: 'forward' | 'backward', count: number, granularity: 'character' | 'line' = 'character'): Promise<void> {
  const selection = getSelection()
  for (let i = 0; i < count; i++) {
    selection.modify('move', direction, granularity)
  }

  // Wait for the selection to be updated
  await sleep(1)
}

export async function extendSelection(direction: 'forward' | 'backward', count: number): Promise<void> {
  const selection = getSelection()
  for (let i = 0; i < count; i++) {
    selection.modify('extend', direction, 'character')
  }

  // Wait for the selection to be updated
  await sleep(1)
}

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

function getSelection(): Selection {
  const selection = window.getSelection()
  if (!selection) {
    throw new Error('Unable to access the current document selection.')
  }
  return selection
}

export function getSelectedText(): string {
  const selection = getSelection()
  return selection.toString()
}

export function getSelectedHtml(): string {
  const selection = getSelection()
  let output = ''
  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i)
    const container = document.createElement('div')
    container.appendChild(range.cloneContents())
    output += container.innerHTML
  }
  return output
}

export async function emptyEditor(options?: { editor?: Locator }) {
  const editor = options?.editor ?? (await waitForEditor())
  await focusEditor({ editor })
  await userEvent.keyboard(`{${MOD_KEY}>}{a}{/${MOD_KEY}}`)
  await userEvent.keyboard('{Backspace}')
  await userEvent.keyboard('{Backspace}')
}

export async function expectLocatorToHaveCount(locator: Locator, count: number, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    return locator.elements()
  }, options).toHaveLength(count)
}

export async function expectLocatorToNotExist(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    return locator
  }, options).not.toBeInTheDocument()
}

export async function expectLocatorToBeHidden(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    const elements = locator.elements()
    return elements.some((element) => isElementVisible(element))
  }, options).toBe(false)
}

export function getBoundingBox(locator: Locator): BoundingBox {
  const element = locator.element()
  const rect = element.getBoundingClientRect()
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  }
}

export async function unhover(): Promise<void> {
  const body = page.locate('body')
  await hover(body, { position: { x: 0, y: 0 } })
}

export async function waitForAnimationEnd(locator: Locator): Promise<void> {
  await expect.poll(() => checkElementIsStable(locator)).toBe(true)
}

function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) {
    return false
  }

  if (element instanceof HTMLElement) {
    const style = window.getComputedStyle(element)
    if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) {
      return false
    }
  }

  return true
}

// Based on https://github.com/microsoft/playwright/blob/21bb265aa1f290b297cc7c9c78596a785216b667/packages/injected/src/injectedScript.ts#L651
function checkElementIsStable(locator: Locator, stableCount = 2): Promise<boolean> {
  const continuePolling = Symbol('continuePolling')
  let lastRect: { x: number; y: number; width: number; height: number } | undefined
  let stableCounter = 0

  const check = () => {
    const element = locator.element()
    const clientRect = element.getBoundingClientRect()
    const rect = {
      x: clientRect.top,
      y: clientRect.left,
      width: clientRect.width,
      height: clientRect.height,
    }
    if (lastRect) {
      const samePosition = rect.x === lastRect.x
        && rect.y === lastRect.y
        && rect.width === lastRect.width
        && rect.height === lastRect.height
      if (!samePosition) return false
      stableCounter += 1
      if (stableCounter >= stableCount) return true
    }
    lastRect = rect
    return continuePolling
  }

  const { promise, resolve, reject } = Promise.withResolvers<boolean>()

  const start = () => {
    try {
      const success = check()
      if (success !== continuePolling) resolve(success)
      else requestAnimationFrame(start)
    } catch (e) {
      reject(e)
    }
  }

  requestAnimationFrame(start)

  return promise
}

export function getEditorHTML(): string {
  const editor = locateEditor()
  const html = editor.element().innerHTML
  return formatHTML(html)
}

function formatHTML(html: string) {
  return diffableHtml(html)
}

export async function focusEditor(options?: { editor?: Locator }) {
  const editor = options?.editor ?? (await waitForEditor())
  editor.element().focus()
}

export async function pasteHtmlToEditor(
  html: string,
  options?: { editor?: Locator },
) {
  const editor = options?.editor ?? (await waitForEditor())
  const element = editor.element()
  element.focus()

  const data = new DataTransfer()
  data.setData('text/html', html)

  const event = new ClipboardEvent('paste', {
    clipboardData: data,
    bubbles: true,
    cancelable: true,
  })

  element.dispatchEvent(event)
}

/**
 * Hover over an element.
 *
 * This could be more reliable than `locator.hover()` because it sends multiple
 * mouse move events.
 */
export async function hover(locator: Locator, options?: {
  /**
   * A point to use relative to the top-left corner of element padding box. If
   * not specified, points to the center of the element.
   */
  position?: { x: number; y: number }

  /**
   * How many mouse move events to send.
   */
  steps?: number
}) {
  await expect.element(locator).toBeVisible()
  const box = locator.element().getBoundingClientRect()

  // Coordinates relative to the top-left corner of the element.
  const x = options?.position?.x ?? Math.floor(box.width / 2)
  const y = options?.position?.y ?? Math.floor(box.height / 2)

  const steps = options?.steps ?? 10
  await mouse.move(x + box.x, y + box.y, { steps })
}

/**
 * Drag an element over another element.
 *
 * This is more reliable than `locator.dragTo()` because it sends multiple mouse
 * move events.
 */
export async function dragAndDrop(
  startLocator: Locator,
  endLocator: Locator,
  options?: {
    startPosition?: { x: number; y: number }
    endPosition?: { x: number; y: number }
  },
) {
  await hover(startLocator, { position: options?.startPosition })
  await mouse.down()
  await hover(endLocator, { position: options?.endPosition })
  await mouse.up()
}
