import {
  expect,
  test,
} from 'vitest'

import { calcResize } from './calc-resize'

test('calcBottomRightResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('bottom-right', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('bottom-right', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }

  // drag to the right
  testIncrease(10, 0)

  // drag to the left
  testDecrease(-10, 0)

  // drag to the bottom
  testIncrease(0, 10)

  // drag to the top
  testDecrease(0, -10)

  // drag to the bottom-right
  testIncrease(10, 10)

  // drag to the top-left
  testDecrease(-10, -10)
})

test('calcBottomLeftResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('bottom-left', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('bottom-left', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }

  // drag to the right
  testDecrease(10, 0)

  // drag to the left
  testIncrease(-10, 0)

  // drag to the bottom
  testIncrease(0, 10)

  // drag to the top
  testDecrease(0, -10)

  // drag to the bottom-left
  testIncrease(-10, 10)

  // drag to the top-right
  testDecrease(10, -10)
})

test('calcTopRightResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('top-right', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('top-right', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }

  // drag to the right
  testIncrease(10, 0)

  // drag to the left
  testDecrease(-10, 0)

  // drag to the bottom
  testDecrease(0, 10)

  // drag to the top
  testIncrease(0, -10)

  // drag to the top-right
  testIncrease(10, -10)

  // drag to the bottom-left
  testDecrease(-10, 10)
})

test('calcTopLeftResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('top-left', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('top-left', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }

  // drag to the right
  testDecrease(10, 0)

  // drag to the left
  testIncrease(-10, 0)

  // drag to the bottom
  testDecrease(0, 10)

  // drag to the top
  testIncrease(0, -10)

  // drag to the top-left
  testIncrease(-10, -10)

  // drag to the bottom-right
  testDecrease(10, 10)
})

test('calcTopResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('top', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('top', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }
  const testUnchanged = (dx: number, dy: number) => {
    const [w1, h1] = [200, 100]
    const [w2, h2] = calcResize('top', w1, h1, dx, dy, null)
    expectAreaToUnchanged(w1, h1, w2, h2)
  }

  // drag to the right
  testUnchanged(10, 0)

  // drag to the left
  testUnchanged(-10, 0)

  // drag to the bottom
  testDecrease(0, 10)

  // drag to the top
  testIncrease(0, -10)
})

test('calcRightResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('right', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('right', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }
  const testUnchanged = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('right', w1, h1, dx, dy, null)
    expectAreaToUnchanged(w1, h1, w2, h2)
  }

  // drag to the right
  testIncrease(10, 0)

  // drag to the left
  testDecrease(-10, 0)

  // drag to the bottom
  testUnchanged(0, 10)

  // drag to the top
  testUnchanged(0, -10)
})

test('sizes are clamped to positive values', () => {
  const [w1, h1] = [100, 200]
  const [w2, h2] = calcResize('right', w1, h1, -500, 0, null)
  expect(w2).toBeGreaterThan(0)
  expect(h2).toBeGreaterThan(0)
})

test('calcBottomResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('bottom', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('bottom', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }
  const testUnchanged = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('bottom', w1, h1, dx, dy, null)
    expectAreaToUnchanged(w1, h1, w2, h2)
  }

  // drag to the right
  testUnchanged(10, 0)

  // drag to the left
  testUnchanged(-10, 0)

  // drag to the bottom
  testIncrease(0, 10)

  // drag to the top
  testDecrease(0, -10)
})

test('calcLeftResize', () => {
  const testIncrease = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('left', w1, h1, dx, dy, null)
    expectAreaToIncrease(w1, h1, w2, h2)
  }
  const testDecrease = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('left', w1, h1, dx, dy, null)
    expectAreaToDecrease(w1, h1, w2, h2)
  }
  const testUnchanged = (dx: number, dy: number) => {
    const [w1, h1] = [100, 200]
    const [w2, h2] = calcResize('left', w1, h1, dx, dy, null)
    expectAreaToUnchanged(w1, h1, w2, h2)
  }

  // drag to the right
  testDecrease(10, 0)

  // drag to the left
  testIncrease(-10, 0)

  // drag to the bottom
  testUnchanged(0, 10)

  // drag to the top
  testUnchanged(0, -10)
})

function expectAreaToIncrease(w1: number, h1: number, w2: number, h2: number) {
  const area1 = w1 * h1
  const area2 = w2 * h2
  const aspectRatio1 = w1 / h1
  const aspectRatio2 = w2 / h2
  expect(area2).toBeGreaterThan(area1)
  expect(aspectRatio2).toBeCloseTo(aspectRatio1)
}

function expectAreaToDecrease(w1: number, h1: number, w2: number, h2: number) {
  const area1 = w1 * h1
  const area2 = w2 * h2
  const aspectRatio1 = w1 / h1
  const aspectRatio2 = w2 / h2
  expect(area2).toBeLessThan(area1)
  expect(aspectRatio2).toBeCloseTo(aspectRatio1)
}

function expectAreaToUnchanged(w1: number, h1: number, w2: number, h2: number) {
  expect(w1).toBe(w2)
  expect(h1).toBe(h2)
}
