import { type HighlightParser } from 'prosekit/extensions/code-block'
import { createParser } from 'prosemirror-highlight/shikiji'
import { getHighlighter } from 'shikiji'

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
const themes = ['github-light']
const highlighter = await getHighlighter({ themes, langs: languages })
export const parser: HighlightParser = createParser(highlighter)
