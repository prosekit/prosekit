import * as Themes from './classes'
import { replaceShortcuts } from './utils/replace'

function replaceImport(code: string) {
  return code.replace(
    /import\s*{\s*Themes\s*}\s*from\s*["']@prosekit\/themes["'];?\n/m,
    '',
  )
}

export function replaceThemes(code: string) {
  return replaceImport(replaceShortcuts(code, Themes))
}
