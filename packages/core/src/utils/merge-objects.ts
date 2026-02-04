import { isNotNullish } from '@ocavue/utils'

import { removeUndefinedValues } from './remove-undefined-values'

export function mergeObjects<T extends object>(
  ...objects: Array<Partial<T> | null | undefined>
): Partial<T> {
  const filteredObjects = objects
    .filter(isNotNullish)
    .map(removeUndefinedValues)
  return Object.assign({}, ...filteredObjects) as Partial<T>
}
