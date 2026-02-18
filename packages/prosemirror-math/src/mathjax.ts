import '@mathjax/src/js/input/tex/base/BaseConfiguration.js'

import { liteAdaptor } from '@mathjax/src/js/adaptors/liteAdaptor.js'
import type { MmlNode } from '@mathjax/src/js/core/MmlTree/MmlNode.js'
import { SerializedMmlVisitor } from '@mathjax/src/js/core/MmlTree/SerializedMmlVisitor.js'
import { RegisterHTMLHandler } from '@mathjax/src/js/handlers/html.js'
import { TeX } from '@mathjax/src/js/input/tex.js'
import { mathjax } from '@mathjax/src/js/mathjax.js'

const adaptor = liteAdaptor()
RegisterHTMLHandler(adaptor)

const tex = new TeX({ packages: ['base'] })
const htmlDocument = mathjax.document('', { InputJax: tex })
const visitor = new SerializedMmlVisitor()

function texToMathML(text: string, display: boolean): string {
  const mathML = htmlDocument.convert(text, { display }) as MmlNode
  return visitor.visitTree(mathML)
}

export function renderMathJaxMathBlock(text: string, element: HTMLElement) {
  element.innerHTML = texToMathML(text, true)
}

export function renderMathJaxMathInline(text: string, element: HTMLElement) {
  element.innerHTML = texToMathML(text, false)
}
