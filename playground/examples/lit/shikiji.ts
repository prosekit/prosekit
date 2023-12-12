import { defineCodeBlock } from 'prosekit/extensions/code-block'
import type { Parser } from 'prosemirror-highlight'
import { createParser } from 'prosemirror-highlight/shikiji'
import { getHighlighter } from 'shikiji'

const themes = ['github-light']
export const languages = [
  'javascript',
  'python',
  'java',
  'csharp',
  'php',
  'cpp',
  'typescript',
  'ruby',
  'c',
  'swift',
  'go',
  'rust',
  'kotlin',
  'dart',
  'r',
  'scala',
  'powershell',
  'shellscript',
  'groovy',
  'sql',
]

const highlighter = await getHighlighter({ themes, langs: languages })
const parser: Parser = createParser(highlighter)

export function defineShikijiCodeBlock() {
  return defineCodeBlock({ parser })
}
