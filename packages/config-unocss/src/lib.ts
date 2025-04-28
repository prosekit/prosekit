import * as Classes from './classes' with { type: 'macro' }

const mapping: Record<string, string> = Classes

export function replaceClassNames(code: string) {
  return code.replaceAll(
    /(CSS_[\dA-Z_]+)/g,
    (match) => {
      const input = match[1]
      const output = mapping[input]
      if (!output) {
        throw new Error(`Unable to find class name: ${input}`)
      }
      return output
    },
  )
}
