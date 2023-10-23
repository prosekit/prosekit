import { Facet } from '../editor/facet'
import { payloadSlot, type PayloadSlotInput } from '../editor/slots'
import type { Extension } from '../types/extension'

export function definePayload(options: {
  type: string
  payload: unknown
}): Extension {
  return payloadFacet.extension([options])
}

interface PayloadOptions {
  type: string
  payload: unknown
}

const payloadFacet = Facet.define<PayloadOptions, PayloadSlotInput>({
  combine: (options: PayloadOptions[]): PayloadSlotInput => {
    const output: PayloadSlotInput = {}

    for (const { type, payload } of options) {
      ;(output[type] ??= []).push(payload)
    }

    return output
  },
  next: payloadSlot,
})
