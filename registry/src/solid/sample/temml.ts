import Temml from 'temml'

export function renderTemmlMathBlock(text: string, element: HTMLElement) {
  Temml.render(text, element, { displayMode: true, annotate: true, throwOnError: false })
}

export function renderTemmlMathInline(text: string, element: HTMLElement) {
  Temml.render(text, element, { displayMode: false, annotate: true, throwOnError: false })
}
