import { Colors } from './colors'
import { replaceThemesWith } from './replace'
import { Themes } from './themes'

function replaceThemes(code: string) {
  return replaceThemesWith(code, Themes)
}

export {
  Colors,
  replaceThemes,
  Themes,
}
