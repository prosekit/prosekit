import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { useHover } from './use-hover.ts'

describe('useHover', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('calls onOpen immediately when openDelay is 0', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onOpen = vi.fn()
    useHover(element, { onOpen, openDelay: 0 })

    element.dispatchEvent(new MouseEvent('mouseenter'))

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  test('calls onClose immediately when closeDelay is 0', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onClose = vi.fn()
    useHover(element, { onClose, closeDelay: 0 })

    element.dispatchEvent(new MouseEvent('mouseleave'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('calls onOpen after openDelay', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onOpen = vi.fn()
    useHover(element, { onOpen, openDelay: 300 })

    element.dispatchEvent(new MouseEvent('mouseenter'))

    expect(onOpen).not.toHaveBeenCalled()

    vi.advanceTimersByTime(299)
    expect(onOpen).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  test('calls onClose after closeDelay', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onClose = vi.fn()
    useHover(element, { onClose, closeDelay: 200 })

    element.dispatchEvent(new MouseEvent('mouseleave'))

    expect(onClose).not.toHaveBeenCalled()

    vi.advanceTimersByTime(199)
    expect(onClose).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('cancels pending onOpen when mouse leaves before delay', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onOpen = vi.fn()
    const onClose = vi.fn()
    useHover(element, { onOpen, onClose, openDelay: 300, closeDelay: 0 })

    element.dispatchEvent(new MouseEvent('mouseenter'))
    vi.advanceTimersByTime(150)

    element.dispatchEvent(new MouseEvent('mouseleave'))
    vi.advanceTimersByTime(300)

    expect(onOpen).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('cancels pending onClose when mouse enters before delay', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onOpen = vi.fn()
    const onClose = vi.fn()
    useHover(element, { onOpen, onClose, openDelay: 0, closeDelay: 300 })

    element.dispatchEvent(new MouseEvent('mouseleave'))
    vi.advanceTimersByTime(150)

    element.dispatchEvent(new MouseEvent('mouseenter'))
    vi.advanceTimersByTime(300)

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('cleanup function removes event listeners', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onOpen = vi.fn()
    const cleanup = useHover(element, { onOpen, openDelay: 0 })

    cleanup()

    element.dispatchEvent(new MouseEvent('mouseenter'))

    expect(onOpen).not.toHaveBeenCalled()
  })

  test('cleanup function clears pending timeouts', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onOpen = vi.fn()
    const onClose = vi.fn()
    const cleanup = useHover(element, {
      onOpen,
      onClose,
      openDelay: 300,
      closeDelay: 300,
    })

    element.dispatchEvent(new MouseEvent('mouseenter'))
    vi.advanceTimersByTime(150)

    cleanup()

    vi.advanceTimersByTime(300)

    expect(onOpen).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })

  test('works without onOpen callback', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onClose = vi.fn()
    useHover(element, { onClose, closeDelay: 0 })

    element.dispatchEvent(new MouseEvent('mouseenter'))
    element.dispatchEvent(new MouseEvent('mouseleave'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('works without onClose callback', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const onOpen = vi.fn()
    useHover(element, { onOpen, openDelay: 0 })

    element.dispatchEvent(new MouseEvent('mouseenter'))
    element.dispatchEvent(new MouseEvent('mouseleave'))

    expect(onOpen).toHaveBeenCalledTimes(1)
  })
})
