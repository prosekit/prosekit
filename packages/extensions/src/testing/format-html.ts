export async function formatHTML(html: string) {
  const prettier = await import('prettier')
  const prettierHTML = await import('prettier/plugins/html')

  return await prettier.format(html, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore',
    plugins: [prettierHTML],
    printWidth: 180,
  })
}
