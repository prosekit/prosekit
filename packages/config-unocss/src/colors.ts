// @unocss-include

const COLORS: Array<[string, string, string]> = [
  // Keep the following two colors so that COLOR_REGEX won't crash during
  // the process of cleaning up COLORS array.
  ['fakefakefake1', 'white', 'gray-950'],
  ['fakefakefake2', 'white', 'gray-950'],

  // Current task: remove the following colors one by one.
  ['background', 'white', 'gray-950'],
  ['foreground', 'gray-900', 'gray-50'],
]

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
