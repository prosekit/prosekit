import { replaceThemesWith } from './replace'
import { Themes } from './themes' with { type: 'macro' }

const THEMES = Themes

function replaceThemes(code: string) {
  return replaceThemesWith(code, THEMES)
}

export { replaceThemes, THEMES as Themes }
