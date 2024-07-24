function replaceShortcuts(code: string, shortcuts: Record<string, string>) {
  const keys = Object.keys(shortcuts)
  // Sort keys by length in descending order
  keys.sort((a, b) => b.length - a.length)

  for (const key of keys) {
    code = replaceShortcut(code, key, shortcuts[key])
  }

  return code
}

function replaceShortcut(code: string, source: string, target: string) {
  if (target.includes(`'`)) {
    throw new Error('Target cannot contain single quotes: ' + target)
  }

  return (
    code
      // vue
      .replaceAll(` :class="Themes.${source}"`, ` class='${target}'`)
      // react
      .replaceAll(` className={Themes.${source}}`, ` className='${target}'`)
      // svelte etc
      .replaceAll(` class={Themes.${source}}`, ` class='${target}'`)
      // lit-html
      .replaceAll(` class=\${Themes.${source}}`, ` class='${target}'`)
      // vanilla-dom
      .replaceAll(`Themes.${source}`, `'${target}'`)
      // class names
      .replaceAll(source, target)
  )
}

function replaceImport(code: string) {
  return code.replace(
    /import\s*{\s*Themes\s*}\s*from\s*["']@prosekit\/themes["'];?\n+/m,
    '',
  )
}

export function replaceThemesWith(
  code: string,
  shortcuts: Record<string, string>,
) {
  return replaceImport(replaceShortcuts(code, shortcuts))
}
