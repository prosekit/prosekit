export function getExampleUrl(example: string) {
  return import.meta.env.MODE === 'development'
    ? `http://localhost:4321/_/${example}`
    : `/_/${example}/index.html`
}
