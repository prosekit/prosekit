function queryActiveNavLink() {
  return document.querySelector(
    '[data-playground-nav-link][aria-selected="true"]',
  )
}

function scrollActiveNavLinkIntoView() {
  const activeNavLink = queryActiveNavLink()
  if (!activeNavLink) return
  activeNavLink.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest',
  })
}

setTimeout(scrollActiveNavLinkIntoView, 150)
