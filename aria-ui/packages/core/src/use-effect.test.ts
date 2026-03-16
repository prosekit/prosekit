import { getId } from '@ocavue/utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { defineCustomElement } from './define-custom-element.ts'
import { defineProps } from './define-props.ts'
import { createSignal } from './signal.ts'
import { useEffect } from './use-effect.ts'

describe('useEffect', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should run effect when host is connected', () => {
    const effectFn = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, effectFn)
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    expect(effectFn).not.toHaveBeenCalled()

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)
  })

  it('should call cleanup when effect re-runs', () => {
    const signal = createSignal(0)
    const cleanup = vi.fn()
    const effectFn = vi.fn(() => cleanup)

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        signal.get()
        return effectFn()
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)
    expect(cleanup).not.toHaveBeenCalled()

    signal.set(1)

    expect(effectFn).toHaveBeenCalledTimes(2)
    expect(cleanup).toHaveBeenCalledTimes(1)
  })

  it('should call cleanup when host is disconnected', () => {
    const cleanup = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => cleanup)
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(cleanup).not.toHaveBeenCalled()

    element.remove()

    expect(cleanup).toHaveBeenCalledTimes(1)
  })

  it('should handle effect without cleanup', () => {
    const effectFn = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, effectFn)
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)

    element.remove()
  })

  it('should track reactive dependencies', () => {
    const signal = createSignal(0)
    const effectFn = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        signal.get()
        effectFn()
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)

    signal.set(1)
    expect(effectFn).toHaveBeenCalledTimes(2)

    signal.set(2)
    expect(effectFn).toHaveBeenCalledTimes(3)
  })

  it('should cleanup and re-run when dependencies change', () => {
    const signal = createSignal(0)
    const effectFn = vi.fn()
    const cleanup = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        const value = signal.get()
        effectFn(value)
        return cleanup
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)
    expect(effectFn).toHaveBeenLastCalledWith(0)
    expect(cleanup).not.toHaveBeenCalled()

    signal.set(1)

    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(effectFn).toHaveBeenCalledTimes(2)
    expect(effectFn).toHaveBeenLastCalledWith(1)

    signal.set(2)

    expect(cleanup).toHaveBeenCalledTimes(2)
    expect(effectFn).toHaveBeenCalledTimes(3)
    expect(effectFn).toHaveBeenLastCalledWith(2)
  })

  it('should allow manual disposal', () => {
    const signal = createSignal(0)
    const effectFn = vi.fn()
    const cleanup = vi.fn()
    let dispose: VoidFunction

    const TestElement = defineCustomElement((host) => {
      dispose = useEffect(host, () => {
        signal.get()
        effectFn()
        return cleanup
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)

    signal.set(1)
    expect(effectFn).toHaveBeenCalledTimes(2)
    expect(cleanup).toHaveBeenCalledTimes(1)

    dispose!()

    expect(cleanup).toHaveBeenCalledTimes(2)

    signal.set(2)
    expect(effectFn).toHaveBeenCalledTimes(2)
    expect(cleanup).toHaveBeenCalledTimes(2)
  })

  it('should handle reconnection', () => {
    const effectFn = vi.fn()
    const cleanup = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        effectFn()
        return cleanup
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)
    expect(cleanup).not.toHaveBeenCalled()

    element.remove()
    expect(cleanup).toHaveBeenCalledTimes(1)

    document.body.appendChild(element)
    expect(effectFn).toHaveBeenCalledTimes(2)
    expect(cleanup).toHaveBeenCalledTimes(1)

    element.remove()
    expect(cleanup).toHaveBeenCalledTimes(2)
  })

  it('should handle multiple signals', () => {
    const signal1 = createSignal(0)
    const signal2 = createSignal(0)
    const effectFn = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        signal1.get()
        signal2.get()
        effectFn()
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)

    signal1.set(1)
    expect(effectFn).toHaveBeenCalledTimes(2)

    signal2.set(1)
    expect(effectFn).toHaveBeenCalledTimes(3)

    signal1.set(2)
    signal2.set(2)
    expect(effectFn).toHaveBeenCalledTimes(5)
  })

  it('should only track actively accessed dependencies', () => {
    const signal1 = createSignal(true)
    const signal2 = createSignal('A')
    const effectFn1 = vi.fn()
    const effectFn2 = vi.fn()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        effectFn1()
        if (signal1.get()) {
          effectFn2(signal2.get())
        }
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    document.body.appendChild(element)

    expect(effectFn1).toHaveBeenCalledTimes(1)
    expect(effectFn2).toHaveBeenCalledTimes(1)
    expect(effectFn2).toHaveBeenLastCalledWith('A')

    signal2.set('B')
    expect(effectFn1).toHaveBeenCalledTimes(2)
    expect(effectFn2).toHaveBeenCalledTimes(2)
    expect(effectFn2).toHaveBeenLastCalledWith('B')

    signal1.set(false)
    expect(effectFn1).toHaveBeenCalledTimes(3)
    expect(effectFn2).toHaveBeenCalledTimes(2)
    expect(effectFn2).toHaveBeenLastCalledWith('B')

    signal2.set('C')
    expect(effectFn1).toHaveBeenCalledTimes(3)
    expect(effectFn2).toHaveBeenCalledTimes(2)
    expect(effectFn2).toHaveBeenLastCalledWith('B')

    signal2.set('D')
    expect(effectFn1).toHaveBeenCalledTimes(3)
    expect(effectFn2).toHaveBeenCalledTimes(2)
    expect(effectFn2).toHaveBeenLastCalledWith('B')

    signal1.set(true)
    expect(effectFn1).toHaveBeenCalledTimes(4)
    expect(effectFn2).toHaveBeenCalledTimes(3)
    expect(effectFn2).toHaveBeenLastCalledWith('D')
  })

  it('should run nested useEffect', () => {
    const disposeFn = vi.fn()
    const effectFn = vi.fn(() => disposeFn)

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        useEffect(host, effectFn)
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    expect(effectFn).toHaveBeenCalledTimes(0)
    expect(disposeFn).toHaveBeenCalledTimes(0)

    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(1)
    expect(disposeFn).toHaveBeenCalledTimes(0)

    element.remove()
    expect(effectFn).toHaveBeenCalledTimes(1)
    expect(disposeFn).toHaveBeenCalledTimes(1)
  })

  it('should run effect when host is connected', async () => {
    const disposeFn = vi.fn()
    const effectFn = vi.fn(() => disposeFn)
    const { resolve, promise } = Promise.withResolvers<void>()

    const TestElement = defineCustomElement((host) => {
      useEffect(host, () => {
        void promise.then(() => {
          useEffect(host, effectFn)
        })
      })
    }, defineProps({}))

    const tagName = `test-effect-${getId()}`
    customElements.define(tagName, TestElement)

    const element = document.createElement(tagName)
    expect(effectFn).toHaveBeenCalledTimes(0)
    expect(disposeFn).toHaveBeenCalledTimes(0)

    document.body.appendChild(element)

    expect(effectFn).toHaveBeenCalledTimes(0)
    expect(disposeFn).toHaveBeenCalledTimes(0)

    resolve()
    await promise

    expect(effectFn).toHaveBeenCalledTimes(1)
    expect(disposeFn).toHaveBeenCalledTimes(0)

    element.remove()
    expect(effectFn).toHaveBeenCalledTimes(1)
    expect(disposeFn).toHaveBeenCalledTimes(1)
  })
})
