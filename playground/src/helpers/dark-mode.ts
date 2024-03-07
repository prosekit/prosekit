import { setDarkMode } from './set-dark-mode'

window.addEventListener('message', (event) => {
  const data = event && event.data
  if (
    data &&
    typeof data === 'object' &&
    'type' in data &&
    'value' in data &&
    data.type === 'DARK_MODE' &&
    typeof data.value === 'boolean'
  ) {
    setDarkMode(data.value)
  }
})

const url: URL = new URL(window.location.href)
const params: URLSearchParams = url.searchParams
if (params.has('dark')) {
  setDarkMode(true)
}
