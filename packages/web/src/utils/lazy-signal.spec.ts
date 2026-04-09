import { computed, createSignal, type Signal } from '@aria-ui/core'
import { describe, expect, it } from 'vitest'

import { createLazySignal } from './lazy-signal.ts'

describe('createLazySignal', () => {
  it('returns fallback when remote is undefined', () => {
    const lazy = createLazySignal<number>(() => undefined, 42)
    expect(lazy.get()).toBe(42)
  })

  it('delegates get to remote when resolved', () => {
    const real = createSignal(10)
    const lazy = createLazySignal<number>(() => real, 0)
    expect(lazy.get()).toBe(10)
  })

  it('delegates set to remote when resolved', () => {
    const real = createSignal(10)
    const lazy = createLazySignal<number>(() => real, 0)
    lazy.set(20)
    expect(real.get()).toBe(20)
  })

  it('set is a no-op when remote is undefined', () => {
    const lazy = createLazySignal<number>(() => undefined, 42)
    expect(() => lazy.set(99)).not.toThrow()
    expect(lazy.get()).toBe(42)
  })

  it('propagates reactivity when remote is bound late', () => {
    const source = createSignal<Signal<number> | undefined>(undefined)
    const lazy = createLazySignal<number>(() => source.get(), 0)
    const derived = computed(() => lazy.get())

    expect(derived()).toBe(0)

    const real = createSignal(42)
    source.set(real)
    expect(derived()).toBe(42)

    real.set(100)
    expect(derived()).toBe(100)

    real.set(200)
    expect(derived()).toBe(200)
  })

  it('releases old dependency when remote is reparented', () => {
    const source = createSignal<Signal<number> | undefined>(undefined)
    const lazy = createLazySignal<number>(() => source.get(), 0)
    const derived = computed(() => lazy.get())

    const a = createSignal(1)
    source.set(a)
    expect(derived()).toBe(1)

    const b = createSignal(100)
    source.set(b)
    expect(derived()).toBe(100)

    a.set(999)
    expect(derived()).toBe(100)

    b.set(200)
    expect(derived()).toBe(200)
  })
})
