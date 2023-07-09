import { Command } from '@prosekit/pm/state'
import { describe, it } from 'vitest'

import { addCommands, addMarkSpec, addNodeSpec } from '..'
import { assertTypeEqual } from '../types/assert-type-equal'
import { CommandCreator } from '../types/command'
import { Extension } from '../types/extension'

import { defineExtension } from './type-utils'

describe('defineExtension', () => {
  it('can merge one extension types', () => {
    const input = [extension3]
    const output = defineExtension(input)
    type Outout = typeof output
    type Expected = Extension<{
      NODES: 'node3'
    }>

    assertTypeEqual<Outout, Expected>(true)
  })

  it('can merge an extension array', () => {
    const input = [extension1, extension2, extension3, extension4, extension5]
    const output = defineExtension(input)
    type Outout = typeof output
    type Expected = Extension<{
      NODES: 'node3' | 'node4'
      MARKS: 'mark5'
      COMMAND_ARGS: {
        command1: [{ arg1: string }]
        command2: [{ arg2: number }]
        command3: [number, boolean]
      }
    }>

    assertTypeEqual<Outout, Expected>(true)
  })

  it('can merge a nested array', () => {
    const e12 = defineExtension([extension1, extension2])
    const e34 = defineExtension([extension3, extension4])
    const e12345 = defineExtension([e12, e34, extension5])

    const input = defineExtension([e12345])
    const output = defineExtension(input)
    type Outout = typeof output
    type Expected = Extension<{
      NODES: 'node3' | 'node4'
      MARKS: 'mark5'
      COMMAND_ARGS: {
        command1: [{ arg1: string }]
        command2: [{ arg2: number }]
        command3: [number, boolean]
      }
    }>

    assertTypeEqual<Outout, Expected>(true)
  })
})

type Command1 = (args: { arg1: string }) => Command

const command1: Command1 = () => {
  return () => true
}

function command2(_args: { arg2: number }): Command {
  return () => true
}

const command3: CommandCreator<[number, boolean]> = (_num, _bool) => {
  return () => true
}

const extension1 = addCommands({ command1 })
const extension2 = addCommands({ command2, command3 })
const extension3 = addNodeSpec({ name: 'node3', spec: {} })
const extension4 = addNodeSpec({ name: 'node4', spec: {} })
const extension5 = addMarkSpec({ name: 'mark5', spec: {} })
