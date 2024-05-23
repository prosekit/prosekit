// @unocss-include

const COLORS = [
  ['background', 'white', 'neutral-900'],
  ['foreground', 'neutral-900', 'zinc-50'],
  ['primary', 'zinc-900', 'zinc-50'],
  ['primary-foreground', 'zinc-50', 'zinc-900'],
  ['secondary', 'zinc-100', 'zinc-800'],
  ['secondary-foreground', 'zinc-900', 'zinc-50'],
  ['muted', 'zinc-100', 'zinc-800'],
  ['muted-foreground', 'zinc-500', 'zinc-500'],
  ['accent', 'gray-200', 'gray-700'],
  ['accent-foreground', 'zinc-900', 'zinc-50'],
  ['destructive', 'red-500', 'red-900'],
  ['destructive-foreground', 'zinc-50', 'zinc-50'],
  ['border', 'zinc-200', 'zinc-800'],
  ['input', 'zinc-200', 'zinc-800'],
  ['ring', 'zinc-900', 'zinc-300'],
] as const

const GROUPS = ['text', 'bg', 'border', 'ring', 'ring-offset'] as const

// prettier-ignore
const COLOR_REGEX = new RegExp(
    (
        `^` +
        `(?<prefix>.*?)` +
        `(?<group>` +
            GROUPS.join('|') +
        `)` +
        `-` +
        `(?<alias>` +
            COLORS.map(([name]) => name).sort((a, b) => b.length - a.length).join('|') +
        `)` +
        `(?<suffix>.*)` + 
        `$`
    ),
    'g',
)

export function replaceColor(className: string) {
  COLOR_REGEX.lastIndex = 0
  if (!COLOR_REGEX.test(className)) {
    return className
  }

  const output: string[] = []

  for (const input of className.split(' ')) {
    COLOR_REGEX.lastIndex = 0
    const match = COLOR_REGEX.exec(input)
    if (match) {
      const { prefix, group, alias, suffix } = match.groups || {}
      const [, color, darkColor] = COLORS.find(([name]) => name === alias)!

      if (!color || !darkColor || !group || !alias) {
        throw new Error(`Unable to parse color from "${input}"`)
      }

      output.push(
        `${prefix}${group}-${color}${suffix} dark:${prefix}${group}-${darkColor}${suffix}`,
      )
    } else {
      output.push(input)
    }
  }

  return output.join(' ')
}

const Colors: Record<string, string> = {}

for (const [alias, color, darkColor] of COLORS) {
  for (const group of GROUPS) {
    for (let opacity = 0; opacity <= 100; opacity += 5) {
      const suffix = opacity === 0 ? '' : `/${opacity}`
      Colors[`${group}-${alias}${suffix}`] =
        `${group}-${color}${suffix} dark:${group}-${darkColor}${suffix}`
    }
  }
}

export { Colors }
