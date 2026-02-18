import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import { defineMath } from 'prosekit/extensions/math'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'

import { renderKaTeXMathBlock, renderKaTeXMathInline } from '../../sample/katex'
import { sampleUploader } from '../../sample/sample-uploader'
import { defineCodeBlockView } from '../../ui/code-block-view'
import { defineImageView } from '../../ui/image-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineMath({ renderMathBlock: renderKaTeXMathBlock, renderMathInline: renderKaTeXMathInline }),
    defineCodeBlockShiki(),
    defineHorizontalRule(),
    defineCodeBlockView(),
    defineImageView(),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
