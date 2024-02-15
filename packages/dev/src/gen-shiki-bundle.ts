import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { vfs } from './virtual-file-system'

export async function genShikiBundle() {
  const { bundledLanguagesInfo, bundledThemesInfo } = await import(
    'shiki/dist/bundle-full.mjs'
  )

  const languages = JSON.stringify(
    bundledLanguagesInfo.map((lang) => ({
      id: lang.id,
      name: lang.name,
      aliases: lang.aliases,
    })),
  )

  const themes = JSON.stringify(
    bundledThemesInfo.map((theme) => ({
      id: theme.id,
      displayName: theme.displayName,
      type: theme.type,
    })),
  )

  const langaugeType = bundledLanguagesInfo
    .map((lang) => lang.id)
    .map((s) => `'${s}'`)
    .join(' | ')

  const themeType = bundledThemesInfo
    .map((theme) => theme.id)
    .map((s) => `'${s}'`)
    .join(' | ')

  const code = formatCode(languages, themes, langaugeType, themeType)

  await vfs.updateText(
    'packages/extensions/src/code-block/shiki-bundle.gen.ts',
    code,
  )
}

function formatCode(
  languages: string,
  themes: string,
  langaugeType: string,
  themeType: string,
) {
  return (
    `
/* This file is generated from ${currentFilename} */

import type { BundledLanguageInfo, BundledThemeInfo } from './shiki-bundle'

/**
 * The type of a bundled Shiki language id.
 * @public
 */
export type ShikiBundledLanguage = ${langaugeType}

/**
 * The type of a bundled Shiki theme id.
 * @public
 */
export type ShikiBundledTheme = ${themeType}


/**
 * A set of bundled Shiki languages.
 * @public
 */
export const shikiBundledLanguages: BundledLanguageInfo[] = ${languages}

/**
 * A set of bundled Shiki themes.
 * @public
 */
export const shikiBundledThemes: BundledThemeInfo[] = ${themes}

`.trim() + '\n'
  )
}

const currentFilename = basename(fileURLToPath(import.meta.url))
