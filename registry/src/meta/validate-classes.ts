export function validateClasses(classes: unknown): Record<string, string> {
  if (!classes || typeof classes !== 'object') {
    throw new TypeError('Classes must be an object')
  }

  let isEmpty = true
  for (const [key, value] of Object.entries(classes)) {
    isEmpty = false
    if (typeof key !== 'string') {
      throw new TypeError(`Class name must be a string, got ${typeof key}`)
    }
    if (typeof value !== 'string') {
      throw new TypeError(`Class value must be a string, got ${typeof value}`)
    }
    if (!key.startsWith('CSS_')) {
      throw new Error(`Class name must start with CSS_`)
    }
    if (value.includes(`'`)) {
      throw new Error(`Class name ${key} must not contain '`)
    }
    if (value.includes(`"`)) {
      throw new Error(`Class name ${key} must not contain "`)
    }
    if (value.includes('`')) {
      throw new Error(`Class name ${key} must not contain \``)
    }
  }

  if (isEmpty) {
    throw new Error('Classes should not be empty')
  }

  return classes as Record<string, string>
}
