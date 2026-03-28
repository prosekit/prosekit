import { html, render } from 'lit-html'
import { beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

import type { MenuPopupElement} from '../index.ts';
import { registerElements } from '../index.ts'

const MENU_TEMPLATE = html`
  <aria-ui-menu-root>
    <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open Menu</aria-ui-menu-trigger>
    <aria-ui-menu-positioner>
      <aria-ui-menu-popup data-testid="popup">
        <aria-ui-menu-item value="cut" data-testid="cut">Cut</aria-ui-menu-item>
        <aria-ui-menu-item value="copy" data-testid="copy">Copy</aria-ui-menu-item>
        <aria-ui-menu-item value="paste" data-testid="paste">Paste</aria-ui-menu-item>
      </aria-ui-menu-popup>
    </aria-ui-menu-positioner>
  </aria-ui-menu-root>
`

function renderMenu(template = MENU_TEMPLATE) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(template, container)
  return container
}

async function openMenu(container: HTMLElement) {
  const trigger = container.querySelector('[data-testid="trigger"]')!
  await page.getByTestId('trigger').click()
  await expect.poll(() => container.querySelector('[data-testid="popup"]')?.getAttribute('data-state')).toBe('open')
  return trigger
}

describe('Menu', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  describe('Basic Functionality', () => {
    test('renders menu elements', () => {
      renderMenu()
      expect(page.getByTestId('trigger')).toBeInTheDocument()
      expect(page.getByTestId('popup')).toBeInTheDocument()
      expect(page.getByTestId('cut')).toBeInTheDocument()
    })

    test('menu popup is hidden by default', () => {
      renderMenu()
      expect(page.getByTestId('popup')).not.toBeVisible()
    })

    test('menu popup shows with defaultOpen=true', () => {
      renderMenu(html`
        <aria-ui-menu-root .defaultOpen=${true}>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      const popup = document.querySelector<MenuPopupElement>('[data-testid="popup"]')!
      expect(popup.style.display).toBe('')
    })

    test('menu popup has role="menu"', () => {
      renderMenu()
      expect(page.getByTestId('popup')).toHaveAttribute('role', 'menu')
    })

    test('menu items have role="menuitem"', () => {
      renderMenu()
      expect(page.getByTestId('cut')).toHaveAttribute('role', 'menuitem')
      expect(page.getByTestId('copy')).toHaveAttribute('role', 'menuitem')
    })
  })

  describe('Trigger Interactions', () => {
    test('clicking trigger opens menu', async () => {
      const container = renderMenu()
      await openMenu(container)
      expect(page.getByTestId('popup')).toBeVisible()
    })

    test('clicking trigger again closes menu', async () => {
      const container = renderMenu()
      await openMenu(container)
      await page.getByTestId('trigger').click()
      await expect.poll(() => page.getByTestId('popup').element().getAttribute('data-state')).toBe('closed')
    })

    test('trigger has aria-haspopup="menu"', () => {
      renderMenu()
      expect(page.getByTestId('trigger')).toHaveAttribute('aria-haspopup', 'menu')
    })

    test('trigger has aria-expanded="false" when closed', () => {
      renderMenu()
      expect(page.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'false')
    })

    test('trigger has aria-expanded="true" when open', async () => {
      const container = renderMenu()
      await openMenu(container)
      expect(page.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'true')
    })

    test('disabled trigger does not open menu', async () => {
      renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger .disabled=${true} tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await page.getByTestId('trigger').click()
      expect(page.getByTestId('popup')).not.toBeVisible()
    })
  })

  describe('Keyboard Navigation', () => {
    test('opening menu highlights first item', async () => {
      const container = renderMenu()
      await openMenu(container)
      await expect.poll(() => page.getByTestId('cut').element().getAttribute('data-active')).toBe('')
    })

    test('ArrowDown moves to next item', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('copy').element().getAttribute('data-active')).toBe('')
    })

    test('ArrowUp moves to previous item', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
      await expect.poll(() => page.getByTestId('cut').element().getAttribute('data-active')).toBe('')
    })

    test('Home moves to first item', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
      await expect.poll(() => page.getByTestId('cut').element().getAttribute('data-active')).toBe('')
    })

    test('End moves to last item', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
      await expect.poll(() => page.getByTestId('paste').element().getAttribute('data-active')).toBe('')
    })

    test('navigation wraps around (loop)', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
      await expect.poll(() => page.getByTestId('paste').element().getAttribute('data-active')).toBe('')
    })

    test('skips disabled items', async () => {
      const container = renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a" data-testid="a">A</aria-ui-menu-item>
              <aria-ui-menu-item value="b" .disabled=${true} data-testid="b">B</aria-ui-menu-item>
              <aria-ui-menu-item value="c" data-testid="c">C</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('c').element().getAttribute('data-active')).toBe('')
    })
  })

  describe('Item Activation', () => {
    test('Enter activates highlighted item and closes menu', async () => {
      const container = renderMenu()
      await openMenu(container)
      let selectFired = false
      container.querySelector('[data-testid="cut"]')!.addEventListener('select', () => { selectFired = true })
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      await expect.poll(() => selectFired).toBe(true)
      await expect.poll(() => popup.getAttribute('data-state')).toBe('closed')
    })

    test('Space activates highlighted item and closes menu', async () => {
      const container = renderMenu()
      await openMenu(container)
      let selectFired = false
      container.querySelector('[data-testid="cut"]')!.addEventListener('select', () => { selectFired = true })
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
      await expect.poll(() => selectFired).toBe(true)
      await expect.poll(() => popup.getAttribute('data-state')).toBe('closed')
    })

    test('clicking item activates it and closes menu', async () => {
      const container = renderMenu()
      await openMenu(container)
      let selectFired = false
      container.querySelector('[data-testid="copy"]')!.addEventListener('select', () => { selectFired = true })
      await page.getByTestId('copy').click()
      await expect.poll(() => selectFired).toBe(true)
      await expect.poll(() => container.querySelector('[data-testid="popup"]')!.getAttribute('data-state')).toBe('closed')
    })

    test('select event can be prevented to keep menu open', async () => {
      const container = renderMenu()
      await openMenu(container)
      container.querySelector('[data-testid="cut"]')!.addEventListener('select', (e) => { e.preventDefault() })
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      await new Promise((r) => setTimeout(r, 50))
      expect(popup.getAttribute('data-state')).toBe('open')
    })

    test('disabled item cannot be activated via click', async () => {
      const container = renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a" .disabled=${true} data-testid="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await openMenu(container)
      let selectFired = false
      const item = container.querySelector('[data-testid="a"]')!
      item.addEventListener('select', () => { selectFired = true })
      item.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await new Promise((r) => setTimeout(r, 50))
      expect(selectFired).toBe(false)
    })
  })

  describe('Close Behaviors', () => {
    test('Escape closes menu', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await expect.poll(() => popup.getAttribute('data-state')).toBe('closed')
    })
  })

  describe('Typeahead', () => {
    test('typing a character highlights matching item', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', bubbles: true }))
      await expect.poll(() => page.getByTestId('paste').element().getAttribute('data-active')).toBe('')
    })

    test('typing multiple characters narrows match', async () => {
      const container = renderMenu()
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }))
      await expect.poll(() => page.getByTestId('cut').element().getAttribute('data-active')).toBe('')
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', bubbles: true }))
      await expect.poll(() => page.getByTestId('copy').element().getAttribute('data-active')).toBe('')
    })
  })

  describe('Accessibility', () => {
    test('disabled items have aria-disabled', () => {
      renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a" .disabled=${true} data-testid="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      expect(page.getByTestId('a')).toHaveAttribute('aria-disabled', 'true')
    })

    test('active item has data-active attribute', async () => {
      const container = renderMenu()
      await openMenu(container)
      await expect.poll(() => page.getByTestId('cut').element().getAttribute('data-active')).toBe('')
      expect(page.getByTestId('copy').element().getAttribute('data-active')).toBeNull()
    })
  })

  describe('Events', () => {
    test('emits openChange event when opened', async () => {
      const container = renderMenu()
      const root = container.querySelector('aria-ui-menu-root')!
      let eventFired = false
      root.addEventListener('openChange', () => { eventFired = true })
      await page.getByTestId('trigger').click()
      expect(eventFired).toBe(true)
    })

    test('emits openChange event when closed', async () => {
      const container = renderMenu()
      await openMenu(container)
      const root = container.querySelector('aria-ui-menu-root')!
      let eventFired = false
      root.addEventListener('openChange', () => { eventFired = true })
      await page.getByTestId('trigger').click()
      expect(eventFired).toBe(true)
    })
  })

  describe('Custom eventTarget', () => {
    test('keydown events from custom eventTarget trigger navigation', async () => {
      const customTarget = document.createElement('div')
      document.body.appendChild(customTarget)

      const container = renderMenu(html`
        <aria-ui-menu-root .defaultOpen=${true}>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup" .eventTarget=${customTarget}>
              <aria-ui-menu-item value="cut" data-testid="cut">Cut</aria-ui-menu-item>
              <aria-ui-menu-item value="copy" data-testid="copy">Copy</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)

      await expect.poll(() => container.querySelector('[data-testid="popup"]')?.getAttribute('data-state')).toBe('open')
      await expect.poll(() => page.getByTestId('cut').element().getAttribute('data-active')).toBe('')

      customTarget.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('copy').element().getAttribute('data-active')).toBe('')
    })
  })

  // ---- Submenu tests ----

  const SUBMENU_TEMPLATE = html`
    <aria-ui-menu-root>
      <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open Menu</aria-ui-menu-trigger>
      <aria-ui-menu-positioner>
        <aria-ui-menu-popup data-testid="popup">
          <aria-ui-menu-item value="cut" data-testid="cut">Cut</aria-ui-menu-item>
          <aria-ui-menu-submenu-root>
            <aria-ui-menu-submenu-trigger value="share" data-testid="share-trigger">Share</aria-ui-menu-submenu-trigger>
            <aria-ui-menu-positioner placement="right-start">
              <aria-ui-menu-popup data-testid="sub-popup">
                <aria-ui-menu-item value="email" data-testid="email">Email</aria-ui-menu-item>
                <aria-ui-menu-item value="slack" data-testid="slack">Slack</aria-ui-menu-item>
              </aria-ui-menu-popup>
            </aria-ui-menu-positioner>
          </aria-ui-menu-submenu-root>
          <aria-ui-menu-item value="delete" data-testid="delete">Delete</aria-ui-menu-item>
        </aria-ui-menu-popup>
      </aria-ui-menu-positioner>
    </aria-ui-menu-root>
  `

  describe('Submenu: Basic', () => {
    test('submenu trigger renders with role="menuitem"', () => {
      renderMenu(SUBMENU_TEMPLATE)
      expect(page.getByTestId('share-trigger')).toHaveAttribute('role', 'menuitem')
    })

    test('submenu trigger has aria-haspopup="menu"', () => {
      renderMenu(SUBMENU_TEMPLATE)
      expect(page.getByTestId('share-trigger')).toHaveAttribute('aria-haspopup', 'menu')
    })

    test('submenu trigger has aria-expanded="false" by default', () => {
      renderMenu(SUBMENU_TEMPLATE)
      expect(page.getByTestId('share-trigger')).toHaveAttribute('aria-expanded', 'false')
    })

    test('submenu popup is hidden by default', () => {
      renderMenu(SUBMENU_TEMPLATE)
      expect(page.getByTestId('sub-popup')).not.toBeVisible()
    })

    test('submenu trigger participates in parent keyboard navigation', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('share-trigger').element().getAttribute('data-active')).toBe('')
    })
  })

  describe('Submenu: Opening', () => {
    test('ArrowRight on highlighted submenu trigger opens submenu', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('share-trigger').element().getAttribute('data-active')).toBe('')
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).toBe('open')
    })

    test('Enter on highlighted submenu trigger opens submenu', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('share-trigger').element().getAttribute('data-active')).toBe('')
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      await expect.poll(() => container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).toBe('open')
    })

    test('opening submenu highlights first item in submenu', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('share-trigger').element().getAttribute('data-active')).toBe('')
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => page.getByTestId('email').element().getAttribute('data-active')).toBe('')
    })

    test('submenu trigger aria-expanded becomes "true" when submenu opens', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => page.getByTestId('share-trigger').element().getAttribute('aria-expanded')).toBe('true')
    })
  })

  describe('Submenu: Closing', () => {
    test('ArrowLeft inside submenu closes it', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).toBe('open')
      const subPopup = container.querySelector('[data-testid="sub-popup"]')!
      subPopup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
      await expect.poll(() => subPopup.getAttribute('data-state')).toBe('closed')
    })

    test('Escape inside submenu closes submenu only (parent stays open)', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).toBe('open')
      const subPopup = container.querySelector('[data-testid="sub-popup"]')!
      subPopup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await expect.poll(() => subPopup.getAttribute('data-state')).toBe('closed')
      expect(popup.getAttribute('data-state')).toBe('open')
    })

    test('clicking a regular item in submenu closes entire menu tree', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).toBe('open')
      await page.getByTestId('email').click()
      await expect.poll(() => popup.getAttribute('data-state')).toBe('closed')
    })

    test('closing parent menu cascades to close submenu', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).toBe('open')
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await expect.poll(() => popup.getAttribute('data-state')).toBe('closed')
      await expect.poll(() => container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).toBe('closed')
    })
  })

  describe('Submenu: Navigation', () => {
    test('ArrowDown/Up inside submenu navigates within submenu only', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      await expect.poll(() => page.getByTestId('email').element().getAttribute('data-active')).toBe('')
      const subPopup = container.querySelector('[data-testid="sub-popup"]')!
      subPopup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.poll(() => page.getByTestId('slack').element().getAttribute('data-active')).toBe('')
    })

    test('ArrowRight on non-submenu-trigger item does nothing', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      await expect.poll(() => page.getByTestId('cut').element().getAttribute('data-active')).toBe('')
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      // TODO: Update: do not use await new Promise((r) => setTimeout(r, 50)).  Use await page.poll(() => ...)
      await new Promise((r) => setTimeout(r, 50))
      expect(page.getByTestId('cut').element().getAttribute('data-active')).toBe('')
      expect(container.querySelector('[data-testid="sub-popup"]')?.getAttribute('data-state')).not.toBe('open')
    })

    test('ArrowLeft in root menu does nothing', async () => {
      const container = renderMenu(SUBMENU_TEMPLATE)
      await openMenu(container)
      const popup = container.querySelector('[data-testid="popup"]')!
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
      await new Promise((r) => setTimeout(r, 50))
      expect(popup.getAttribute('data-state')).toBe('open')
    })
  })
})
