import classes from '@prosekit/config-unocss/lib/classes.gen.json' with { type: 'json' }

if (!classes || typeof classes !== 'object') {
  throw new TypeError('Unable to import classes.gen.json')
}

export function replaceClassNames(code: string): string {
  return code.replaceAll(
    /(CSS_[\dA-Z_]+)/g,
    (match) => {
      const output = (classes as Record<string, string>)[match]
      if (!output) {
        throw new Error(`Unable to find class name: ${match}`)
      }
      return output
    },
  )
}
