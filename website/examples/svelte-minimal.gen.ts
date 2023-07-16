/* eslint-disable */

// This file is generated from gen-example-markdown.ts

import { defineComponent, h } from 'vue'
import { SandpackBlock } from '../components/sandpack-block'

import file2969552333 from '../../examples/svelte/src/minimal/App.svelte?raw'
import file3477382504 from '../../examples/svelte/app.css?raw'
import file3165482077 from '../../examples/svelte/index.html?raw'
import file855607814 from '../../examples/svelte/main.ts?raw'
import file1283532990 from '../../examples/svelte/package.json?raw'
import file956722288 from '../../examples/svelte/svelte.config.js?raw'
import file488336843 from '../../examples/svelte/tsconfig.json?raw'
import file1471326607 from '../../examples/svelte/tsconfig.node.json?raw'
import file229226007 from '../../examples/svelte/vite-env.d.ts?raw'
import file3658456811 from '../../examples/svelte/vite.config.ts?raw'

const files = {
  '/App.svelte': { hidden: false, code: file2969552333 },
  '/app.css': { hidden: false, code: file3477382504 },
  '/index.html': { hidden: false, code: file3165482077 },
  '/main.ts': { hidden: false, code: file855607814 },
  '/package.json': { hidden: false, code: file1283532990 },
  '/svelte.config.js': { hidden: false, code: file956722288 },
  '/tsconfig.json': { hidden: false, code: file488336843 },
  '/tsconfig.node.json': { hidden: false, code: file1471326607 },
  '/vite-env.d.ts': { hidden: false, code: file229226007 },
  '/vite.config.ts': { hidden: false, code: file3658456811 }
}

export const StoryBlock = defineComponent(() => {
  return () => h(SandpackBlock, { files })
})
