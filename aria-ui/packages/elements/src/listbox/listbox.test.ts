import { html, render } from 'lit-html'
import { beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

describe('Listbox', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  describe('Basic Functionality', () => {
    test('renders listbox elements', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root>
            <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByText('Apple')).toBeInTheDocument()
      expect(page.getByText('Banana')).toBeInTheDocument()
    })

    test('root has role listbox', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root data-testid="root">
            <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByTestId('root')).toHaveAttribute('role', 'listbox')
    })

    test('items have role option', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root>
            <aria-ui-listbox-item value="apple" data-testid="item">Apple</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByTestId('item')).toHaveAttribute('role', 'option')
    })
  })

  describe('Selection (single)', () => {
    test('clicking an item selects it', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root>
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await page.getByTestId('apple').click()
      expect(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'true')
      expect(page.getByTestId('banana')).toHaveAttribute('aria-selected', 'false')
    })

    test('value prop sets initial selection', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .value=${'banana'}>
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'false')
      expect(page.getByTestId('banana')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('Selection (multiple)', () => {
    test('multiple items can be selected', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .multiple=${true}>
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await page.getByTestId('apple').click()
      await page.getByTestId('banana').click()
      expect(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'true')
      expect(page.getByTestId('banana')).toHaveAttribute('aria-selected', 'true')
    })

    test('clicking selected item deselects it in multi-select', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .multiple=${true} .values=${['apple']}>
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'true')
      await page.getByTestId('apple').click()
      expect(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'false')
    })

    test('root has aria-multiselectable', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .multiple=${true} data-testid="root">
            <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByTestId('root')).toHaveAttribute('aria-multiselectable', 'true')
    })
  })

  describe('Keyboard Navigation', () => {
    test('focus sets active to first item, arrow down moves to second', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root data-testid="root">
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await page.getByTestId('root').click()
      await expect.poll(() => page.getByTestId('apple').element().getAttribute('data-active')).toBe('')

      const root = container.querySelector('aria-ui-listbox-root')!
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

      await expect.poll(() => page.getByTestId('banana').element().getAttribute('data-active')).toBe('')
    })

    test('arrow down twice moves to third item', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root data-testid="root">
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
            <aria-ui-listbox-item value="cherry" data-testid="cherry">Cherry</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await page.getByTestId('root').click()
      const root = container.querySelector('aria-ui-listbox-root')!
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

      await expect.poll(() => page.getByTestId('cherry').element().getAttribute('data-active')).toBe('')
    })

    test('Home key moves to first item', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root data-testid="root">
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
            <aria-ui-listbox-item value="cherry" data-testid="cherry">Cherry</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await page.getByTestId('root').click()
      const root = container.querySelector('aria-ui-listbox-root')!
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))

      await expect.poll(() => page.getByTestId('apple').element().getAttribute('data-active')).toBe('')
    })

    test('Enter key selects active item in multi-select mode', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .multiple=${true} data-testid="root">
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await page.getByTestId('root').click()
      const root = container.querySelector('aria-ui-listbox-root')!
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

      await expect.poll(() => page.getByTestId('apple').element().getAttribute('aria-selected')).toBe('true')
    })

    test('skips disabled items', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root data-testid="root">
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" .disabled=${true} data-testid="banana">Banana</aria-ui-listbox-item>
            <aria-ui-listbox-item value="cherry" data-testid="cherry">Cherry</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      // Focus sets active to apple, then ArrowDown skips banana (disabled) → cherry
      await page.getByTestId('root').click()
      const root = container.querySelector('aria-ui-listbox-root')!
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

      await expect.poll(() => page.getByTestId('cherry').element().getAttribute('data-active')).toBe('')
    })
  })

  describe('Filtering', () => {
    test('query filters visible items', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .query=${'ban'}>
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await expect.poll(() => (page.getByTestId('apple').element() as HTMLElement).hidden).toBe(true)
      await expect.poll(() => (page.getByTestId('banana').element() as HTMLElement).hidden).toBe(false)
    })

    test('empty component shows when all items are filtered out', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .query=${'xyz'}>
            <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-empty data-testid="empty">No results</aria-ui-listbox-empty>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await expect.poll(() => page.getByTestId('empty').element().style.display).not.toBe('none')
    })

    test('empty component is hidden when items match', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .query=${''}>
            <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-empty data-testid="empty">No results</aria-ui-listbox-empty>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await expect.poll(() => page.getByTestId('empty').element().style.display).toBe('none')
    })
  })

  describe('Disabled', () => {
    test('disabled root has aria-disabled', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .disabled=${true} data-testid="root">
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByTestId('root')).toHaveAttribute('aria-disabled', 'true')
    })

    test('disabled item has aria-disabled', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root>
            <aria-ui-listbox-item value="apple" .disabled=${true} data-testid="apple">Apple</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      expect(page.getByTestId('apple')).toHaveAttribute('aria-disabled', 'true')
    })

    test('clicking disabled item does not select', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root>
            <aria-ui-listbox-item value="apple" .disabled=${true} data-testid="apple">Apple</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      const item = container.querySelector('[data-testid="apple"]')!
      item.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      expect(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('autoFocus', () => {
    test('autoFocus sets active to first item on mount', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-listbox-root .autoFocus=${true}>
            <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
            <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          </aria-ui-listbox-root>
        `,
        container,
      )

      await expect.poll(() => page.getByTestId('apple').element().getAttribute('data-active')).toBe('')
    })
  })
})
