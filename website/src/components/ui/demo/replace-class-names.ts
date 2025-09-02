import { getClasses } from '../../../../build/load-classes'

const classes = getClasses()

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
