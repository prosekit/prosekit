import { defineCustomElement, defineProps, type HostElement } from '@aria-ui-v2/core'
import { getId } from '@ocavue/utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { usePress } from './use-press.ts'

describe('usePress', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  function createTestElement(setupFn: (host: HostElement) => void) {
    const TestElement = defineCustomElement(setupFn, defineProps({}))
    const tagName = `test-press-${getId()}`
    customElements.define(tagName, TestElement)
    const element = document.createElement(tagName) as HostElement
    document.body.appendChild(element)
    return element
  }

  test('calls handler on click', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('calls handler on Enter keydown', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('calls handler on Space keydown', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('prevents default on Enter keydown', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    element.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  test('prevents default on Space keydown', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
    element.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  test('ignores other keys', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))

    expect(handler).not.toHaveBeenCalled()
  })

  test('ignores keydown during IME composition', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    element.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true }),
    )

    expect(handler).not.toHaveBeenCalled()
  })

  test('does not fire after element is disconnected', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    element.remove()

    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    expect(handler).not.toHaveBeenCalled()
  })

  test('re-attaches listeners on reconnection', () => {
    const handler = vi.fn()
    const element = createTestElement((host) => {
      usePress(host, handler)
    })

    element.remove()
    document.body.appendChild(element)

    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('dispose stops all listeners', () => {
    const handler = vi.fn()
    let dispose: VoidFunction

    const element = createTestElement((host) => {
      dispose = usePress(host, handler)
    })

    dispose!()

    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    expect(handler).not.toHaveBeenCalled()
  })
})
