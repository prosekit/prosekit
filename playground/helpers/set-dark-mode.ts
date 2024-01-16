export function setDarkMode(dark: boolean) {
  document.body.classList.toggle('dark', dark)

  let meta = document.getElementById('iframe-dark-mode-meta')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'color-scheme')
    meta.setAttribute('content', dark ? 'dark' : 'light')
    meta.setAttribute('id', 'iframe-dark-mode-meta')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', dark ? 'dark' : 'light')
}
