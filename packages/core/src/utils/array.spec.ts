import { describe, expect, it } from 'vitest'

import { arraySubtract, toReversed, uniqPush } from './array'

describe('array utilities', () => {
  describe('uniqPush', () => {
    it('merges arrays without duplicates', () => {
      expect(uniqPush([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
    })

    it('removes duplicates', () => {
      expect(uniqPush([1, 2], [2, 3])).toEqual([1, 2, 3])
    })

    it('handles empty arrays', () => {
      expect(uniqPush([], [1, 2])).toEqual([1, 2])
      expect(uniqPush([1, 2], [])).toEqual([1, 2])
    })
  })

  describe('arraySubtract', () => {
    it('subtracts second array from first', () => {
      expect(arraySubtract([1, 2, 3, 4], [2, 4])).toEqual([1, 3])
    })

    it('handles empty arrays', () => {
      expect(arraySubtract([1, 2, 3], [])).toEqual([1, 2, 3])
      expect(arraySubtract([], [1, 2])).toEqual([])
    })

    it('handles no overlap', () => {
      expect(arraySubtract([1, 2], [3, 4])).toEqual([1, 2])
    })
  })

  describe('toReversed', () => {
    it('reverses array', () => {
      expect(toReversed([1, 2, 3])).toEqual([3, 2, 1])
    })

    it('handles empty array', () => {
      expect(toReversed([])).toEqual([])
    })

    it('handles single element', () => {
      expect(toReversed([1])).toEqual([1])
    })
  })
})
