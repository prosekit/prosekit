import { FeatureDetectionInternals } from '@aria-ui-v2/utils'
import { html, render } from 'lit-html'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

interface Environment {
  anchorPositioning: boolean
  popover: boolean
  togglePopoverSource: boolean
}

function collectEnvironments() {
  let environments: Environment[] = [
    {
      anchorPositioning: false,
      popover: false,
      togglePopoverSource: false,
    },
  ]

  if (FeatureDetectionInternals.AnchorPositioning.detect()) {
    environments = [
      ...environments.map((env) => ({ ...env, anchorPositioning: true })),
      ...environments.map((env) => ({ ...env, anchorPositioning: false })),
    ]
  }

  if (FeatureDetectionInternals.Popover.detect()) {
    environments = [
      ...environments.map((env) => ({ ...env, popover: true })),
      ...environments.map((env) => ({ ...env, popover: false })),
    ]
  }

  if (FeatureDetectionInternals.TogglePopoverSource.detect()) {
    environments = [
      ...environments.map((env) => ({ ...env, togglePopoverSource: true })),
      ...environments.map((env) => ({ ...env, togglePopoverSource: false })),
    ]
  }

  return environments
}

function setupEnvironment(environment: Environment) {
  FeatureDetectionInternals.AnchorPositioning.override(
    environment.anchorPositioning,
  )
  FeatureDetectionInternals.Popover.override(environment.popover)
  FeatureDetectionInternals.TogglePopoverSource.override(
    environment.togglePopoverSource,
  )
}

function teardownEnvironment() {
  FeatureDetectionInternals.AnchorPositioning.reset()
  FeatureDetectionInternals.Popover.reset()
  FeatureDetectionInternals.TogglePopoverSource.reset()
}

function forEachEnvironment(environments: Environment[], callback: () => void) {
  for (const environment of environments) {
    describe(`Environment anchorPositioning ${environment.anchorPositioning}`, () => {
      describe(`Environment popover ${environment.popover}`, () => {
        describe(`Environment togglePopoverSource ${environment.togglePopoverSource}`, () => {
          beforeEach(() => {
            setupEnvironment(environment)
          })

          afterEach(() => {
            teardownEnvironment()
          })

          callback()
        })
      })
    })
  }
}

function runTests() {
  describe('Basic Functionality', () => {
    test('renders popover elements', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Content')

      expect(trigger).toBeInTheDocument()
      expect(popup).toBeInTheDocument()
    })

    test('popup is hidden by default', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const popup = page.getByText('Content')
      expect(popup).toBeInTheDocument()
      expect(popup).not.toBeVisible()
    })

    test('popup shows with defaultOpen=true', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root .defaultOpen=${true}>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const popup = container.querySelector('aria-ui-popover-popup')!
      expect(popup.style.display).toBe('')
    })
  })

  describe('Trigger Interactions', () => {
    test('clicking trigger opens and closes popover', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Content')

      expect(trigger).toBeInTheDocument()
      expect(popup).toBeInTheDocument()

      // Initially closed
      expect(popup).not.toBeVisible()

      // Click to open
      await trigger.click()
      expect(popup).toBeVisible()

      // Click to close
      await trigger.click()
      expect(popup).not.toBeVisible()
    })

    test('trigger has correct aria-expanded attribute', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const trigger = page.getByText('Trigger')

      // Initially false
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      // After click, should be true
      await trigger.click()
      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      // After second click, should be false
      await trigger.click()
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    test('disabled trigger does not open popover', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root>
            <aria-ui-popover-trigger .disabled=${true}
              >Trigger</aria-ui-popover-trigger
            >
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Content')

      // Click should not open
      await trigger.click()
      expect(popup).not.toBeVisible()
    })
  })

  describe('Hover Interactions', () => {
    test('hover opens popover when openOnHover is true', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root>
            <aria-ui-popover-trigger .openOnHover=${true} .delay=${0}>
              Trigger
            </aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Content')

      // Initially closed
      expect(popup).not.toBeVisible()

      // Hover to open
      await trigger.hover()
      expect(popup).toBeVisible()
    })
  })

  describe('Controlled Mode', () => {
    test('controlled open prop overrides internal state', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root data-testid="root" .open=${true}>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup data-testid="popup"
                >Content</aria-ui-popover-popup
              >
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const popup = page.getByTestId('popup')

      // Should be open due to controlled prop
      expect(popup).toBeVisible()

      // Change controlled prop to false
      const rootElement = container.querySelector('aria-ui-popover-root')!
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
          <aria-ui-popover-root>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const root = container.querySelector('aria-ui-popover-root')!
      let eventFired = false

      root.addEventListener('openChange', () => {
        eventFired = true
      })

      const triggerElement = page.getByText('Trigger')
      await triggerElement.click()
      expect(eventFired).toBe(true)
    })
  })

  describe('Accessibility', () => {
    test('popup has role dialog', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup data-testid="popup"
                >Content</aria-ui-popover-popup
              >
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const popup = page.getByTestId('popup')
      expect(popup).toHaveAttribute('role', 'dialog')
    })

    test('disabled elements have aria-disabled', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root .disabled=${true}>
            <aria-ui-popover-trigger .disabled=${true}
              >Trigger</aria-ui-popover-trigger
            >
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const root = container.querySelector('aria-ui-popover-root')!
      const trigger = container.querySelector('aria-ui-popover-trigger')!

      expect(root.getAttribute('aria-disabled')).toBe('true')
      expect(trigger.getAttribute('aria-disabled')).toBe('true')
    })
  })

  describe('Positioning', () => {
    test('positioner is positioned absolutely by default', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root .open=${true}>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const positioner = container.querySelector('aria-ui-popover-positioner')!
      await expect.poll(() => positioner.style.position).toBe('absolute')
    })

    test('positioner respects strategy prop', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-popover-root .open=${true}>
            <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
            <aria-ui-popover-positioner .strategy=${'fixed'}>
              <aria-ui-popover-popup>Content</aria-ui-popover-popup>
            </aria-ui-popover-positioner>
          </aria-ui-popover-root>
        `,
        container,
      )

      const positioner = container.querySelector('aria-ui-popover-positioner')!
      await expect.poll(() => positioner.style.position).toBe('fixed')
    })
  })
}

describe('Popover', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  const environments = collectEnvironments()
  forEachEnvironment(environments, runTests)
})
