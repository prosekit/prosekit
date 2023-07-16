/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { SchemaSpec } from '@prosekit/pm/model'

import type { StateConfigCallback, ViewProps } from '../types/editor'
import type { Extension } from '../types/extension'
import { Priority } from '../types/priority'

import { Facet, FacetExtension, sortFacets } from './facet'
import {
  type CommandSlotInput,
  commandSlot,
  schemaSlot,
  stateSlot,
  viewSlot,
} from './slot'

export function flatten(root: Extension) {
  type Input = unknown
  type PriorityArray<T> = [T[], T[], T[], T[], T[]]
  type PriorityInputs = PriorityArray<Input>

  const extensions: Extension[] = [root]
  const priorities: Priority[] = [Priority.default]

  const facets: Array<Facet<any, any>> = []
  const inputs: Array<PriorityInputs> = []

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
      throw new Error('Invalid extension')
    }
  }

  let schemaInput: SchemaSpec | null = null
  let stateInput: StateConfigCallback | null = null
  let viewInput: ViewProps | null = null
  let commandInput: CommandSlotInput | null = null

  const sortedFacets = sortFacets(facets)

  for (const facet of sortedFacets) {
    const nextFacet = facet.next

    if (nextFacet) {
      for (let pri = 0; pri < 5; pri++) {
        const input = inputs[facet.index][pri]
        if (input.length > 0) {
          const output = facet.combine(input)
          if (!inputs[nextFacet.index]) {
            inputs[nextFacet.index] = [[], [], [], [], []]
          }
          inputs[nextFacet.index][pri].push(output)
        }
      }
    } else if (inputs[facet.index]) {
      const [i1, i2, i3, i4, i5] = inputs[facet.index]
      const jointInputs = [...i1, ...i2, ...i3, ...i4, ...i5]
      const output = facet.combine(jointInputs)

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
        default:
          throw new Error('Invalid facet')
      }
    }
  }

  return { schemaInput, stateInput, viewInput, commandInput }
}
