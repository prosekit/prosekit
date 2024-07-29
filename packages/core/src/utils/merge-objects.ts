import { removeUndefinedValues } from './remove-undefined-values'
import { isNotNullish } from './type-assertion'

export function mergeObjects<T extends object>(
  ...objects: Array<Partial<T> | null | undefined>
): Partial<T> {
  const filteredObjects = objects
    .filter(isNotNullish)
    .map(removeUndefinedValues)
  return Object.assign({}, ...filteredObjects) as Partial<T>
}
