import katex from 'katex'

export function renderKaTeXMathBlock(text: string, element: HTMLElement) {
  katex.render(text, element, { displayMode: true, throwOnError: false })
}

export function renderKaTeXMathInline(text: string, element: HTMLElement) {
  katex.render(text, element, { displayMode: false, throwOnError: false })
}
