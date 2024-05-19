export function replaceShortcuts(
  code: string,
  shortcuts: Record<string, string>,
) {
  const keys = Object.keys(shortcuts)
  // Sort keys by length in descending order
  keys.sort((a, b) => b.length - a.length)

  for (const key of keys) {
    code = replaceShortcut(code, key, shortcuts[key])
  }

  return code
}

function replaceShortcut(code: string, source: string, target: string) {
  return (
    code
      // vue
      .replaceAll(` :class="Themes.${source}"`, ` class="${target}"`)
      // react
      .replaceAll(` className={Themes.${source}}`, ` className="${target}"`)
      // svelte etc
      .replaceAll(` class={Themes.${source}}`, ` class="${target}"`)
      // lit-html
      .replaceAll(` class=\${Themes.${source}}`, ` class="${source}"`)
      // fallback
      .replaceAll(source, target)
  )
}
