// @unocss-include

const COLORS = [
  ['background', 'white', 'gray-950'],
  ['foreground', 'gray-900', 'gray-50'],
  ['primary', 'gray-900', 'gray-50'],
  ['primary-foreground', 'gray-50', 'gray-900'],
  ['secondary', 'gray-100', 'gray-800'],
  ['secondary-foreground', 'gray-900', 'gray-50'],
  ['muted', 'gray-100', 'gray-800'],
  ['muted-foreground', 'gray-500', 'gray-500'],
  ['accent', 'gray-200', 'gray-700'],
  ['accent-foreground', 'gray-900', 'gray-50'],
  ['destructive', 'red-500', 'red-900'],
  ['destructive-foreground', 'gray-50', 'gray-50'],
  ['border', 'gray-200', 'gray-800'],
  ['input', 'gray-200', 'gray-800'],
  ['ring', 'gray-900', 'gray-300'],
] as const

const GROUPS = ['text', 'bg', 'border', 'ring', 'ring-offset'] as const

// dprint-ignore
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
      Colors[`${group}-${alias}${suffix}`] = `${group}-${color}${suffix} dark:${group}-${darkColor}${suffix}`
    }
  }
}

export { Colors }
