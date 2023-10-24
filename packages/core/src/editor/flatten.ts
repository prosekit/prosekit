/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ProseKitError } from '../error'
import { commandFacet, type CommandPayload } from '../facets/command'
import {
  Facet,
  FacetExtension,
  getFacetCount,
  type FacetConverter,
} from '../facets/facet'
import { schemaFacet, type SchemaPayload } from '../facets/schema'
import { stateFacet, type StatePayload } from '../facets/state'
import { viewFacet, type ViewPayload } from '../facets/view'
import type { Extension } from '../types/extension'
import { Priority } from '../types/priority'
import { uniqPush, uniqRemove } from '../utils/uniq-array'

type Tuple5<T> = [T, T, T, T, T]

type Payload = unknown
type PayloadTuple = Tuple5<Payload[]>
export type Payloads = PayloadTuple[]

type ConverterTuple = Tuple5<FacetConverter | undefined>
export type Converters = ConverterTuple[]

type Facets = Facet<any, any>[]

function flattenInputTuple(inputTuple: PayloadTuple): Payload[] {
  return [
    ...inputTuple[0],
    ...inputTuple[1],
    ...inputTuple[2],
    ...inputTuple[3],
    ...inputTuple[4],
  ]
}

function mergeInputTuple(
  tupleA: PayloadTuple,
  tupleB: PayloadTuple,
): PayloadTuple {
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

function removeInputTuple(
  tupleA: PayloadTuple,
  tupleB: PayloadTuple,
): PayloadTuple {
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
  const payloads: Payloads = []

  while (extensions.length > 0) {
    const ext = extensions.pop()!
    const pri = priorities.pop()!

    if (ext instanceof FacetExtension) {
      const facet = ext.facet
      if (!facets[facet.index]) {
        facets[facet.index] = facet
        payloads[facet.index] = [[], [], [], [], []]
      }
      const facetPayloads: Payload[] = ext.payloads
      payloads[facet.index][pri].push(...facetPayloads)
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

  return [facets, payloads] as const
}

export function updateExtension(
  prevInputs: Payloads,
  prevConverters: Converters,
  extension: Extension,
  mode: 'add' | 'remove',
) {
  const modifyInputTuple = mode === 'add' ? mergeInputTuple : removeInputTuple

  const [facets, inputs] = extractFacets(extension)

  let schemaInput: SchemaPayload | null = null
  let stateInput: StatePayload | null = null
  let viewInput: ViewPayload | null = null
  let commandInput: CommandPayload | null = null

  for (let index = getFacetCount(); index >= 0; index--) {
    const facet = facets[index]
    if (!facet) {
      continue
    }

    const nextFacet = facet.next
    if (nextFacet) {
      facets[nextFacet.index] ||= nextFacet
    }

    if (!inputs[facet.index]) {
      continue
    }

    const inputTuple = modifyInputTuple(prevInputs[index], inputs[index])
    prevInputs[index] = inputTuple

    if (facet.next && !facet.singleton) {
      let hasOutput = false

      const outputTuple: PayloadTuple = [[], [], [], [], []]

      for (let pri = 0; pri < 5; pri++) {
        const inputArray = inputTuple[pri]
        if (inputArray.length === 0) {
          continue
        }
        const converterTuple = (prevConverters[index] ||= [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ])
        const prevConverter = converterTuple[pri]
        const converter = prevConverter || facet.converter()
        prevConverters[index][pri] = converter

        const output = prevConverter
          ? converter.update(inputArray)
          : converter.create(inputArray)

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
      const inputArray: Payload[] = flattenInputTuple(inputTuple)
      prevConverters[index] ||= [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]
      const prevConverter = prevConverters[index][Priority.default]
      const converter = prevConverter || facet.converter()
      prevConverters[index][Priority.default] = converter

      const output = prevConverter
        ? converter.update(inputArray)
        : converter.create(inputArray)

      if (!output) {
        continue
      }

      // A singleton facet
      if (facet.next) {
        const outputTuple: PayloadTuple = [[], [], [output], [], []]
        inputs[facet.next.index] = modifyInputTuple(
          inputs[facet.next.index],
          outputTuple,
        )
      }

      // A root facet
      else {
        switch (facet) {
          case schemaFacet:
            schemaInput = output
            break
          case stateFacet:
            stateInput = output
            break
          case viewFacet:
            viewInput = output
            break
          case commandFacet:
            commandInput = output
            break
          default:
            throw new ProseKitError('Invalid root facet')
        }
      }
    }
  }

  return { schemaInput, stateInput, viewInput, commandInput }
}
