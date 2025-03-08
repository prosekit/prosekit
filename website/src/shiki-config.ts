import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import type { ShikiConfig } from 'astro'

import { transformerCopyButton } from './shiki-transformer-copy-button'

export const shikiConfig: ShikiConfig = {
  themes: {
    light: 'one-light',
    dark: 'one-dark-pro',
  },
  defaultColor: false,
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerMetaHighlight(),
    transformerCopyButton(),
  ],
}
