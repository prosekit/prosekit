import { config } from '@prosekit/dev/config-tsup'
import { minifyHTMLLiterals } from 'minify-literals'
import { defineConfig } from 'tsup'

const minifyTemplateLiteralsPlugin = {
  name: 'minify-template-literals',
  renderChunk: async (code: string) => {
    const result = await minifyHTMLLiterals(code)
    if (result) {
      return { code: result.code }
    }
    return null
  },
}

export default defineConfig(config({ plugins: [minifyTemplateLiteralsPlugin] }))
