import { ProseKitError } from '../error'
import type { Extension } from '../types/extension'

/** @public */
export interface FacetConverter<Input = any, Output = any> {
  create: (inputs: Input[]) => Output
  update: (inputs: Input[]) => Output | null
}

/** @public */
export interface FacetOptions<Input, Output> {
  convert?: (payloads: Input[]) => Output
  converter?: () => FacetConverter<Input, Output>
  next: Facet<Output, any>
}

let facetCount = 0

export function getFacetCount() {
  return facetCount
}

/** @public */
export class Facet<Input, Output> {
  /** @internal */
  readonly index = facetCount++
  /** @internal */
  readonly converter: () => FacetConverter<Input, Output>
  /** @internal */
  readonly next: Facet<Output, any> | null

  private constructor(
    converter: () => FacetConverter<Input, Output>,
    next: Facet<Output, any> | null,
  ) {
    this.converter = converter
    this.next = next
  }

  static define<Input, Output>({
    converter: converter,
    convert: convert,
    next,
  }: FacetOptions<Input, Output>) {
    // TODO: Remove combine
    const converterFunction = converter
      ? converter
      : convert
      ? () => ({
          create: convert,
          update: convert,
        })
      : null

    if (!converterFunction) {
      throw new ProseKitError("Facet must have either 'convert' or 'converter'")
    }

    return new Facet<Input, Output>(converterFunction, next)
  }

  /** @internal */
  static defineRootFacet<Input>(
    options: Omit<FacetOptions<Input, Input>, 'next'>,
  ) {
    // @ts-expect-error: next is empty here
    return Facet.define(options)
  }

  extension(payloads: Input[]): FacetExtension<Input, Output> {
    return new FacetExtension(this, payloads)
  }
}

/** @public */
export class FacetExtension<Input, Output> {
  declare extension: Extension
  constructor(
    readonly facet: Facet<Input, Output>,
    readonly payloads: Input[],
  ) {}
}
