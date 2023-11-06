import { type Command } from '@prosekit/pm/state'
import { describe, it } from 'vitest'

import { defineCommands } from '../extensions/command'
import { defineMarkSpec } from '../extensions/mark-spec'
import { defineNodeSpec } from '../extensions/node-spec'
import { assertTypeEqual } from '../types/assert-type-equal'
import { type CommandCreator } from '../types/command'
import { type Extension } from '../types/extension'

import { union } from './union'

describe('union', () => {
  it('can merge one extension types', () => {
    const input = [extension3]
    const output = union(input)
    type Outout = typeof output
    type Expected = Extension<{
      NODES: 'node3'
    }>

    assertTypeEqual<Outout, Expected>(true)
  })

  it('can merge an extension array', () => {
    const input = [extension1, extension2, extension3, extension4, extension5]
    const output = union(input)
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
    const e12 = union([extension1, extension2])
    const e34 = union([extension3, extension4])
    const e12345 = union([e12, e34, extension5])

    const input = union([e12345])
    const output = union(input)
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

const extension1 = defineCommands({ command1 })
const extension2 = defineCommands({ command2, command3 })
const extension3 = defineNodeSpec({ name: 'node3' })
const extension4 = defineNodeSpec({ name: 'node4' })
const extension5 = defineMarkSpec({ name: 'mark5' })
