import { createSignal, type PropDeclarations, type SignalState } from '@aria-ui/core'
import { describe, expect, it } from 'vitest'

import { getStateWithDefaults } from './get-default-state.ts'

type TestProps = {
  bool: boolean
  num: number
}

describe('getStateWithDefaults', () => {
  it('keeps falsy signal values from state', () => {
    const props: PropDeclarations<TestProps> = {
      bool: { default: true },
      num: { default: 1 },
    }

    const state: Partial<SignalState<TestProps>> = {
      bool: createSignal(false),
      num: createSignal(0),
    }

    const merged = getStateWithDefaults(state, props)
    expect(merged.bool.get()).toBe(false)
    expect(merged.num.get()).toBe(0)
  })

  it('uses default value when state property is undefined', () => {
    const props: PropDeclarations<TestProps> = {
      bool: { default: true },
      num: { default: 1 },
    }

    const state: Partial<SignalState<TestProps>> = {
      bool: undefined,
    }

    const merged = getStateWithDefaults(state, props)
    expect(merged.bool.get()).toBe(true)
    expect(merged.num.get()).toBe(1)
  })
})
