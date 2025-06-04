import {
  expect,
  test,
} from 'vitest'

import { getId } from './get-id'

test('generates sequential ids', () => {
  const first = getId()
  const second = getId()
  const firstNum = Number(first.split(':')[1])
  const secondNum = Number(second.split(':')[1])
  expect(secondNum).toBe((firstNum + 1) % Number.MAX_SAFE_INTEGER)
})
