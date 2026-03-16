import { describe, expect, it } from 'vitest'

import { useId } from './use-id.ts'

describe('useId', () => {
  it('should return a unique id', () => {
    const id1 = useId()
    const id2 = useId()
    expect(id1).toMatch(/aria-ui-id-\d+/)
    expect(id2).toMatch(/aria-ui-id-\d+/)
    expect(id1).not.toEqual(id2)
  })
})
