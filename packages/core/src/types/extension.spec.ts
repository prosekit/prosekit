import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal'
import type {
  Extension,
  PickKnownCommandTyping,
  UnionExtension,
} from './extension'

test('PickKnownCommandTyping', () => {
  assertTypeEqual<
    PickKnownCommandTyping<{
      foo: ['bar']
    }>,
    { foo: ['bar'] }
  >(true)
  assertTypeEqual<PickKnownCommandTyping<{ [x: string]: any }>, never>(true)
})

test('ExtractTyping', () => {
  type E1 = Extension<{
    Nodes: { foo: { attr1: string } }
    Marks: never
    Commands: never
  }>
  type E2 = Extension<{
    Nodes: { foo: { attr2: number } }
    Marks: never
    Commands: never
  }>
  type E3 = Extension<{
    Nodes: never
    Marks: { bar: { attr3: boolean } }
    Commands: never
  }>
  type E4 = Extension<{
    Nodes: never
    Marks: never
    Commands: { a: [''] }
  }>
  type E5 = Extension<{
    Nodes: { baz: { attr4: null } }
    Marks: never
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

  type Received = UnionExtension<E>
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
