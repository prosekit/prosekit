import type { NodeJSON } from 'prosekit/core'

const js = `
async function start() {
  while (true) {
    await sleep()
    await eat()
    await code('JavaScript!')
  }
}
`.trim()

const py = `
async def start():
    while True:
        await sleep()
        await eat()
        await code('Python!')
`.trim()

const go = `
func start() {
	for {
		sleep()
		eat()
		code('Go!')
	}
}
`.trim()

export const defaultContent: NodeJSON = {
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
