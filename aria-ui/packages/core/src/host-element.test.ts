import { getId } from '@ocavue/utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { HostElement } from './host-element.ts'

describe('HostElement', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should handle connect/disconnect without any controllers', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    document.body.appendChild(element)
    element.remove()
  })

  it('should call hostConnected when adding controller to connected element', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement
    document.body.appendChild(element)

    const hostConnected = vi.fn()
    const controller = { hostConnected }

    element.addController(controller)

    expect(hostConnected).toHaveBeenCalledTimes(1)
  })

  it('should not call hostConnected when adding controller to disconnected element', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const hostConnected = vi.fn()
    const controller = { hostConnected }

    element.addController(controller)

    expect(hostConnected).not.toHaveBeenCalled()
  })

  it('should call hostConnected on all controllers when element connects', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const hostConnected1 = vi.fn()
    const hostConnected2 = vi.fn()
    element.addController({ hostConnected: hostConnected1 })
    element.addController({ hostConnected: hostConnected2 })

    document.body.appendChild(element)

    expect(hostConnected1).toHaveBeenCalledTimes(1)
    expect(hostConnected2).toHaveBeenCalledTimes(1)
  })

  it('should call hostDisconnected on all controllers when element disconnects', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const hostDisconnected1 = vi.fn()
    const hostDisconnected2 = vi.fn()
    element.addController({ hostDisconnected: hostDisconnected1 })
    element.addController({ hostDisconnected: hostDisconnected2 })

    document.body.appendChild(element)
    element.remove()

    expect(hostDisconnected1).toHaveBeenCalledTimes(1)
    expect(hostDisconnected2).toHaveBeenCalledTimes(1)
  })

  it('should remove controller and not call its callbacks after removal', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const hostConnected = vi.fn()
    const hostDisconnected = vi.fn()
    const controller = { hostConnected, hostDisconnected }

    element.addController(controller)
    element.removeController(controller)

    document.body.appendChild(element)
    expect(hostConnected).not.toHaveBeenCalled()

    element.remove()
    expect(hostDisconnected).not.toHaveBeenCalled()
  })

  it('should handle controllers without optional callbacks', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const controller = {}
    element.addController(controller)

    // Should not throw
    document.body.appendChild(element)
    element.remove()
  })

  it('should handle removeController when no controllers exist', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    // Should not throw
    element.removeController({})
  })

  it('should handle nested addController in hostConnected', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const innerHostConnected = vi.fn()
    const outerHostConnected = vi.fn(() => {
      element.addController({ hostConnected: innerHostConnected })
    })

    element.addController({ hostConnected: outerHostConnected })
    document.body.appendChild(element)

    expect(outerHostConnected).toHaveBeenCalledTimes(1)
    // Inner controller should be called exactly once (by addController since isConnected is true)
    expect(innerHostConnected).toHaveBeenCalledTimes(1)
  })

  it('should handle nested addController in hostDisconnected', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const innerHostDisconnected = vi.fn()
    const outerHostDisconnected = vi.fn(() => {
      element.addController({ hostDisconnected: innerHostDisconnected })
    })

    element.addController({ hostDisconnected: outerHostDisconnected })
    document.body.appendChild(element)
    element.remove()

    expect(outerHostDisconnected).toHaveBeenCalledTimes(1)
    // Inner controller was added during disconnect, so its hostDisconnected should not be called
    expect(innerHostDisconnected).not.toHaveBeenCalled()
  })

  it('should handle deeply nested addController calls', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const level3Connected = vi.fn()
    const level2Connected = vi.fn(() => {
      element.addController({ hostConnected: level3Connected })
    })
    const level1Connected = vi.fn(() => {
      element.addController({ hostConnected: level2Connected })
    })

    element.addController({ hostConnected: level1Connected })
    document.body.appendChild(element)

    expect(level1Connected).toHaveBeenCalledTimes(1)
    expect(level2Connected).toHaveBeenCalledTimes(1)
    expect(level3Connected).toHaveBeenCalledTimes(1)
  })

  it('should handle reconnection', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const hostConnected = vi.fn()
    const hostDisconnected = vi.fn()
    element.addController({ hostConnected, hostDisconnected })

    document.body.appendChild(element)
    expect(hostConnected).toHaveBeenCalledTimes(1)
    expect(hostDisconnected).toHaveBeenCalledTimes(0)

    element.remove()
    expect(hostConnected).toHaveBeenCalledTimes(1)
    expect(hostDisconnected).toHaveBeenCalledTimes(1)

    document.body.appendChild(element)
    expect(hostConnected).toHaveBeenCalledTimes(2)
    expect(hostDisconnected).toHaveBeenCalledTimes(1)

    element.remove()
    expect(hostConnected).toHaveBeenCalledTimes(2)
    expect(hostDisconnected).toHaveBeenCalledTimes(2)
  })

  it('should handle removing controller during hostConnected iteration', () => {
    const tagName = `test-host-${getId()}`
    customElements.define(tagName, class extends HostElement {})

    const element = document.createElement(tagName) as HostElement

    const controller2Connected = vi.fn()
    const controller2 = { hostConnected: controller2Connected }

    const controller1Connected = vi.fn(() => {
      element.removeController(controller2)
    })

    element.addController({ hostConnected: controller1Connected })
    element.addController(controller2)

    document.body.appendChild(element)

    expect(controller1Connected).toHaveBeenCalledTimes(1)
    // controller2 was removed during iteration, but since we snapshot the array,
    // it should still be called
    expect(controller2Connected).toHaveBeenCalledTimes(1)
  })
})
