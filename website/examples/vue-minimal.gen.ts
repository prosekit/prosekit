/* eslint-disable */

// This file is generated from gen-example-markdown.ts

import { defineComponent, h } from 'vue'
import { SandpackBlock } from '../components/sandpack-block'

import file4052215463 from '../../examples/vue/src/minimal/App.vue?raw'
import file1664660450 from '../../examples/vue/src/minimal/extension.ts?raw'
import file3270773664 from '../../examples/vue/index.html?raw'
import file3712066473 from '../../examples/vue/main.ts?raw'
import file657399211 from '../../examples/vue/package.json?raw'
import file3080859933 from '../../examples/vue/postcss.config.js?raw'
import file3460532112 from '../../examples/vue/tsconfig.json?raw'
import file1776173022 from '../../examples/vue/vite.config.ts?raw'

const files = {
  '/App.vue': { hidden: false, code: file4052215463 },
  '/extension.ts': { hidden: false, code: file1664660450 },
  '/index.html': { hidden: true, code: file3270773664 },
  '/main.ts': { hidden: true, code: file3712066473 },
  '/package.json': { hidden: true, code: file657399211 },
  '/postcss.config.js': { hidden: true, code: file3080859933 },
  '/tsconfig.json': { hidden: true, code: file3460532112 },
  '/vite.config.ts': { hidden: true, code: file1776173022 }
}

export const StoryBlock = defineComponent(() => {
  return () => h(SandpackBlock, { files })
})
