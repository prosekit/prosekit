import { ProseKitError } from '../error'
import type { Extension } from '../types/extension'

import { BaseExtension } from './base-extension'

/**
 * @public
 */
export interface FacetConverter<Input = any, Output = any> {
  create: (inputs: Input[]) => Output
  update: (inputs: Input[]) => Output | null
}

/**
 * @public
 */
export interface FacetOptions<Input, Output> {
  convert?: (payloads: Input[]) => Output
  converter?: () => FacetConverter<Input, Output>
  next: Facet<Output, any>

  // Set this to true if you only want to keep one facet payload. For example, this facet corresponds to a ProseMirror plugin with a key.œ
  singleton?: boolean
}

let facetCount = 0

export function getFacetCount() {
  return facetCount
}

/**
 * @public
 */
export class Facet<Input, Output> {
  /**
   * @internal
   */
  readonly index = facetCount++
  /**
   * @internal
   */
  readonly converter: () => FacetConverter<Input, Output>
  /**
   * @internal
   */
  readonly next: Facet<Output, any> | null
  /**
   * @internal
   */
  readonly singleton: boolean
  /**
   * @internal
   */
  public isSchema = false

  private constructor(
    converter: () => FacetConverter<Input, Output>,
    next: Facet<Output, any> | null,
    singleton: boolean,
  ) {
    this.converter = converter
    this.next = next
    this.singleton = singleton
  }

  static define<Input, Output>({
    converter,
    convert,
    next,
    singleton,
  }: FacetOptions<Input, Output>) {
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

    return new Facet<Input, Output>(converterFunction, next, singleton ?? false)
  }

  /**
   * @internal
   */
  static defineRootFacet<Input>(
    options: Omit<FacetOptions<Input, Input>, 'next'>,
  ) {
    // @ts-expect-error: next is empty here
    return Facet.define(options)
  }

  extension(payloads: Input[]): Extension {
    return new FacetExtensionImpl(this, payloads)
  }
}

/**
 * @public
 */
export class FacetExtensionImpl<Input, Output> extends BaseExtension {
  declare extension: Extension

  public hasSchema: boolean
  public schema = null

  constructor(
    readonly facet: Facet<Input, Output>,
    readonly payloads: Input[],
  ) {
    super()
    this.hasSchema = !!(facet.isSchema || facet.next?.isSchema)
  }
}
