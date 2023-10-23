/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { SchemaSpec } from '@prosekit/pm/model'

import { ProseKitError } from '../error'
import type { StateConfigCallback, ViewProps } from '../types/editor'
import type { Extension } from '../types/extension'
import { Priority } from '../types/priority'
import { uniqPush, uniqRemove } from '../utils/uniq-array'

import { Facet, FacetExtension, sortFacets } from './facet'
import type { AnySlot } from './slot'
import {
  commandSlot,
  schemaSlot,
  stateSlot,
  viewSlot,
  type CommandSlotInput,
  payloadSlot,
  type PayloadSlotInput,
} from './slots'

type Input = unknown
type InputTuple = [Input[], Input[], Input[], Input[], Input[]]
export type Inputs = InputTuple[]

type SlotTuple = [
  AnySlot | undefined,
  AnySlot | undefined,
  AnySlot | undefined,
  AnySlot | undefined,
  AnySlot | undefined,
]
export type Slots = SlotTuple[]

type Facets = Facet<any, any>[]

function flattenInputTuple(inputTuple: InputTuple): Input[] {
  return [
    ...inputTuple[0],
    ...inputTuple[1],
    ...inputTuple[2],
    ...inputTuple[3],
    ...inputTuple[4],
  ]
}

function mergeInputTuple(tupleA: InputTuple, tupleB: InputTuple): InputTuple {
  if (!tupleA) return tupleB
  if (!tupleB) return tupleA

  const [a0, a1, a2, a3, a4] = tupleA
  const [b0, b1, b2, b3, b4] = tupleB

  return [
    uniqPush(a0, b0),
    uniqPush(a1, b1),
    uniqPush(a2, b2),
    uniqPush(a3, b3),
    uniqPush(a4, b4),
  ]
}

function removeInputTuple(tupleA: InputTuple, tupleB: InputTuple): InputTuple {
  if (!tupleA) return [[], [], [], [], []]
  if (!tupleB) return tupleA

  const [a0, a1, a2, a3, a4] = tupleA
  const [b0, b1, b2, b3, b4] = tupleB

  return [
    uniqRemove(a0, b0),
    uniqRemove(a1, b1),
    uniqRemove(a2, b2),
    uniqRemove(a3, b3),
    uniqRemove(a4, b4),
  ]
}

function extractFacets(root: Extension) {
  const extensions: Extension[] = [root]
  const priorities: Priority[] = [Priority.default]

  const facets: Facets = []
  const inputs: Inputs = []

  while (extensions.length > 0) {
    const ext = extensions.pop()!
    const pri = priorities.pop()!

    if (ext instanceof FacetExtension) {
      const facet = ext.facet
      if (!facets[facet.index]) {
        facets[facet.index] = facet
        inputs[facet.index] = [[], [], [], [], []]
      }
      const facetInputs: Input[] = ext.inputs
      inputs[facet.index][pri].push(...facetInputs)
    } else if (ext.extension) {
      const p = ext.priority ?? pri
      if (Array.isArray(ext.extension)) {
        for (const e of ext.extension) {
          extensions.push(e)
          priorities.push(p)
        }
      } else {
        extensions.push(ext.extension)
        priorities.push(p)
      }
    } else {
      throw new ProseKitError('Invalid extension')
    }
  }

  return [facets, inputs] as const
}

export function updateExtension(
  prevInputs: Inputs,
  prevSlots: Slots,
  extension: Extension,
  mode: 'add' | 'remove',
) {
  const modifyInputTuple = mode === 'add' ? mergeInputTuple : removeInputTuple

  const [facets, inputs] = extractFacets(extension)

  let schemaInput: SchemaSpec | null = null
  let stateInput: StateConfigCallback | null = null
  let viewInput: ViewProps | null = null
  let commandInput: CommandSlotInput | null = null
  let payloadInput: PayloadSlotInput | null = null

  for (const facet of sortFacets(facets)) {
    if (!inputs[facet.index]) {
      continue
    }

    const inputTuple = modifyInputTuple(
      prevInputs[facet.index],
      inputs[facet.index],
    )
    prevInputs[facet.index] = inputTuple

    if (facet.next && !facet.single) {
      let hasOutput = false

      const outputTuple: InputTuple = [[], [], [], [], []]

      for (let pri = 0; pri < 5; pri++) {
        const inputArray = inputTuple[pri]
        if (inputArray.length === 0) {
          continue
        }

        const slotTuple =
          prevSlots[facet.index] ||
          (prevSlots[facet.index] = [
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
          ])
        const prevSlot = slotTuple[pri]
        const slot = prevSlot || facet.slot()
        prevSlots[facet.index][pri] = slot

        const output = prevSlot
          ? slot.update(inputArray)
          : slot.create(inputArray)

        if (!output) {
          continue
        }

        hasOutput = true
        outputTuple[pri].push(output)
      }

      if (!hasOutput) {
        continue
      }

      inputs[facet.next.index] = modifyInputTuple(
        inputs[facet.next.index],
        outputTuple,
      )

      continue
    } else {
      const inputArray: Input[] = flattenInputTuple(inputTuple)
      const slotTuple =
        prevSlots[facet.index] ||
        (prevSlots[facet.index] = [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ])
      const prevSlot = slotTuple[Priority.default]
      const slot = prevSlot || facet.slot()
      prevSlots[facet.index][Priority.default] = slot

      const output = prevSlot
        ? slot.update(inputArray)
        : slot.create(inputArray)

      if (!output) {
        continue
      }

      const outputTuple: InputTuple = [[], [], [output], [], []]

      if (facet.next) {
        inputs[facet.next.index] = modifyInputTuple(
          inputs[facet.next.index],
          outputTuple,
        )
        continue
      } else {
        switch (facet) {
          case schemaSlot:
            schemaInput = output
            break
          case stateSlot:
            stateInput = output
            break
          case viewSlot:
            viewInput = output
            break
          case commandSlot:
            commandInput = output
            break
          case payloadSlot:
            payloadInput = output
            break
          default:
            throw new ProseKitError('Invalid facet')
        }
      }
    }
  }

  return { schemaInput, stateInput, viewInput, commandInput, payloadInput }
}
