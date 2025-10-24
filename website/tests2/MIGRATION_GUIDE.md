A list of examples for the migration from playwright to vitest browser.

## Use `expect.element` instead of `expect`

Before (playwright):

```ts
await expect(locator).toBeVisible();
```

Vitest browser tests run directly in the page, so helpers like `.evaluate()` and `.boundingBox()` are not available on locators. Grab the element and use standard DOM methods instead.

After (vitest browser):

```ts
await expect.element(locator).toBeVisible();
```

## Use `.locate` instead of `.locator`

Before (playwright):

```ts
const editor = page.locator("div.ProseMirror");
const button = editor.locator("button");
```

After (vitest browser):

```ts
const editor = page.locate("div.ProseMirror");
const button = editor.locate("button");
```

## Use `userEvent.type()` instead of `locator.pressSequentially()`

Before (playwright):

```ts
await locator.pressSequentially("Item");
```

After (vitest browser):

```ts
await userEvent.type(locator, "Item");
```

## Use `userEvent.keyboard()` instead of `page.keyboard.*`

Before (playwright):

```ts
await page.keyboard.down("Shift");
await page.keyboard.press("ArrowLeft");
await page.keyboard.up("Shift");
```

After (vitest browser):

```ts
await userEvent.keyboard("{Shift>}{ArrowLeft}{/Shift}");
```

## Use `adjustSelection` to select inline ranges

Before (playwright):

```ts
await page.keyboard.down("Shift");
for (let i = 0; i < 5; i++) {
  await page.keyboard.press("ArrowLeft");
}
await page.keyboard.up("Shift");
```

After (vitest browser):

```ts
adjustSelection({
  collapse: "end",
  extend: { direction: "backward", count: 5 },
})

// If the caret starts at the beginning of the word, move it first and then extend.
adjustSelection({ move: { direction: "forward", count: 5 } })
adjustSelection({ extend: { direction: "backward", count: 5 } })
```

## Use `expectLocatorToHaveCount` to wait for a locator to have a specific count

Before (playwright):

```ts
const locator = page.locator("button")
await expect(locator).toHaveCount(2)
```

After (vitest browser):

```ts
const locator = page.locate("button")
await expectLocatorToHaveCount(locator, 2)
```

## Use `userEvent.selectOptions()` instead of `.selectOption()`

Before (playwright):

```ts
await page.getByLabel("Theme").selectOption("nord")
```

After (vitest browser):

```ts
const select = page.locate("#code-block-theme-selector").element() as HTMLSelectElement
await userEvent.selectOptions(select, "nord")
```

## Use `window.getComputedStyle()` to assert CSS values

Before (playwright):

```ts
await expect(locator).toHaveCSS("color", "rgb(163, 190, 140)")
```

After (vitest browser):

```ts
await expect.poll(() => {
  const element = page.locate("span", { hasText: "JavaScript" }).element()
  return window.getComputedStyle(element).color
}).toBe("rgb(163, 190, 140)")
```

## Use DOM APIs via `locator.element()`

Before (playwright):

```ts
await locator.evaluate(async (element) => {
  return element.getAttribute("aria-label")
})

const box = await locator.boundingBox()
```

After (vitest browser):

```ts
const element = locator.element()
const label = element.getAttribute("aria-label")

const rect = element.getBoundingClientRect()
```

## Use `extendSelection` helper to expand selections

Before (playwright):

```ts
await page.keyboard.down("Shift")
for (let i = 0; i < 5; i++) {
  await page.keyboard.press("ArrowLeft")
}
await page.keyboard.up("Shift")
```

After (vitest browser):

```ts
await extendSelection("backward", 5)
```

## Use `getBoundingBox` helper instead of `.boundingBox()`

Before (playwright):

```ts
const menuBox = await menu.boundingBox()
```

After (vitest browser):

```ts
const menuBox = getBoundingBox(menu)
```


## Use `expectLocatorToNotExist` to wait for a locator to not exist

Before (playwright):

```ts
await expect(locator).not.toBeVisible()
```

After (vitest browser):

```ts
await expectLocatorToNotExist(locator)
```

## Use `userEvent.dragAndDrop()` instead of `locator.dragTo()`

Before (playwright):

```ts
await images.nth(0).dragTo(images.nth(2), { targetPosition: { x: 5, y: 5 } })
```

After (vitest browser):

```ts
await userEvent.dragAndDrop(
  images.nth(0),
  images.nth(2),
  { targetPosition: { x: 5, y: 5 } },
)
```
