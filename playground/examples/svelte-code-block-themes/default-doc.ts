import type { NodeJSON } from 'prosekit/core'

const js = `async function main() {\n  while (true) {\n    await sleep();\n    await eat();\n    await code('JavaScript!');\n  }\n}`
const py = `async def main():\n    while True:\n        await sleep()\n        await eat()\n        await code("Python!")`
const go = `func main() {\n\tfor {\n\t\tsleep()\n\t\teat()\n\t\tcode("Go!")\n\t}\n}`

export const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [{ type: 'text', text: js }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'python' },
      content: [{ type: 'text', text: py }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'go' },
      content: [{ type: 'text', text: go }],
    },
  ],
}
