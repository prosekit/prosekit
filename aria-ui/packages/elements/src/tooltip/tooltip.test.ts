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

  describe('Placement (multiple tooltips)', () => {
    test('multiple tooltips with open-delay attribute work independently', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <div style="display: flex; gap: 16px;">
            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-top">Top</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="top">
                <aria-ui-tooltip-popup data-testid="popup-top">Tooltip on top</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-bottom">Bottom</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="bottom">
                <aria-ui-tooltip-popup data-testid="popup-bottom">Tooltip on bottom</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>
          </div>
        `,
        container,
      )

      const triggerTop = page.getByTestId('trigger-top')
      const popupTop = page.getByTestId('popup-top')
      const popupBottom = page.getByTestId('popup-bottom')

      // Both hidden initially
      expect(popupTop).not.toBeVisible()
      expect(popupBottom).not.toBeVisible()

      // Hover first trigger — should open
      await triggerTop.hover()
      expect(popupTop).toBeVisible()
      expect(popupBottom).not.toBeVisible()
    })

    test('hovering between multiple tooltips works correctly', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <div style="display: flex; gap: 16px;">
            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-a">A</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="top">
                <aria-ui-tooltip-popup data-testid="popup-a">Tooltip A</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-b">B</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="bottom">
                <aria-ui-tooltip-popup data-testid="popup-b">Tooltip B</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>
          </div>
        `,
        container,
      )

      const triggerA = page.getByTestId('trigger-a')
      const triggerB = page.getByTestId('trigger-b')
      const popupA = page.getByTestId('popup-a')
      const popupB = page.getByTestId('popup-b')

      // Hover A -> open A
      await triggerA.hover()
      expect(popupA).toBeVisible()
      expect(popupB).not.toBeVisible()

      // Move to B -> close A, open B
      await triggerB.hover()
      await expect.poll(() => popupB.element().checkVisibility()).toBe(true)
      await expect.poll(() => popupA.element().checkVisibility()).toBe(false)
    })
  })

  describe('innerHTML (elements created via innerHTML on connected container)', () => {
    test('tooltips work when elements are created via innerHTML', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      container.innerHTML = `
        <div style="display: flex; gap: 16px; padding: 50px;">
          <aria-ui-tooltip-root class="inline-block">
            <aria-ui-tooltip-trigger tabindex="0" open-delay="0" data-testid="late-t1">Top</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner placement="top">
              <aria-ui-tooltip-popup data-testid="late-p1">Tooltip on top</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
          <aria-ui-tooltip-root class="inline-block">
            <aria-ui-tooltip-trigger tabindex="0" open-delay="0" data-testid="late-t2">Bottom</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner placement="bottom">
              <aria-ui-tooltip-popup data-testid="late-p2">Tooltip on bottom</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        </div>
      `

      const trigger2 = page.getByTestId('late-t2')
      const popup2 = page.getByTestId('late-p2')

      expect(popup2).not.toBeVisible()
      await trigger2.hover()
      expect(popup2).toBeVisible()
    })
  })

  describe('Each tooltip opens independently', () => {
    test('second tooltip opens on hover without hovering first tooltip', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <div style="display: flex; gap: 16px; padding: 50px;">
            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t1">Top</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="top">
                <aria-ui-tooltip-popup data-testid="p1">Tooltip on top</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t2">Bottom</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="bottom">
                <aria-ui-tooltip-popup data-testid="p2">Tooltip on bottom</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t3">Left</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="left">
                <aria-ui-tooltip-popup data-testid="p3">Tooltip on left</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t4">Right</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="right">
                <aria-ui-tooltip-popup data-testid="p4">Tooltip on right</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>
          </div>
        `,
        container,
      )

      // Directly hover the second trigger without touching the first
      await page.getByTestId('t2').hover()
      expect(page.getByTestId('p2')).toBeVisible()
    })

    test('third and fourth tooltips open on hover', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <div style="display: flex; gap: 16px; padding: 50px;">
            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t1">Top</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="top">
                <aria-ui-tooltip-popup data-testid="p1">Tooltip on top</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t2">Bottom</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="bottom">
                <aria-ui-tooltip-popup data-testid="p2">Tooltip on bottom</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t3">Left</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="left">
                <aria-ui-tooltip-popup data-testid="p3">Tooltip on left</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>

            <aria-ui-tooltip-root>
              <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t4">Right</aria-ui-tooltip-trigger>
              <aria-ui-tooltip-positioner placement="right">
                <aria-ui-tooltip-popup data-testid="p4">Tooltip on right</aria-ui-tooltip-popup>
              </aria-ui-tooltip-positioner>
            </aria-ui-tooltip-root>
          </div>
        `,
        container,
      )

      // Hover third trigger directly
      await page.getByTestId('t3').hover()
      expect(page.getByTestId('p3')).toBeVisible()

      // Move away then hover fourth
      const t3El = container.querySelector('[data-testid="t3"]')!
      t3El.dispatchEvent(new MouseEvent('mouseleave'))

      await page.getByTestId('t4').hover()
      expect(page.getByTestId('p4')).toBeVisible()
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
