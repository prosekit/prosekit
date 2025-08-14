import {
  describe,
  expect,
  it,
} from 'vitest'

import { splitTextByRegex } from './split-text-by-regex'

describe('splitTextByRegex', () => {
  it('should return undefined when no matches are found', () => {
    const result = splitTextByRegex('hello world', /\d+/g)
    expect(result).toBeUndefined()
  })

  it('should split text with single match', () => {
    const result = splitTextByRegex('hello 123 world', /\d+/g)
    expect(result).toEqual([
      ['hello ', undefined],
      ['123', expect.objectContaining({ 0: '123', index: 6 })],
      [' world', undefined],
    ])
  })

  it('should split text with multiple matches', () => {
    const result = splitTextByRegex('abc 123 def 456 ghi', /\d+/g)
    expect(result).toEqual([
      ['abc ', undefined],
      ['123', expect.objectContaining({ 0: '123', index: 4 })],
      [' def ', undefined],
      ['456', expect.objectContaining({ 0: '456', index: 12 })],
      [' ghi', undefined],
    ])
  })

  it('should handle match at the beginning', () => {
    const result = splitTextByRegex('123 hello', /\d+/g)
    expect(result).toEqual([
      ['123', expect.objectContaining({ 0: '123', index: 0 })],
      [' hello', undefined],
    ])
  })

  it('should handle match at the end', () => {
    const result = splitTextByRegex('hello 123', /\d+/g)
    expect(result).toEqual([
      ['hello ', undefined],
      ['123', expect.objectContaining({ 0: '123', index: 6 })],
    ])
  })

  it('should handle consecutive matches', () => {
    const result = splitTextByRegex('123456', /\d/g)
    expect(result).toEqual([
      ['1', expect.objectContaining({ 0: '1', index: 0 })],
      ['2', expect.objectContaining({ 0: '2', index: 1 })],
      ['3', expect.objectContaining({ 0: '3', index: 2 })],
      ['4', expect.objectContaining({ 0: '4', index: 3 })],
      ['5', expect.objectContaining({ 0: '5', index: 4 })],
      ['6', expect.objectContaining({ 0: '6', index: 5 })],
    ])
  })

  it('should handle entire string match', () => {
    const result = splitTextByRegex('123', /\d+/g)
    expect(result).toEqual([
      ['123', expect.objectContaining({ 0: '123', index: 0 })],
    ])
  })

  it('should work with URL regex', () => {
    const urlRegex = /https?:\/\/\S+/g
    const result = splitTextByRegex('Visit https://example.com for more info', urlRegex)
    expect(result).toEqual([
      ['Visit ', undefined],
      ['https://example.com', expect.objectContaining({ 0: 'https://example.com', index: 6 })],
      [' for more info', undefined],
    ])
  })

  it('should reset regex lastIndex', () => {
    const regex = /\d+/g
    regex.lastIndex = 5 // Set to non-zero
    const result = splitTextByRegex('123 456', regex)
    expect(result).toEqual([
      ['123', expect.objectContaining({ 0: '123', index: 0 })],
      [' ', undefined],
      ['456', expect.objectContaining({ 0: '456', index: 4 })],
    ])
    expect(regex.lastIndex).toBe(0) // Should be reset
  })
})
