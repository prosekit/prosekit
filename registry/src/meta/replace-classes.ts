import { basename } from 'node:path'

import { search } from 'fast-fuzzy'

import { getClasses } from './load-classes'

const classes = getClasses()

export const CLASS_NAME_REGEXP = /(CSS_[\dA-Z_]+)/g

export function classNameReplacer(match: string, filePath?: string): string {
  const output = classes[match]
  if (output != null) {
    return output
  }

  const errorMessage = buildErrorMessage(match, filePath)
  if (process.env.NODE_ENV === 'development') {
    console.warn(errorMessage)
    return match
  } else {
    throw new Error(errorMessage)
  }
}

export function replaceClassNames(code: string, filePath?: string): string {
  return code.replaceAll(
    CLASS_NAME_REGEXP,
    (match) => {
      return classNameReplacer(match, filePath)
    },
  )
}

function buildErrorMessage(match: string, filePath?: string): string {
  const availableClassNames = Object.keys(classes)
  const messageLines: string[] = []
  if (filePath) {
    messageLines.push(`Unable to replace the class name: "${match}" in file "${filePath}".`)
  } else {
    messageLines.push(`Unable to replace the class name: "${match}".`)
  }
  const similarClassNames = search(match, availableClassNames)
  if (similarClassNames.length > 0) {
    messageLines.push(`Did you mean one of the following?`)
    messageLines.push(...similarClassNames.map((name) => `- "${name}"`))
  }
  return messageLines.map((line) => `[${filename}] ${line}`).join('\n')
}

const filename = basename(import.meta.filename)
