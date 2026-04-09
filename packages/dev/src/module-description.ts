export function extractModuleDescription(
  fileContent: string,
): string | undefined {
  // Match the first JSDoc block at the start of file (allowing leading whitespace)
  const match = fileContent.match(/^\s*\/\*\*\s*\n([\S\s]*?)\*\//)
  if (!match) return undefined

  const body = match[1]
  if (!body.includes('@module')) return undefined

  const lines = body.split('\n').map(line => line.replace(/^\s*\*\s?/, '')).filter(line => !line.includes('@module'))
  const description = lines.join('\n').trim()
  if (!description) return undefined
  return description + '\n'
}

export function formatModuleDescription(moduleName: string, description?: string): string {
  if (!description) {
    return `/**\n * @module ${moduleName}\n */`
  }

  return [
    `/**`,
    ...description.split('\n').map(line => ` * ${line}`.trimEnd()),
    ` * @module ${moduleName}`,
    ` */`,
  ].join('\n')
}
