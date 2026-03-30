import { render } from 'katex'

export function renderMathBlock(text: string, element: HTMLElement) {
  render(text, element, { displayMode: true, throwOnError: false, output: 'mathml' })
}

export function renderMathInline(text: string, element: HTMLElement) {
  render(text, element, { displayMode: false, throwOnError: false, output: 'mathml' })
}
