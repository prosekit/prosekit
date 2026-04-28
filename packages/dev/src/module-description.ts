export function extractModuleDescription(
  fileContent: string,
): string | undefined {
  // Match the first JSDoc block at the start of file (allowing leading whitespace)
  const match = fileContent.match(/^\s*\/\*\*([\S\s]*?)\*\//)
  if (!match) return undefined

  const body = match[1]
  const lines = body.split('\n').map(line => line.replace(/^\s*\*\s?/, ''))
  if (!lines.some(line => /^\s*@module\b/.test(line))) return undefined

  const descriptionLines = lines.filter(line => !/^\s*@module\b/.test(line))
  const description = descriptionLines.join('\n').trim()
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
