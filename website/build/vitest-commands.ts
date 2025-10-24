import type { Plugin } from 'vitest/config'
import type { BrowserCommand } from 'vitest/node'
import '@vitest/browser-playwright'

export interface HoverOptions {
  /**
   * A point to use relative to the top-left corner of element padding box. If
   * not specified, points to the center of the element.
   */
  position?: { x: number; y: number }

  /**
   * How many mouse move events to send.
   */
  steps?: number
}

/**
 * Hover over an element.
 *
 * This could be more reliable than `locator.hover()` because it sends multiple
 * mouse move events.
 */
const hover: BrowserCommand<[selector: string, options?: HoverOptions], void> = async (ctx, selector, options) => {
  if (ctx.provider.name !== 'playwright') {
    throw new Error(`provider ${ctx.provider.name} is not supported`)
  }

  const locator = ctx.iframe.locator(selector)
  await locator.waitFor({ state: 'visible', timeout: 5000 })
  const box = await locator.boundingBox({ timeout: 5000 })
  if (!box) {
    throw new Error(`Unable to find element by selector: ${selector}`)
  }

  let x = options?.position?.x ?? box.width / 2
  let y = options?.position?.y ?? box.height / 2

  let steps = options?.steps ?? 10
  // console.debug(`Hovering over element ${selector} with steps ${steps} at`, box.x + x, box.y + y)
  await ctx.page.mouse.move(box.x + x, box.y + y, { steps })
}

/**
 * Drag an element over another element.
 *
 * This is more reliable than `locator.dragTo()` because it sends multiple mouse
 * move events.
 */
const dragAndDrop: BrowserCommand<[source: string, target: string], void> = async (ctx, source, target) => {
  if (ctx.provider.name !== 'playwright') {
    throw new Error(`provider ${ctx.provider.name} is not supported`)
  }

  await hover(ctx, source)
  await ctx.page.mouse.down()

  await hover(ctx, target)
  await ctx.page.mouse.up()
}

declare module 'vitest/browser' {
  interface BrowserCommands {
    hover: (selector: string, options?: HoverOptions) => Promise<void>
    dragAndDrop: (source: string, target: string) => Promise<void>
  }
}

export function VitestBrowserCommands(): Plugin {
  return {
    name: 'prosekit:vitest:custom-commands',
    config() {
      return {
        test: {
          browser: {
            commands: {
              hover,
              dragAndDrop,
            },
          },
        },
      }
    },
  }
}
