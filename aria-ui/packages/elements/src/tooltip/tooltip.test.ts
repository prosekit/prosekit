import { html, render } from 'lit-html'
import { beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

describe('Tooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  describe('Basic Functionality', () => {
    test('renders tooltip elements', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByText('Trigger')).toBeInTheDocument()
      expect(page.getByText('Tooltip content')).toBeInTheDocument()
    })

    test('popup is hidden by default', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByText('Tooltip content')).not.toBeVisible()
    })

    test('popup shows with defaultOpen=true', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const popup = container.querySelector('aria-ui-tooltip-popup')!
      expect(popup.style.display).toBe('')
    })
  })

  describe('Hover Interactions', () => {
    test('hover opens tooltip (with zero delay)', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Tooltip content')

      expect(popup).not.toBeVisible()
      await trigger.hover()
      expect(popup).toBeVisible()
    })

    test('mouse leave closes tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      expect(popup.style.display).toBe('')
      triggerEl.dispatchEvent(new MouseEvent('mouseleave'))
      expect(popup).not.toBeVisible()
    })

    test('disabled trigger does not open tooltip', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .disabled=${true} .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      await page.getByText('Trigger').hover()
      expect(page.getByText('Tooltip content')).not.toBeVisible()
    })
  })

  describe('Focus Interactions', () => {
    test('focus opens tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      triggerEl.dispatchEvent(new FocusEvent('focusin'))
      expect(popup).toBeVisible()
    })

    test('blur closes tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      expect(popup.style.display).toBe('')
      triggerEl.dispatchEvent(new FocusEvent('focusout'))
      expect(popup).not.toBeVisible()
    })

    test('tooltip stays open when hover ends but focus remains', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      triggerEl.dispatchEvent(new MouseEvent('mouseenter'))
      triggerEl.dispatchEvent(new FocusEvent('focusin'))
      expect(popup).toBeVisible()

      triggerEl.dispatchEvent(new MouseEvent('mouseleave'))
      expect(popup).toBeVisible()

      triggerEl.dispatchEvent(new FocusEvent('focusout'))
      expect(popup).not.toBeVisible()
    })
  })

  describe('Keyboard Interactions', () => {
    test('Escape key closes tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      expect(popup.style.display).toBe('')
      triggerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      expect(popup).not.toBeVisible()
    })
  })

  describe('Tooltip Group (Shared Delay)', () => {
    test('second tooltip opens instantly after first closes within group timeout', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${600} data-testid="trigger-a">Trigger A</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip A</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${600} data-testid="trigger-b">Trigger B</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup-b">Tooltip B</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerB = container.querySelector('[data-testid="trigger-b"]')!
      const popupB = container.querySelector('[data-testid="popup-b"]')!

      // Open tooltip A via controlled prop, then close it (triggers group notification)
      const rootA = container.querySelector('aria-ui-tooltip-root')!
      rootA.open = true
      rootA.open = false

      // Hover trigger B — should open instantly (group delay skip)
      triggerB.dispatchEvent(new MouseEvent('mouseenter'))
      expect(popupB).toBeVisible()
    })
  })

  describe('Controlled Mode', () => {
    test('controlled open prop overrides internal state', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const popup = page.getByTestId('popup')
      expect(popup).toBeVisible()

      const rootElement = container.querySelector('aria-ui-tooltip-root')!
      rootElement.open = false
      expect(popup).not.toBeVisible()
    })
  })

  describe('Events', () => {
    test('emits openChange event when opened', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const root = container.querySelector('aria-ui-tooltip-root')!
      let eventFired = false
      root.addEventListener('openChange', () => {
        eventFired = true
      })

      await page.getByText('Trigger').hover()
      expect(eventFired).toBe(true)
    })
  })

  describe('Accessibility', () => {
    test('popup has role tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByTestId('popup')).toHaveAttribute('role', 'tooltip')
    })

    test('trigger has aria-describedby when tooltip is open', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const trigger = page.getByTestId('trigger')
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      await expect.poll(() => trigger.element().getAttribute('aria-describedby')).toBe(popup.id)
    })

    test('trigger does not have aria-describedby when tooltip is closed', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByTestId('trigger')).not.toHaveAttribute('aria-describedby')
    })

    test('disabled elements have aria-disabled', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .disabled=${true}>
            <aria-ui-tooltip-trigger .disabled=${true}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(container.querySelector('aria-ui-tooltip-root')!.getAttribute('aria-disabled')).toBe('true')
      expect(container.querySelector('aria-ui-tooltip-trigger')!.getAttribute('aria-disabled')).toBe('true')
    })
  })

  describe('Positioning', () => {
    test('positioner is positioned absolutely by default', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const positioner = container.querySelector('aria-ui-tooltip-positioner')!
      await expect.poll(() => positioner.style.position).toBe('absolute')
    })

    test('positioner respects strategy prop', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner .strategy=${'fixed'}>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const positioner = container.querySelector('aria-ui-tooltip-positioner')!
      await expect.poll(() => positioner.style.position).toBe('fixed')
    })
  })
})
