/* eslint-disable */

// This file is generated from gen-example-markdown.ts

import { defineComponent, h } from 'vue'
import { SandpackBlock } from '../components/sandpack-block'

import file4161612779 from '../../examples/react/src/minimal/App.tsx?raw'
import file2188561667 from '../../examples/react/src/minimal/extension.ts?raw'
import file1888011935 from '../../examples/react/index.html?raw'
import file2074678456 from '../../examples/react/main.tsx?raw'
import file422504184 from '../../examples/react/package.json?raw'
import file3592345272 from '../../examples/react/style.css?raw'
import file1218816309 from '../../examples/react/tsconfig.json?raw'
import file1318383673 from '../../examples/react/vite.config.ts?raw'

const files = {
  '/App.tsx': { hidden: false, code: file4161612779 },
  '/extension.ts': { hidden: false, code: file2188561667 },
  '/index.html': { hidden: false, code: file1888011935 },
  '/main.tsx': { hidden: false, code: file2074678456 },
  '/package.json': { hidden: false, code: file422504184 },
  '/style.css': { hidden: false, code: file3592345272 },
  '/tsconfig.json': { hidden: false, code: file1218816309 },
  '/vite.config.ts': { hidden: false, code: file1318383673 }
}

export const StoryBlock = defineComponent(() => {
  return () => h(SandpackBlock, { files })
})
