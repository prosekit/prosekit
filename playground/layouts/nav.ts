function queryNav() {
  return document.querySelector('[data-playground-nav]')
}

function saveScrollLeft() {
  const nav = queryNav()
  if (!nav) return

  localStorage.setItem('PLAYGROUND_NAV_SCROLL_LEFT', nav.scrollLeft.toString())
}

function restoreScrollLeft() {
  const nav = queryNav()
  if (!nav) return

  const scrollLeft = localStorage.getItem('PLAYGROUND_NAV_SCROLL_LEFT')
  if (!scrollLeft) return

  nav.scrollLeft = Number.parseInt(scrollLeft)
}

function addClickListener() {
  const nav = queryNav()
  if (!nav) return

  nav.removeEventListener('pointerdown', saveScrollLeft)
  nav.addEventListener('pointerdown', saveScrollLeft)
}

restoreScrollLeft()
addClickListener()
