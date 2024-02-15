/**
 * @public
 */
export interface BundledLanguageInfo {
  id: string
  name: string
  aliases?: Readonly<string[]>
}

/**
 * @public
 */
export interface BundledThemeInfo {
  id: string
  displayName: string
  type: 'light' | 'dark'
}
