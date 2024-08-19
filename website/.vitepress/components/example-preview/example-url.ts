export function getExampleUrl(example: string) {
  const path = `/astrobook/stories/${example.replace(/^([a-z]+)-(.+)$/, '$1/$2')}/index.html`

  return import.meta.env.MODE === 'development'
    ? `http://localhost:4321${path}`
    : path
}
