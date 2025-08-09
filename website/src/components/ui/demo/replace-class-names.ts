import { once } from '@ocavue/utils'
import { loadClasses } from '@prosekit/config-unocss/files'

const getClasses = once(loadClasses)

export function replaceClassNames(code: string): string {
  const classes = getClasses()
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
