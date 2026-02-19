import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal.ts'
import type { Extension, Union } from './extension.ts'

test('ExtractTyping', () => {
  type E1 = Extension<{
    Nodes: { foo: { attr1: string } }
  }>
  type E2 = Extension<{
    Nodes: { foo: { attr2: number } }
  }>
  type E3 = Extension<{
    Marks: { bar: { attr3: boolean } }
  }>
  type E4 = Extension<{
    Commands: { a: [''] }
  }>
  type E5 = Extension<{
    Nodes: { baz: { attr4: null } }

    Commands: { b: [string, number]; c: [{ c: boolean }] }
  }>
  type E6 = Extension<{
    Nodes: never
    Marks: never
    Commands: never
  }>
  type E7 = Extension<{
    Nodes: any
    Marks: any
    Commands: any
  }>
  type E = [E1, E2, E3, E4, E5, E6, E7]

  type Received = Union<E>
  type Expected = Extension<{
    Nodes: {
      foo: { attr1: string; attr2: number }
      baz: { attr4: null }
    }
    Marks: {
      bar: { attr3: boolean }
    }
    Commands: {
      a: ['']
      b: [string, number]
      c: [{ c: boolean }]
    }
  }>

  assertTypeEqual<Received, Expected>(true)
})
