import fs from 'node:fs'
import path from 'node:path'

import { findRootSync } from '@manypkg/find-root'

const root = findRootSync(process.cwd()).rootDir

const jsonString = fs.readFileSync(path.join(root, 'packages/config-unocss/lib/classes.gen.json'), 'utf-8')

const classes = JSON.parse(jsonString) as Record<string, string>

export function replaceClassNames(code: string): string {
  return code.replaceAll(
    /(CSS_[\dA-Z_]+)/g,
    (match) => {
      const input = match[1]
      const output = classes[input]
      if (!output) {
        throw new Error(`Unable to find class name: ${input}`)
      }
      return output
    },
  )
}
