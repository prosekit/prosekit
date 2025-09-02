import * as classesModule from '../../../../build/classes'

const classes = classesModule as Record<string, string>

export function replaceClassNames(code: string): string {
  return code.replaceAll(
    /(CSS_[\dA-Z_]+)/g,
    (match) => {
      const output = classes[match]
      if (!output) {
        throw new Error(`Unable to find class name: "${match}"`)
      }
      return output
    },
  )
}
