import { test } from 'vitest'

import { assertTypeEqual } from './assert-type-equal'
import type {
  Extension,
  PickKnownCommandTyping,
  PickStringLiteral,
  UnionExtension,
} from './extension'

test('PickStringLiteral', () => {
  assertTypeEqual<PickStringLiteral<'foo'>, 'foo'>(true)
  assertTypeEqual<PickStringLiteral<'foo' | 'bar'>, 'foo' | 'bar'>(true)
  assertTypeEqual<PickStringLiteral<string>, never>(true)
})

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
  type E1 = Extension<{ Nodes: 'foo'; Marks: never; Commands: never }>
  type E2 = Extension<{ Nodes: 'bar'; Marks: never; Commands: never }>
  type E3 = Extension<{ Nodes: never; Marks: 'baz'; Commands: never }>
  type E4 = Extension<{ Nodes: never; Marks: never; Commands: { a: [''] } }>
  type E5 = Extension<{
    Nodes: 'Foo'
    Marks: never
    Commands: { b: [string, number]; c: [{ c: boolean }] }
  }>
  type E6 = Extension<{ Nodes: never; Marks: never; Commands: never }>
  type E7 = Extension<{ Nodes: any; Marks: any; Commands: any }>
  type E = [E1, E2, E3, E4, E5, E6, E7]

  type Received = UnionExtension<E>
  type Expected = Extension<{
    Nodes: 'bar' | 'foo' | 'Foo'
    Marks: 'baz'
    Commands: {
      a: ['']
      b: [string, number]
      c: [{ c: boolean }]
    }
  }>

  assertTypeEqual<Received, Expected>(true)
})
