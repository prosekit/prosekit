export function getExampleUrl(example: string) {
  return import.meta.env.MODE === 'development'
    ? `http://localhost:4321/playground/dist/${example}`
    : `/playground/dist/${example}/index.html`
}
